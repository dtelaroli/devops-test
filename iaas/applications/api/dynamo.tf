resource "aws_dynamodb_table" "order" {
  name         = local.dynamo_table_order
  hash_key     = "id"
  billing_mode = "PAY_PER_REQUEST"
  point_in_time_recovery {
    enabled = true
  }

  attribute {
    name = "id"
    type = "S"
  }

  global_secondary_index {
    name            = local.dynamo_table_order_index
    hash_key        = "id"
    range_key       = "createdAt"
    projection_type = "ALL"
  }
}
