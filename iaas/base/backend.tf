terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "denilson-devops"
    dynamodb_table = "denilson-devops-lock"
    key            = "base.tfstate"
    region         = "us-east-1"
  }
}
