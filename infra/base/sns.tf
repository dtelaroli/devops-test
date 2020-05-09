resource "aws_sns_topic" "this" {
  name = "${local.company}-notification"

  provisioner "local-exec" {
    command = "aws sns subscribe --topic-arn ${self.arn} --protocol email --notification-endpoint ${local.email}"
  }
}
