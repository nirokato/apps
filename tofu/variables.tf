variable "cloudflare_api_token" {
  description = "Cloudflare API token with Zone:Zone:Read, Zone:DNS:Edit, and Account:Cloudflare Pages:Edit permissions"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
}

variable "domain" {
  description = "Root domain name"
  type        = string
  default     = "andymolenda.com"
}

variable "projects" {
  description = "Map of project names. Key = project name, used as subdomain under apps.andymolenda.com. 'homepage' is special — serves apps.andymolenda.com root."
  type        = set(string)
  default     = ["homepage", "clock"]
}
