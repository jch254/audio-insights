variable "aws_region" {
  description = "AWS region for the CodeBuild deployment project and S3 bucket."
  type        = string
  default     = "ap-southeast-4"
}

variable "environment" {
  description = "Deployment environment label."
  type        = string
  default     = "prod"
}

variable "domain" {
  description = "Cloudflare zone name."
  type        = string
  default     = "603.nz"
}

variable "host" {
  description = "Hostname served by the CloudFront distribution."
  type        = string
  default     = "audio-insights.603.nz"
}

variable "bucket_name" {
  description = "S3 bucket name used for the private CloudFront origin."
  type        = string
  default     = "audio-insights-603-nz-prod"
}

variable "cloudflare_api_token_parameter_name" {
  description = "SSM Parameter Store name containing the Cloudflare API token."
  type        = string
  default     = "/audio-insights/cloudflare-api-token"
}

variable "ga_id_parameter_name" {
  description = "SSM Parameter Store name containing the Google Analytics ID injected at build time."
  type        = string
  default     = "/audio-insights/ga-id"
}

variable "spotify_client_id_parameter_name" {
  description = "SSM Parameter Store name containing the Spotify client ID injected at build time."
  type        = string
  default     = "/audio-insights/spotify-client-id"
}

variable "spotify_callback_uri" {
  description = "Spotify OAuth callback URI injected into the build."
  type        = string
  default     = "https://audio-insights.603.nz/spotifylogincallback"
}

variable "spotify_scopes" {
  description = "Spotify OAuth scopes injected into the build."
  type        = string
  default     = "user-top-read playlist-modify-private"
}

variable "kms_key_arns" {
  description = "KMS key ARNs CodeBuild can use to decrypt SecureString parameters, when those parameters use a customer-managed key."
  type        = list(string)
  default     = ["arn:aws:kms:ap-southeast-4:982898479788:key/0ec9686b-13a1-40fc-8256-86e8d3503e9c"]
}

variable "codebuild_project_name" {
  description = "Name of the CodeBuild project that builds and deploys the SPA."
  type        = string
  default     = "audio-insights"
}

variable "codebuild_source_location" {
  description = "GitHub repository URL used by the CodeBuild source."
  type        = string
  default     = "https://github.com/jch254/audio-insights.git"
}

variable "codebuild_buildspec" {
  description = "Path to the CodeBuild buildspec file."
  type        = string
  default     = "buildspec.yml"
}

variable "codebuild_build_compute_type" {
  description = "CodeBuild compute type."
  type        = string
  default     = "BUILD_GENERAL1_SMALL"
}

variable "codebuild_build_docker_image" {
  description = "Docker image to use as the CodeBuild build environment."
  type        = string
  default     = "jch254/docker-node-terraform-aws"
}

variable "codebuild_build_docker_tag" {
  description = "Docker image tag to use as the CodeBuild build environment."
  type        = string
  default     = "22.x-docker"
}

variable "codebuild_cache_bucket" {
  description = "Optional S3 bucket/prefix for CodeBuild dependency cache."
  type        = string
  default     = "jch254-codebuild-cache/audio-insights"
}

variable "remote_state_bucket" {
  description = "S3 bucket used for Terraform remote state."
  type        = string
  default     = "jch254-terraform-remote-state"
}

variable "remote_state_key" {
  description = "S3 key used for this repo's Terraform remote state."
  type        = string
  default     = "audio-insights"
}

variable "codebuild_webhook_enabled" {
  description = "Whether CodeBuild should deploy automatically on pushes to the source branch."
  type        = bool
  default     = true
}

variable "codebuild_webhook_branch" {
  description = "Git branch that triggers CodeBuild webhook builds."
  type        = string
  default     = "master"
}

variable "build_notifier_lambda_function_arn" {
  description = "Optional shared build-notifier Lambda ARN for CodeBuild success/failure notifications."
  type        = string
  default     = ""
}
