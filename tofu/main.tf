data "cloudflare_zone" "zone" {
  name = var.domain
}

locals {
  project_configs = {
    for key, project in var.projects : key => {
      subdomain  = project.subdomain
      fqdn       = "${project.subdomain}.${var.domain}"
      pages_name = "andy-apps-${key}"
    }
  }
}

resource "cloudflare_pages_project" "preview" {
  account_id        = var.cloudflare_account_id
  name              = "andy-apps-preview"
  production_branch = "main"
}

resource "cloudflare_pages_project" "project" {
  for_each = local.project_configs

  account_id        = var.cloudflare_account_id
  name              = each.value.pages_name
  production_branch = "main"
}

resource "cloudflare_pages_domain" "domain" {
  for_each = local.project_configs

  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.project[each.key].name
  domain       = each.value.fqdn
}

resource "cloudflare_record" "cname" {
  for_each = local.project_configs

  zone_id         = data.cloudflare_zone.zone.id
  name            = each.value.subdomain
  content         = cloudflare_pages_project.project[each.key].subdomain
  type            = "CNAME"
  proxied         = true
  allow_overwrite = true
}
