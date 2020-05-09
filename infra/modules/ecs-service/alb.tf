resource "aws_alb_listener" "this" {
  load_balancer_arn = var.alb_arn
  port              = var.alb_port
  protocol          = "HTTP"
  # ssl_policy        = "ELBSecurityPolicy-2016-08"
  # certificate_arn   = ""

  default_action {
    target_group_arn = aws_alb_target_group.this.arn
    type             = "forward"
  }
}

resource "aws_alb_target_group" "this" {
  name        = var.container_name
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    path                = "/.well-known/apollo/server-health"
    port                = var.container_port
    interval            = 10
    healthy_threshold   = 3
    unhealthy_threshold = 3
  }
}
