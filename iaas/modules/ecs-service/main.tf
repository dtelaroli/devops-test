resource "aws_ecs_task_definition" "this" {
  family                   = var.container_name
  container_definitions    = var.container_definitions
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.cpu
  memory                   = var.memory
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
      desired_count,
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
