variable "name" {}

variable "description" {
  default = ""
}

variable "git_repository" {}

variable "env" {}

variable "ecr_repository" {}

variable "container_name" {}

variable "cluster_name" {}

variable "service_name" {}

variable "region" {}

variable "buildspec" {}
