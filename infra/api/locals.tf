locals {
  name = "api"

  default_region = "us-east-1"

  env                   = data.terraform_remote_state.base.outputs.env
  region                = data.terraform_remote_state.base.outputs.region
  vpc_id                = data.terraform_remote_state.base.outputs.vpc_id
  azs                   = data.terraform_remote_state.base.outputs.azs
  ecs_iam_role_arn      = aws_iam_role.this.arn
  cluster_name          = data.terraform_remote_state.base.outputs.ecs_cluster_name
  alb_arn               = data.terraform_remote_state.base.outputs.alb_arn
  alb_security_group_id = data.terraform_remote_state.base.outputs.alb_security_group_id
  alb_port              = 80
  cpu                   = "256"
  memory                = "512"
  # memoryReservation     = "512"
  port                  = "4000"

  subnets        = data.terraform_remote_state.base.outputs.private_subnets
  git_repository = "https://github.com/dtelaroli/devops-test.git"
  sqs_name       = "${local.name}-notification"
}
