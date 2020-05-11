output "sqs_notify_order_url" {
  value = data.aws_sqs_queue.notify_order.url
}

output "dynamo_order_table_name" {
  value = aws_dynamodb_table.order.name
}

output "repository" {
  value = aws_ecr_repository.this
}

output "elasticache" {
  value = aws_elasticache_cluster.redis.cache_nodes
}
