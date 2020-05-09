output "vpc_id" {
  value = module.vpc.vpc_id
}

output "azs" {
  value = local.azs
}

output "env" {
  value = local.env
}

output "private_subnets" {
  value = module.vpc.private_subnets
}

output "public_subnets" {
  value = module.vpc.public_subnets
}

output "region" {
  value = local.region
}

output "alb_arn" {
  value = aws_alb.this.arn
}

output "alb_dns_name" {
  value = aws_alb.this.dns_name
}

output "ecs_iam_role_arn" {
  value = aws_iam_role.ecs.arn
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.this.name
}

output "alb_security_group_id" {
  value = aws_security_group.this.id
}
