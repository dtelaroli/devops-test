variable "cluster_name" {
  description = "The Cluster Name"
}

variable "container_name" {
  description = "The container_name"
}

variable "subnet_ids" {
  type        = list(string)
  description = "List of Service Subnets"
}

variable "vpc_id" {
  description = "The VPC id"
}

variable "container_port" {
  description = "Container Port"
}

variable "container_cpu" {
  description = "Container CPU"
}

variable "container_memory" {
  description = "Container memory"
}

variable "alb_arn" {
  description = "Load Balancer ARN"
}

variable "alb_port" {
  description = "Load Balancer Port"
}

variable "desired_count" {
  description = "desired count"
}

variable "secrets" {
  default = ""
}

variable "ecs_iam_role_arn" {
}
