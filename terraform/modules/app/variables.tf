variable "project" {
  description = "The project ID to deploy to"
  type        = string
}

variable "region" {
  description = "The region to deploy to"
  type        = string
}

variable "image" {
  description = "The Docker image to deploy"
  type        = string
}

variable "service_name" {
  description = "The name of the Cloud Run service"
  type        = string
}

variable "auth0_secret" {
  description = "The Auth0 secret"
  type        = string
}

variable "auth0_issuer_base_url" {
  description = "The Auth0 issuer base URL"
  type        = string
}

variable "auth0_client_id" {
  description = "The Auth0 client ID"
  type        = string
}

variable "auth0_client_secret" {
  description = "The Auth0 client secret"
  type        = string
}
