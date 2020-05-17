resource "aws_cloudwatch_log_metric_filter" "worker_error" {
  name           = "WorkerErrors"
  pattern        = "Error"
  log_group_name = local.log_group_name

  metric_transformation {
    name          = "ErrorCount"
    namespace     = "Custom"
    value         = "1"
    default_value = "0"
  }
}
