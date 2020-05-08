module "pipeline" {
  source = "../modules/ecs-pipeline"

  env            = local.env
  name           = local.name
  region         = local.region
  description    = "Devops Test GraphQL API"
  ecr_repository = module.ecs-service.repository
  git_repository = local.git_repository
  cluster_name   = local.cluster_name
  service_name   = local.name
  container_name = local.name
  buildspec      = data.template_file.buildspec.rendered
}

data "template_file" "buildspec" {
  template = file("${path.module}/templates/buildspec.yml")

  vars = {
    repository_url = module.ecs-service.repository.repository_url
    region         = local.region
    cluster_name   = local.cluster_name
    container_name = local.name
  }
}
