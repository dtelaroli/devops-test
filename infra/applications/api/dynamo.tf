resource "aws_dynamodb_table" "order" {
  name           = local.dynamo_table_order
  hash_key       = "id"
  billing_mode     = "PAY_PER_REQUEST"
  point_in_time_recovery {
    enabled = true
  }

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_ssm_parameter" "dynamo_table_order" {
  name  = "/config/api/dynamo-table-order"
  type  = "String"
  value = local.dynamo_table_order
}
