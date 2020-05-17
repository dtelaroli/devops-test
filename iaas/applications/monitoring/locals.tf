locals {
  name                = "monitoring"
  env                 = data.terraform_remote_state.base.outputs.env
  region              = data.terraform_remote_state.base.outputs.region
  sns_arn             = data.terraform_remote_state.base.outputs.sns_arn
  alb_name            = "app/denilson-alb/791f97d87da8bd47"
  api_name            = "denilson-prd-sells-service-prd-sam-app"
  log_group_name      = "/aws/ecs/worker"
  statistic           = "Sum"
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"
  evaluation_periods  = "2"
  period              = "60"
  threshold           = "1"
  stat                = "Sum"
  unit                = "Count"

  type        = "metric"
  y           = 0
  width       = 8
  height      = 6
  view        = "timeSeries"
  period_dash = 60
  stacked     = true

  actions = [
    local.sns_arn
  ]
}
