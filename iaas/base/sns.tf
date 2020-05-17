resource "aws_sns_topic" "this" {
  name = "${local.company}-notification"

  provisioner "local-exec" {
    command = "aws sns subscribe --topic-arn ${self.arn} --protocol email --notification-endpoint ${local.email}"
  }
}

data "aws_iam_policy_document" "this" {
  statement {
    sid     = "codestart"
    actions = ["sns:Publish"]

    principals {
      type        = "Service"
      identifiers = ["codestar-notifications.amazonaws.com"]
    }

    resources = [aws_sns_topic.this.arn]
  }

  statement {
    sid     = "cloudwatch"
    actions = ["sns:Publish"]

    principals {
      type        = "Service"
      identifiers = ["cloudwatch.amazonaws.com"]
    }

    resources = [aws_sns_topic.this.arn]
  }
}

resource "aws_sns_topic_policy" "default" {
  arn    = aws_sns_topic.this.arn
  policy = data.aws_iam_policy_document.this.json
}

resource "aws_ssm_parameter" "create_order" {
  name  = "/config/global/sns-notification-arn"
  type  = "String"
  value = aws_sns_topic.this.arn
}
