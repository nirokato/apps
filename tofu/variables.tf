variable "cloudflare_api_token" {
  description = "Cloudflare API token with Zone:Zone:Read, Zone:DNS:Edit, Account:Cloudflare Pages:Edit, and Account:Workers KV Storage:Edit permissions"
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
  default     = ["homepage", "clock", "weft", "peer-drop", "trove", "zmk-keymap", "bubble-share", "github-uptime", "mirage", "reader"]
}

variable "kv_projects" {
  description = "Projects whose Pages worker needs a Workers KV namespace, bound as KV. Each must also be in var.projects."
  type        = set(string)
  default     = ["reader"]
}
