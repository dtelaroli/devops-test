resource "aws_security_group" "this" {
  name        = "${var.container_name}-ecs"
  description = "Access to ECS container"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = "3000"
    to_port     = "3000"
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
