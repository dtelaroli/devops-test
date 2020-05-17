locals {
  name = "monitoring"
  env                   = data.terraform_remote_state.base.outputs.env
  region                = data.terraform_remote_state.base.outputs.region
}
