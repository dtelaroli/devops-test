resource "aws_elasticache_cluster" "redis" {
  cluster_id           = local.name
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis3.2"
  engine_version       = "3.2.10"
  port                 = local.elasticache_port
  apply_immediately    = true
  subnet_group_name    = aws_elasticache_subnet_group.this.name
  security_group_ids   = [aws_security_group.ec.id]
}

resource "aws_elasticache_subnet_group" "this" {
  name       = local.name
  subnet_ids = local.subnets
}

resource "aws_security_group" "ec" {
  name        = "${local.name}-elasticache"
  description = "Access to Elasticache"
  vpc_id      = local.vpc_id

  ingress {
    from_port       = local.elasticache_port
    to_port         = local.elasticache_port
    protocol        = "tcp"
    security_groups = [module.ecs-service.security_group]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
