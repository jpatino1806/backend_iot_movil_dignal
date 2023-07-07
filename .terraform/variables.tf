variable "project" {
  description = "Google Cloud Platform (GCP) Project ID."
  type        = string
}

variable "region" {
  description = "GCP region name"
  type        = string
}

variable "user" {
  type = string
}

variable "privatekeypath" {
  type    = string
}

variable "publickeypath" {
  type    = string
}
