resource "aws_route53_record" "backend" {
  zone_id = local.dns_zone_id
  name    = "backend.${local.dns_zone_name}"
  type    = "CNAME"
  ttl     = "300"
  records = [local.alb_dns_nameØ]
}
