terraform {
    required_providers {
      docker = {
        source = "kreuzwerker/docker"
        version = "3.0.2"
      }
    }
}

provider "docker" {
    host = "npipe:////.//pipe//docker_engine"
}


resource "docker_container" "suggestionappjs" {
  image = "suggestionsappnextjs-dev:latest"
  name = "suggestionappjs"
  ports {
    internal = 3000
    external = 3000
  }

    // Mount the ADC JSON file into the container
  volumes {
    host_path      = "C:\\Users\\etexd\\AppData\\Roaming\\gcloud\\application_default_credentials.json"
    container_path = "/app/app_default_credentials.json"
  }

// this env variable needs to be a set of strings KEY=VALUE

  env = [
    "AUTH0_SECRET=e8b204c694e6d79a62282a2b24c736ad",
    "AUTH0_ISSUER_BASE_URL=https://dev-icvm6044xly707fh.us.auth0.com/",
    "AUTH0_CLIENT_ID=GQMd5udxC3Jq9x1yi7PfhMWiwExFCC4M",
    "AUTH0_CLIENT_SECRET=Itjxx-rkLxZxQbJzoj7loAeQx_yPYgTq71AbcNiNo2bwK3a0qb28axhrLoiNVP8L",
    "AUTH0_BASE_URL=http://localhost:3000",
    "PROJECT_ID=mikeyandme-suggestions-develop",
    "GOOGLE_APPLICATION_CREDENTIALS=/app/app_default_credentials.json"
  ]
  
}