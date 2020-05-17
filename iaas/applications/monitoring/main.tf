resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "devops"

  dashboard_body = jsonencode(
    {
      "widgets" : [
        {
          "type" : "metric",
          "x" : 8,
          "y" : 0,
          "width" : 8,
          "height" : 6,
          "properties" : {
            "metrics" : [
              [
                "AWS/ApplicationELB",
                "ActiveConnectionCount",
                "LoadBalancer",
                "app/denilson-alb/791f97d87da8bd47",
                { "color" : "#2ca02c" }
              ],
              [".", "RequestCount", ".", ".", { "color" : "#bcbd22" }],
              [".", "HTTPCode_ELB_4XX_Count", ".", ".", { "color" : "#ff7f0e" }],
              [".", "HTTPCode_Target_5XX_Count", ".", ".", { "color" : "#d62728" }],
            ],
            "view" : "timeSeries",
            "stacked" : true,
            "region" : "us-east-1",
            "stat" : "Sum",
            "period" : 60
            "title" : "GraphQL API ALB"
          }
        },
        {
          "type" : "metric",
          "x" : 0,
          "y" : 0,
          "width" : 8,
          "height" : 6,
          "properties" : {
            "metrics" : [
              [
                "AWS/ApiGateway",
                "4XXError",
                "ApiName",
                "denilson-prd-sells-service-prd-sam-app", {
                  "id" : "m1", "yAxis" : "left", "color" : "#ff7f0e"
                }
              ],
              [".", "5XXError", ".", ".", { "color" : "#d62728" }],
              [".", "Count", ".", ".", { "color" : "#2ca02c" }]
            ],
            "view" : "timeSeries",
            "stacked" : true,
            "region" : "us-east-1",
            "stat" : "Sum",
            "period" : 60
            "title" : "Sells-Service API Gateway"
          }
        },
        {
          "type" : "metric",
          "x" : 16,
          "y" : 0,
          "width" : 8,
          "height" : 6,
          "properties" : {
            "metrics" : [
              ["Custom", "ErrorCount", { "color" : "#d62728" }]
            ],
            "view" : "timeSeries",
            "stacked" : true,
            "region" : "us-east-1",
            "stat" : "Sum",
            "period" : 60,
            "title" : "Worker Incoming Logs"
          }
        }
      ]
    }
  )
}

resource "aws_cloudwatch_log_metric_filter" "worker_error" {
  name           = "WorkerErrors"
  pattern        = "Error"
  log_group_name = "/aws/ecs/worker"

  metric_transformation {
    name          = "ErrorCount"
    namespace     = "Custom"
    value         = "1"
    default_value = "0"
  }
}

