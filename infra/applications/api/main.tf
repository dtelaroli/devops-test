module "ecs-service" {
  source = "../../modules/ecs-service"

  providers = {
    aws = aws.virginia
  }

  container_name        = local.name
  container_port        = local.port
  container_cpu         = local.cpu
  container_memory      = local.memory
  container_env_vars    = <<ENV_VARS
    {
      "name": "REGION",
      "value": "${local.region}"
    },
    {
      "name": "ENV",
      "value": "${local.env}"
    },
    {
      "name": "SQS_CREATE_ORDER",
      "value": "${local.sqs_create_order}"
    },
    {
      "name": "SQS_NOTIFY_ORDER",
      "value": "${local.sqs_notify_order}"
    },
    {
      "name": "DYNAMO_ORDER_TABLE_NAME",
      "value": "${local.dynamo_table_order}"
    }
  ENV_VARS
  desired_count         = "1"
  cluster_name          = local.cluster_name
  subnet_ids            = local.subnets
  vpc_id                = local.vpc_id
  alb_arn               = local.alb_arn
  alb_port              = local.alb_port
  alb_security_group_id = local.alb_security_group_id
  ecs_iam_role_arn      = local.ecs_iam_role_arn
}
