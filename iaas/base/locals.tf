locals {
  company         = "denilson"
  env             = terraform.workspace
  region          = "us-east-1"
  azs             = ["${local.region}a", "${local.region}b"]
  private_subnets = ["10.200.1.0/24", "10.200.2.0/24"]
  public_subnets  = ["10.200.101.0/24", "10.200.102.0/24"]
  port            = 80
  email           = "ddts80@gmail.com"
}
