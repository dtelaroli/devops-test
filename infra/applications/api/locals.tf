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

  container_definitions = jsonencode([
    {
      "name" : local.container_name,
      "image" : "${aws_ecr_repository.this.repository_url}:latest",
      "networkMode" : "awsvpc",
      "portMappings" : [
        {
          "containerPort" : local.container_port,
          "hostPort" : local.container_port
        }
      ],
      "environment" : [
        {
          "name" : "REGION",
          "value" : local.region
        },
        {
          "name" : "ENV",
          "value" : local.env
        },
        {
          "name" : "SQS_CREATE_ORDER",
          "value" : local.sqs_create_order
        },
        {
          "name" : "SQS_NOTIFY_ORDER",
          "value" : local.sqs_notify_order
        },
        {
          "name" : "SQS_NOTIFY_ORDER_URL",
          "value" : data.aws_sqs_queue.notify_order.url
        },
        {
          "name" : "DYNAMO_ORDER_TABLE_NAME",
          "value" : local.dynamo_table_order
        },
        {
          "name" : "MODULE",
          "value" : local.container_name
        },
        {
          "name" : "REDIS_DOMAIN_NAME",
          "value" : aws_elasticache_cluster.redis.cache_nodes.0.address
        },
        {
          "name" : "REDIS_PORT_NUMBER",
          "value" : tostring(aws_elasticache_cluster.redis.cache_nodes.0.port)
        }
      ],
      "memory" : local.container_memory,
      "cpu" : local.container_cpu,
      "logConfiguration" : {
        "logDriver" : "awslogs",
        "options" : {
          "awslogs-group" : aws_cloudwatch_log_group.this.name,
          "awslogs-region" : "us-east-1",
          "awslogs-stream-prefix" : local.container_name,
          "awslogs-multiline-pattern" : "^.+\\d{2}\\:\\d{2}\\:\\d{2}"
        }
      }
    },
    {
      "name" : "worker",
      "image" : "${aws_ecr_repository.this.repository_url}:latest",
      "networkMode" : "awsvpc",
      "environment" : [
        {
          "name" : "REGION",
          "value" : local.region
        },
        {
          "name" : "ENV",
          "value" : local.env
        },
        {
          "name" : "SQS_CREATE_ORDER",
          "value" : local.sqs_create_order
        },
        {
          "name" : "SQS_NOTIFY_ORDER",
          "value" : local.sqs_notify_order
        },
        {
          "name" : "SQS_NOTIFY_ORDER_URL",
          "value" : data.aws_sqs_queue.notify_order.url
        },
        {
          "name" : "DYNAMO_ORDER_TABLE_NAME",
          "value" : local.dynamo_table_order
        },
        {
          "name" : "MODULE",
          "value" : local.container_name_worker
        },
        {
          "name" : "REDIS_DOMAIN_NAME",
          "value" : aws_elasticache_cluster.redis.cache_nodes.0.address
        },
        {
          "name" : "REDIS_PORT_NUMBER",
          "value" : tostring(aws_elasticache_cluster.redis.cache_nodes.0.port)
        }
      ],
      "memory" : local.container_memory,
      "cpu" : local.container_cpu,
      "logConfiguration" : {
        "logDriver" : "awslogs",
        "options" : {
          "awslogs-group" : aws_cloudwatch_log_group.worker.name,
          "awslogs-region" : "us-east-1",
          "awslogs-stream-prefix" : local.container_name_worker,
          "awslogs-multiline-pattern" : "^.+\\d{2}\\:\\d{2}\\:\\d{2}"
        }
      }
    }
  ])
}
