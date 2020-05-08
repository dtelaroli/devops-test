terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "denilson-devops"
    dynamodb_table = "denilson-devops-lock"
    key            = "api.tfstate"
    region         = "us-east-1"
  }
}

data "terraform_remote_state" "base" {
  backend   = "s3"
  workspace = terraform.workspace
  config = {
    encrypt = true
    bucket  = "denilson-devops"
    key     = "base.tfstate"
    region  = "us-east-1"
  }
}
