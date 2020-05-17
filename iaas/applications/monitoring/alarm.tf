resource "aws_cloudwatch_metric_alarm" "api_errors" {
  alarm_name          = "api-errors"
  alarm_description   = "This metric monitors api error 4xx count"
  comparison_operator = local.comparison_operator
  evaluation_periods  = local.evaluation_periods
  threshold           = local.threshold
  treat_missing_data  = local.treat_missing_data

  metric_query {
    id          = "e1"
    expression  = "m1+m2"
    label       = "Error Count"
    return_data = "true"
  }

  metric_query {
    id = "m1"

    metric {
      namespace   = "AWS/ApplicationELB"
      metric_name = "HTTPCode_Target_4XX_Count"
      period      = local.period
      stat        = local.stat
      unit        = local.unit

      dimensions = {
        LoadBalancer = local.alb_name
      }
    }
  }

  metric_query {
    id = "m2"

    metric {
      namespace   = "AWS/ApplicationELB"
      metric_name = "HTTPCode_Target_5XX_Count"
      period      = local.period
      stat        = local.stat
      unit        = local.unit

      dimensions = {
        LoadBalancer = local.alb_name
      }
    }
  }

  ok_actions                = local.actions
  alarm_actions             = local.actions
  insufficient_data_actions = local.actions
}

resource "aws_cloudwatch_metric_alarm" "sells_service_errors" {
  alarm_name          = "sells-service-errors"
  alarm_description   = "This metric monitors sells service error 4xx count"
  comparison_operator = local.comparison_operator
  evaluation_periods  = local.evaluation_periods
  threshold           = local.threshold
  treat_missing_data  = local.treat_missing_data

  metric_query {
    id          = "e1"
    expression  = "m1+m2"
    label       = "Error Count"
    return_data = "true"
  }

  metric_query {
    id = "m1"

    metric {
      namespace   = "AWS/ApiGateway"
      metric_name = "4XXError"
      period      = local.period
      stat        = local.stat
      unit        = local.unit

      dimensions = {
        ApiName = local.api_name
      }
    }
  }

  metric_query {
    id = "m2"

    metric {
      namespace   = "AWS/ApiGateway"
      metric_name = "5XXError"
      period      = local.period
      stat        = local.stat
      unit        = local.unit

      dimensions = {
        ApiName = local.api_name
      }
    }
  }

  ok_actions                = local.actions
  alarm_actions             = local.actions
  insufficient_data_actions = local.actions
}

resource "aws_cloudwatch_metric_alarm" "worker_errors" {
  alarm_name          = "worker-errors"
  alarm_description   = "This metric monitors worker service error count"
  namespace           = "Custom"
  metric_name         = "ErrorCount"
  statistic           = local.statistic
  comparison_operator = local.comparison_operator
  evaluation_periods  = local.evaluation_periods
  threshold           = local.threshold
  period              = local.period
  treat_missing_data  = local.treat_missing_data

  ok_actions                = local.actions
  alarm_actions             = local.actions
  insufficient_data_actions = local.actions
}
