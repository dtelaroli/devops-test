data "aws_route53_zone" "this" {
  name = local.dns_name
}

resource "aws_acm_certificate" "this" {
  domain_name               = "*.${local.dns_name}"
  validation_method         = "DNS"
  subject_alternative_names = [local.dns_name]

  tags = {
    Name = "ACM for ${local.dns_name}"
  }

  lifecycle {
    create_before_destroy = false
  }
}

resource "aws_route53_record" "this" {
  zone_id = data.aws_route53_zone.this.zone_id
  name    = aws_acm_certificate.this.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.this.domain_validation_options.0.resource_record_type
  ttl     = "60"
  records = [aws_acm_certificate.this.domain_validation_options.0.resource_record_value]
}

resource "aws_acm_certificate_validation" "this" {
  certificate_arn         = aws_acm_certificate.this.arn
  validation_record_fqdns = [aws_route53_record.this.fqdn]
}

resource "aws_ssm_parameter" "acm_arn" {
  name  = "/config/base/arn"
  type  = "String"
  value = aws_acm_certificate.this.arn
}

resource "aws_ssm_parameter" "dns_zone_id" {
  name  = "/config/base/dns-zone-id"
  type  = "String"
  value = data.aws_route53_zone.this.zone_id
}

resource "aws_ssm_parameter" "dns_name" {
  name  = "/config/base/dns-name"
  type  = "String"
  value = local.dns_name
}

