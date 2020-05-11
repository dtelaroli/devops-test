resource "aws_elasticache_cluster" "redis" {
  cluster_id           = local.name
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis3.2"
  engine_version       = "3.2.10"
  port                 = 6379
  apply_immediately    = true
  subnet_group_name    = aws_elasticache_subnet_group.this.name
  security_group_ids   = [module.ecs-service.security_group]
}

resource "aws_elasticache_subnet_group" "this" {
  name       = local.name
  subnet_ids = local.subnets
}
