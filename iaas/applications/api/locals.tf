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
  alb_dns_name          = data.terraform_remote_state.base.outputs.alb_dns_name
  dns_zone_name         = data.terraform_remote_state.base.outputs.dns_zone_name
  dns_zone_id           = data.terraform_remote_state.base.outputs.dns_zone_id
  certificate_arn       = data.terraform_remote_state.base.outputs.certificate_arn
  alb_security_group_id = data.terraform_remote_state.base.outputs.alb_security_group_id
  alb_port              = 443
  cpu                   = "512"
  memory                = "1024"
  container_cpu         = 256
  container_memory      = 512
  container_name        = local.name
  container_name_worker = "worker"
  container_port        = 4000
  elasticache_port      = 6379
  # memoryReservation     = "512"
  port = "4000"

  subnets                       = data.terraform_remote_state.base.outputs.private_subnets
  git_repository                = "https://github.com/dtelaroli/devops-test.git"
  sqs_create_order              = "${local.name}-create-order"
  sqs_notify_order              = "${local.name}-notify-order"
  sqs_notify_visibility_timeout = "300"
  sns_arn                       = data.terraform_remote_state.base.outputs.sns_arn
  dynamo_table_order            = "Order"
}
