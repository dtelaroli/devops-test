data "template_file" "this" {
  template = "${file("${path.module}/templates/bucket-policy.json")}"
  vars = {
    company = local.company
  }
}

resource "aws_s3_bucket" "this" {
  bucket = "${local.company}-devops"
  acl    = "private"

  policy = data.template_file.this.rendered

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = "aws/s3"
        sse_algorithm     = "aws:kms"
      }
    }
  }

  tags = local.tags
}

resource "aws_s3_bucket_public_access_block" "this" {
  bucket = aws_s3_bucket.this.id

  block_public_policy = true
}
