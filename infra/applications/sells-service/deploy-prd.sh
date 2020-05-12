#!/bin/bash

set -e

sam package --s3-bucket liftpay-prd-register-service --template-file pipeline.yaml
sam deploy --s3-bucket liftpay-prd-register-service --stack-name liftpay-register-merchant-service \
  --template-file pipeline.yaml --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    codestarConnection=/config/global/codestar \
    env=/config/global/env \
    region=/config/global/region \
    branch=/config/global/default-branch
