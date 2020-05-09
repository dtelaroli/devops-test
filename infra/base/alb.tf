resource "aws_alb" "this" {
  name            = "${local.company}-alb"
  internal        = false
  idle_timeout    = "180"
  subnets         = module.vpc.public_subnets
  security_groups = [aws_security_group.this.id]

  tags = {
    Name        = local.company
    Environment = local.env
  }
}

