#!/bin/bash

set -e

GITHUB_TOKEN=$(aws ssm get-parameter --name /config/github/token --with-decryption | jq .Parameter.Value)

sam package --s3-bucket denilson-prd-frontend
sam deploy --s3-bucket denilson-prd-frontend --stack-name denilson-prd-frontend \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    env=prd \
    branch=master \
    githubToken=$GITHUB_TOKEN \
    apiDnsName=/config/api/dns-name \
    dnsName=/config/base/dns-name 
