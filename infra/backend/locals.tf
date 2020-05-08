locals {
  region   = "us-east-1"
  env      = "prd"
  company  = "denilson"
  table_id = "LockID"

  tags = {
    Environment = local.env
  }
}
