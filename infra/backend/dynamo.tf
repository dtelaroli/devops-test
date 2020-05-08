resource "aws_dynamodb_table" "this" {
  name           = "${local.company}-devops-lock"
  hash_key       = local.table_id
  billing_mode     = "PAY_PER_REQUEST"

  attribute {
    name = local.table_id
    type = "S"
  }

  tags = local.tags
}
