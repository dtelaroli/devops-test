module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "${local.company}-vpc"
  cidr = "10.200.0.0/16"

  azs             = local.azs
  private_subnets = local.private_subnets
  public_subnets  = local.public_subnets

  enable_nat_gateway = true
  single_nat_gateway = true

  tags = {
    Environment = local.env
  }
}
