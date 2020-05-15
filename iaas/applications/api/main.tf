module "ecs-service" {
  source = "../../modules/ecs-service"

  providers = {
    aws = aws.virginia
  }

  cpu                   = "512"
  memory                = "1024"
  container_name        = local.container_name
  container_port        = local.port
  container_definitions = local.container_definitions
  desired_count         = "1"
  cluster_name          = local.cluster_name
  subnet_ids            = local.subnets
  vpc_id                = local.vpc_id
  alb_arn               = local.alb_arn
  alb_port              = local.alb_port
  alb_security_group_id = local.alb_security_group_id
  ecs_iam_role_arn      = local.ecs_iam_role_arn
  certification_arn     = local.certificate_arn
}
