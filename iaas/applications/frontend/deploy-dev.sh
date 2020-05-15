#!/bin/bash

set -e

GITHUB_TOKEN=$(aws ssm get-parameter --name /config/github/token --with-decryption | jq .Parameter.Value)

sam package --s3-bucket denilson-dev-frontend
sam deploy --s3-bucket denilson-dev-frontend --stack-name denilson-dev-frontend \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    env=dev \
    branch=develop \
    githubToken=$GITHUB_TOKEN
