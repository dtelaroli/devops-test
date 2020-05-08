resource "aws_codepipeline" "this" {
  name     = var.name
  role_arn = aws_iam_role.codepipeline.arn

  artifact_store {
    type     = "S3"
    location = aws_s3_bucket.this.id
  }

  stage {
    name = "Source"

    # action {
    #   name             = "Source"
    #   category         = "Source"
    #   owner            = "AWS"
    #   provider         = "ECR"
    #   version          = "1"
    #   output_artifacts = ["imagedefinitions"]

    #   configuration = {
    #     RepositoryName = var.ecr_repository.name
    #   }
    # }
    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "S3"
      version          = "1"
      output_artifacts = ["imagedefinitions"]
      configuration = {
        S3Bucket             = aws_s3_bucket.this.id
        S3ObjectKey          = "${aws_codebuild_project.this.name}/definitions.zip"
        PollForSourceChanges = true
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "ECS"
      input_artifacts = ["imagedefinitions"]
      version         = "1"

      configuration = {
        ClusterName = var.cluster_name
        ServiceName = var.service_name
        FileName    = "imagedefinitions.json"
      }
    }
  }
}
