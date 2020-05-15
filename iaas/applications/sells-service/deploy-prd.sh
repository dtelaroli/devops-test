#!/bin/bash

set -e

GITHUB_TOKEN=$(aws ssm get-parameter --name /config/github/token --with-decryption | jq .Parameter.Value)

sam package --s3-bucket denilson-prd-sells-service --template-file pipeline.yml
sam deploy --s3-bucket denilson-prd-sells-service --stack-name denilson-prd-sells-service \
  --template-file pipeline.yml --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    env=prd \
    branch=master \
    githubToken=$GITHUB_TOKEN
    