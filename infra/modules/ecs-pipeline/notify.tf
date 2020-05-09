resource "aws_codestarnotifications_notification_rule" "build" {
  detail_type = "BASIC"
  event_type_ids = [
    "codebuild-project-build-state-succeeded",
    "codebuild-project-build-state-failed"
  ]

  name     = "${var.name}-notify-build"
  resource = aws_codebuild_project.this.arn

  target {
    address = var.sns_arn
  }
}

resource "aws_codestarnotifications_notification_rule" "pipeline" {
  detail_type = "BASIC"
  event_type_ids = [
    "codepipeline-pipeline-pipeline-execution-failed",
    "codepipeline-pipeline-pipeline-execution-succeeded",
    "codepipeline-pipeline-manual-approval-needed"
  ]

  name     = "${var.name}-notify-pipeline"
  resource = aws_codepipeline.this.arn

  target {
    address = var.sns_arn
  }
}
