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

variable "AUTH0_SECRET" {
  description = "The Auth0 secret"
  type        = string
}

variable "AUTH0_CLIENT_ID" {
  description = "The Auth0 client ID"
  type        = string
}

variable "AUTH0_CLIENT_SECRET" {
  description = "The Auth0 client secret"
  type        = string
}

variable "AUTH0_ISSUER_BASE_URL" {
  description = "The Auth0 issuer base URL"
  type        = string
}

