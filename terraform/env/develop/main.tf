terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

provider "docker" {
  host = "npipe:////.//pipe//docker_engine"
}

module "app" {
  source               = "../../modules/app"
  project              = var.project
  region               = var.region
  image                = var.image
  service_name         = var.service_name
  auth0_secret         = var.AUTH0_SECRET
  auth0_issuer_base_url = var.AUTH0_ISSUER_BASE_URL
  auth0_client_id       = var.AUTH0_CLIENT_ID
  auth0_client_secret   = var.AUTH0_CLIENT_SECRET
}

locals {
  dkr_build_cmd = <<-EOT
    docker push ${var.image}
  EOT
}

resource "docker_tag" "suggestionsappnextjs-dev-tag" {
  target_image = var.image
  source_image = "suggestionsappnextjs-dev:latest"
}

resource "null_resource" "push_docker_image" {
  provisioner "local-exec" {
    command = local.dkr_build_cmd
  }
  depends_on = [docker_tag.suggestionsappnextjs-dev-tag]
}

output "cloud_run_service_url" {
  value = module.app.cloud_run_url
  description = "The URL of the deployed service"
}

