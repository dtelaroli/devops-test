resource "aws_alb" "this" {
  name              = "${local.company}-alb"
  internal        = false
  idle_timeout    = "180"
  subnets = module.vpc.public_subnets

  tags = {
    Name        = local.company
    Environment = local.env
  }
}