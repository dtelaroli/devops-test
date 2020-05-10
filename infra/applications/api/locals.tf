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
  dns_name              = data.terraform_remote_state.base.outputs.alb_dns_name
  alb_security_group_id = data.terraform_remote_state.base.outputs.alb_security_group_id
  alb_port              = 80
  cpu                   = "256"
  memory                = "512"
  # memoryReservation     = "512"
  port = "4000"

  subnets            = data.terraform_remote_state.base.outputs.private_subnets
  git_repository     = "https://github.com/dtelaroli/devops-test.git"
  sqs_create_order   = "${local.name}-create-order"
  sqs_notify_order   = "${local.name}-notify-order"
  sns_arn            = data.terraform_remote_state.base.outputs.sns_arn
  dynamo_table_order = "Order"
}
