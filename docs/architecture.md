# Documentation

1. [Home](../README.md)
1. Architecture
2. [Pipelines](pipelines.md)
3. [Using](using.md)
4. [Screens](screens.md)
5. [GraphQL API](graphql.md)
6. [Observability and Monitoring](monitoring.md)
7. [Roadmap](roadmap.md)

# Platform

All infrastucture have benn built in IaaS. Using Terraform, CloudFormation and SAM.

<img src="images/architecture.svg" width="600" alt="architecture"/>

# Continuous Deployment

Using GitFlow:

- Merge in master branch starts deployment at production account.

- Merge in develop branch start deployment at staging account (No deployed do KISS).

<img src="images/cicd.svg" alt="cicd"/>

# Deploy IaaS

The deployment requires an execution order and also requires Terraform and Github Token on AWS SSM Parameter Store.

## Installing requirements

```
$ brew install warrensbox/tap/tfswitch
$ brew cask install aws-vault
$ brew install awscli
```

## Creating Github parameter

```
$ aws ssm put-parameter --name /config/github/token --value <GITHUB_TOKEN> --type SecureString
```

## Backend

```
$ cd iaas/backend
$ make init_prd
$ make workspaces # for new environments only
$ make deploy_prd
```

## Base

```
$ cd iaas/base
$ make init_prd
$ make workspaces # for new environments only
$ make deploy_prd
```

## Frontend

```
$ cd iaas/applications/frontend
$ make init_prd
$ make workspaces # for new environments only
$ make deploy_prd
```

## sells-service

```
$ cd iaas/applications/sells-service
$ make init_prd
$ make workspaces # for new environments only
$ make deploy_prd
```

## Monitoring

```
$ cd iaas/applications/monitoring
$ make init_prd
$ make workspaces # for new environments only
$ make deploy_prd
```

# Destroy Infrastructure

```
# Monitoring
$ cd iaas/applications/monitoring
$ make destroy_prd

# Sells Service
# Should clean artifact store with versions
$ cd iaas/applications/sells-service
$ make destroy_prd

# Frontend
$ cd iaas/applications/frontend
$ make destroy_prd

# API
$ cd iaas/applications/api
$ make destroy_prd

# Delete all cloudformation stacks and clean buckets except denilson-devops

# Base
$ cd iaas/base
$ make destroy_prd

# Backend
$ cd iaas/backend
$ make destroy_prd

# Delete bucket denilson-devops
# Delete dynamo table
```

[Next page](pipelines.md)
