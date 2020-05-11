resource "aws_ecr_repository" "this" {
  name = local.container_name
}

resource "aws_ecr_lifecycle_policy" "this" {
  repository = aws_ecr_repository.this.name
  policy     = file("./templates/ecr_policy.json")
}

