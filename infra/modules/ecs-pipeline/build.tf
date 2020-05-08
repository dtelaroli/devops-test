resource "aws_codebuild_project" "this" {
  name          = var.name
  description   = var.description
  build_timeout = "10"
  service_role  = aws_iam_role.codebuild.arn
  badge_enabled = true

  artifacts {
    type     = "S3"
    location = aws_s3_bucket.this.id
  }

  environment {
    compute_type    = "BUILD_GENERAL1_SMALL"
    image           = "aws/codebuild/standard:2.0"
    type            = "LINUX_CONTAINER"
    privileged_mode = "true"
  }

  source {
    type                = "GITHUB"
    location            = var.git_repository
    git_clone_depth     = 1
    insecure_ssl        = false
    report_build_status = false
    buildspec           = var.buildspec
  }

  tags = {
    Environment = var.env
  }
}

data "aws_ssm_parameter" "token" {
  name            = "/config/github/token"
  with_decryption = true
}

resource "aws_codebuild_source_credential" "this" {
  auth_type   = "PERSONAL_ACCESS_TOKEN"
  server_type = "GITHUB"
  token       = data.aws_ssm_parameter.token.value
}

resource "aws_codebuild_webhook" "dev" {
  count        = replace(var.env, var.name, "") == "-prd" ? 0 : 1
  project_name = aws_codebuild_project.this.name

  filter_group {
    filter {
      type    = "EVENT"
      pattern = "PULL_REQUEST_UPDATED, PULL_REQUEST_CREATED"
    }

    filter {
      type                    = "HEAD_REF"
      pattern                 = "^refs/heads/.*$"
      exclude_matched_pattern = false
    }

    filter {
      type                    = "BASE_REF"
      pattern                 = "^refs/heads/master$"
      exclude_matched_pattern = false
    }
  }

  filter_group {
    filter {
      type    = "EVENT"
      pattern = "PUSH, PULL_REQUEST_MERGED"
    }

    filter {
      type                    = "HEAD_REF"
      pattern                 = "^refs/heads/(develop|release/.*)$"
      exclude_matched_pattern = false
    }
  }
}

resource "aws_codebuild_webhook" "prd" {
  count        = replace(var.env, var.name, "") == "-prd" ? 1 : 0
  project_name = aws_codebuild_project.this.name

  filter_group {
    filter {
      type                    = "EVENT"
      pattern                 = "PULL_REQUEST_MERGED"
      exclude_matched_pattern = false
    }

    filter {
      type                    = "HEAD_REF"
      pattern                 = "^refs/heads/.*$"
      exclude_matched_pattern = false
    }

    filter {
      type                    = "BASE_REF"
      pattern                 = "^refs/heads/master$"
      exclude_matched_pattern = false
    }
  }
}
