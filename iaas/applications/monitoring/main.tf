resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "devops"

  dashboard_body = jsonencode(
    {
      "widgets" : [
        {
          "type" : local.type,
          "x" : 0,
          "y" : local.y,
          "width" : local.width,
          "height" : local.height,
          "properties" : {
            "title" : "GraphQL API ALB",
            "view" : local.view,
            "stacked" : local.stacked,
            "region" : local.region,
            "stat" : local.stat,
            "period" : local.period_dash,
            "metrics" : [
              [
                "AWS/ApplicationELB",
                "ActiveConnectionCount",
                "LoadBalancer",
                local.alb_name,
                { "color" : "#2ca02c" }
              ],
              [".", "RequestCount", ".", ".", { "color" : "#bcbd22" }],
              [".", "HTTPCode_ELB_4XX_Count", ".", ".", { "color" : "#ff7f0e" }],
              [".", "HTTPCode_Target_5XX_Count", ".", ".", { "color" : "#d62728" }],
            ],
          }
        },
        {
          "type" : local.type,
          "x" : 8,
          "y" : local.y,
          "width" : local.width,
          "height" : local.height,
          "properties" : {
            "title" : "Sells-Service API Gateway",
            "view" : local.view,
            "stacked" : local.stacked,
            "region" : local.region,
            "stat" : local.stat,
            "period" : local.period_dash,
            "metrics" : [
              [
                "AWS/ApiGateway",
                "4XXError",
                "ApiName",
                local.api_name, {
                  "id" : "m1", "yAxis" : "left", "color" : "#ff7f0e"
                }
              ],
              [".", "5XXError", ".", ".", { "color" : "#d62728" }],
              [".", "Count", ".", ".", { "color" : "#2ca02c" }]
            ],
          }
        },
        {
          "type" : local.type,
          "x" : 16,
          "y" : local.y,
          "width" : local.width,
          "height" : local.height,
          "properties" : {
            "title" : "Worker Incoming Logs",
            "view" : local.view,
            "stacked" : local.stacked,
            "region" : local.region,
            "stat" : local.stat,
            "period" : local.period_dash,
            "metrics" : [
              [
                "AWS/Logs",
                "IncomingLogEvents",
                "LogGroupName",
                local.log_group_name, {
                  "id" : "m1", "yAxis" : "left", "color" : "#2ca02c"
                }
              ],
              ["Custom", "ErrorCount", { "color" : "#d62728" }]
            ],
          }
        }
      ]
    }
  )
}
