resource "aws_cloudwatch_log_group" "this" {
  name              = "/aws/ecs/${var.container_name}"
  retention_in_days = "30"
}


resource "aws_ecr_repository" "this" {
  name = var.container_name
}

resource "aws_ecr_lifecycle_policy" "this" {
  repository = aws_ecr_repository.this.name

  policy = <<EOF
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Expire images older than 3 days",
      "selection": {
        "tagStatus": "untagged",
        "countType": "sinceImagePushed",
        "countUnit": "days",
        "countNumber": 3
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}
EOF
}

data "template_file" "this" {
  template = file("./tasks/task_base.json")

  vars = {
    container_name     = var.container_name
    container_port     = var.container_port
    container_memory   = var.container_memory
    container_env_vars = var.container_env_vars
    container_cpu      = var.container_cpu
    repository_url     = aws_ecr_repository.this.repository_url
    secrets            = var.secrets
    log_group          = aws_cloudwatch_log_group.this.name
  }
}

resource "aws_ecs_task_definition" "this" {
  family                   = var.container_name
  container_definitions    = data.template_file.this.rendered
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.container_cpu
  memory                   = var.container_memory
  execution_role_arn       = var.ecs_iam_role_arn
  task_role_arn            = var.ecs_iam_role_arn
}

resource "aws_ecs_service" "this" {
  name                              = var.container_name
  cluster                           = var.cluster_name
  task_definition                   = aws_ecs_task_definition.this.arn
  desired_count                     = var.desired_count
  health_check_grace_period_seconds = 0
  launch_type                       = "FARGATE"

  lifecycle {
    ignore_changes = [
      # desired_count,
      task_definition
    ]
  }

  network_configuration {
    security_groups = [aws_security_group.this.id]
    subnets         = var.subnet_ids
  }


  #Aqui define para qual container o target group irá conversar container_name deve estar na definicao da tarefa
  load_balancer {
    target_group_arn = aws_alb_target_group.this.arn
    container_name   = var.container_name
    container_port   = var.container_port
  }
}
