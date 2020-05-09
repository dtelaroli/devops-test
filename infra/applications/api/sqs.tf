resource "aws_sqs_queue" "notification_dlq" {
  name                      = "${local.sqs_name}-dead-letter"
}

resource "aws_sqs_queue" "notification" {
  name                      = local.sqs_name
  visibility_timeout_seconds = 120
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.notification_dlq.arn
    maxReceiveCount     = 2
  })
}

resource "aws_ssm_parameter" "sqs_name" {
  name  = "/config/api/sqs-name"
  type  = "String"
  value = local.sqs_name
}
