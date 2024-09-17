terraform {
    required_providers {
      docker = {
        source = "kreuzwerker/docker"
        version = "3.0.2"
      }
    }
}

provider "google" {
  project     = var.project
  region      = var.region
}

resource "google_project_service" "run" {
  project = var.project
  service = "run.googleapis.com"
}

resource "google_project_service" "build" {
  project = var.project
  service = "cloudbuild.googleapis.com"
}

resource "google_project_service" "artifact_registry" {
  project = var.project
  service = "artifactregistry.googleapis.com"

  disable_on_destroy = false
}

resource "google_secret_manager_secret" "auth0_secret" {
  secret_id = "auth0-secret"
   replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}

resource "google_secret_manager_secret_version" "auth0_secret_version" {
  secret      = google_secret_manager_secret.auth0_secret.id
  secret_data = var.auth0_secret
}

resource "google_secret_manager_secret" "auth0_issuer_base_url" {
  secret_id = "auth0-issuer-base-url"
   replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}

resource "google_secret_manager_secret_version" "auth0_issuer_base_url_version" {
  secret      = google_secret_manager_secret.auth0_issuer_base_url.id
  secret_data = var.auth0_issuer_base_url
}

resource "google_secret_manager_secret" "auth0_client_id" {
  secret_id = "auth0-client-id"
   replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}

resource "google_secret_manager_secret_version" "auth0_client_id_version" {
  secret      = google_secret_manager_secret.auth0_client_id.id
  secret_data = var.auth0_client_id
}

resource "google_secret_manager_secret" "auth0_client_secret" {
  secret_id = "auth0-client-secret"
   replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}

resource "google_secret_manager_secret_version" "auth0_client_secret_version" {
  secret      = google_secret_manager_secret.auth0_client_secret.id
  secret_data = va.auth0_client_secret
}

resource "google_cloud_run_service" "cloud_run_service" {
  name     = var.service_name
  location = var.region

  template {
    spec {
      containers {
        image = var.image
        resources {
          limits = {
            memory = "512Mi"
            cpu    = "1"
          }
        }
        env {
          name = "AUTH0_SECRET"
          value = var.auth0_secret
        }
        env {
          name = "AUTH0_ISSUER_BASE_URL"
          value = var.auth0_issuer_base_url
        }
        env {
          name = "AUTH0_CLIENT_ID"
          value = var.auth0_client_id
        }
        env {
          name = "AUTH0_CLIENT_SECRET"
          value = var.auth0_client_secret
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [
    google_project_service.run,
    google_project_service.build
  ]
}

resource "null_resource" "set_auth0_base_url" {
  provisioner "local-exec" {
    command = <<EOT
      gcloud run services update ${google_cloud_run_service.cloud_run_service.name} --region ${var.region} --update-env-vars=AUTH0_BASE_URL=${google_cloud_run_service.cloud_run_service.status[0].url}
    EOT
  }

  depends_on = [google_cloud_run_service.cloud_run_service]
}

resource "google_cloud_run_service_iam_member" "public" {
  service    = google_cloud_run_service.cloud_run_service.name
  location   = google_cloud_run_service.cloud_run_service.location
  project    = var.project
  role       = "roles/run.invoker"
  member     = "allUsers"
}

output "cloud_run_url" {
  value = google_cloud_run_service.cloud_run_service.status[0].url
}