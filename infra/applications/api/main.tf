module "ecs-service" {
  source = "../../modules/ecs-service"

  providers = {
    aws = aws.virginia
  }

  container_name        = local.name
  container_port        = local.port
  container_cpu         = local.cpu
  container_memory      = local.memory
  desired_count         = "0"
  cluster_name          = local.cluster_name
  subnet_ids            = local.subnets
  vpc_id                = local.vpc_id
  alb_arn               = local.alb_arn
  alb_port              = local.alb_port
  alb_security_group_id = local.alb_security_group_id
  ecs_iam_role_arn      = local.ecs_iam_role_arn
}
