output "project_urls" {
  description = "URLs for all deployed projects"
  value = {
    for key, config in local.project_configs :
    key => "https://${config.fqdn}"
  }
}
