resource "aws_route53_record" "this" {
  zone_id = local.dns_zone_id
  name    = "${local.name}.${local.dns_zone_name}"
  type    = "CNAME"
  ttl     = "300"
  records = [local.alb_dns_name]
}
