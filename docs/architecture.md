# Documentation

[Home](../README.md)

**Arquitecture**

[Using](using.md)

[Screens](screens.md)

[GraphQL API](graphql.md)

[Observability and Monitoring](monitoring.md)

[Roadmap](roadmap.md)

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
$ cd iaas/frontend
$ make init_prd
$ make workspaces # for new environments only
$ make deploy_prd
```

## sells-service

```
$ cd iaas/frontend
$ make init_prd
$ make workspaces # for new environments only
$ make deploy_prd
```

## Monitoring

```
$ cd iaas/frontend
$ make init_prd
$ make workspaces # for new environments only
$ make deploy_prd
```

[Next page](using.md)
