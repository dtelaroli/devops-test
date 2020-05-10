resource "aws_sqs_queue" "create_dlq" {
  name = "${local.sqs_create_order}-dead-letter"
}

resource "aws_sqs_queue" "create_order" {
  name                      = local.sqs_create_order
  visibility_timeout_seconds = 120
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.create_dlq.arn
    maxReceiveCount     = 2
  })
}

resource "aws_ssm_parameter" "create_order" {
  name  = "/config/api/sqs-create-order"
  type  = "String"
  value = local.sqs_create_order
}
