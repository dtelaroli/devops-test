module "pipeline" {
  source = "../../modules/ecs-pipeline"

  env                   = local.env
  name                  = local.name
  region                = local.region
  description           = "Devops Test GraphQL API"
  git_repository        = local.git_repository
  cluster_name          = local.cluster_name
  service_name          = local.name
  sns_arn               = local.sns_arn
  ecr_repository        = aws_ecr_repository.this
  buildspec             = data.template_file.buildspec.rendered
}

data "template_file" "buildspec" {
  template = file("${path.module}/templates/buildspec.yml")

  vars = {
    repository_url        = aws_ecr_repository.this.repository_url
    region                = local.region
    cluster_name          = local.cluster_name
    container_name        = local.name
  }
}
