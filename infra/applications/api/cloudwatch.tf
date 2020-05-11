resource "aws_cloudwatch_log_group" "this" {
  name              = "/aws/ecs/${local.container_name}"
  retention_in_days = "30"
}

resource "aws_cloudwatch_log_group" "worker" {
  name              = "/aws/ecs/${local.container_name_worker}"
  retention_in_days = "30"
}
