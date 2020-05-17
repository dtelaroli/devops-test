locals {
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
          "name" : "SQS_NOTIFY_ORDER_URL",
          "value" : data.aws_sqs_queue.notify_order.url
        },
        {
          "name" : "SQS_CREATE_ORDER_URL",
          "value" : data.aws_sqs_queue.create_order.url
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
        }
      }
    }
  ])
}
