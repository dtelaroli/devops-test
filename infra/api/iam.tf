resource "aws_iam_role" "this" {
  name = "${local.name}-ecs-role"

  assume_role_policy = <<EOF
{
  "Version": "2008-10-17",
  "Statement": [
  	{
  	  "Sid": "",
  	  "Effect": "Allow",
  	  "Principal": {
  		"Service": "ecs.amazonaws.com"
  	  },
  	  "Action": "sts:AssumeRole"
  	},
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }    
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ecs" {
  role       = aws_iam_role.this.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_policy" "this" {
  name = "${local.name}-ecs-policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ssm:GetParametersByPath",
        "secretsmanager:GetSecretValue",
        "kms:Decrypt"
      ],
      "Resource": [
        "arn:aws:ssm:${local.region}:*:parameter/config/${local.name}*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "sqs:*",
      "Resource": "arn:aws:sqs:${local.region}:*:*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::liftpay-conciliation",
        "arn:aws:s3:::liftpay-conciliation/*",
        "arn:aws:s3:::${local.env}-billet",
        "arn:aws:s3:::${local.env}-billet/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_policy_attachment" "this" {
  name = "${local.name}-policy-attachment"
  roles      = [aws_iam_role.this.name]
  policy_arn = aws_iam_policy.this.arn
}

resource "aws_iam_role" "ag_sqs" {
  name = "${local.name}-ag-sqs"

  assume_role_policy = <<EOF
{
  "Version": "2008-10-17",
  "Statement": [
  	{
  	  "Sid": "",
  	  "Effect": "Allow",
  	  "Principal": {
  		"Service": "apigateway.amazonaws.com"
  	  },
  	  "Action": "sts:AssumeRole"
  	}
  ]
}
EOF
}

resource "aws_iam_policy" "ag_sqs" {
  name = "${local.name}-ag-sqs"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sqs:*",
      "Resource": "arn:aws:sqs:${local.region}:*:${local.sqs_name}*"
    }
  ]
}
EOF
}

resource "aws_iam_policy_attachment" "ag_sqs" {
  name = "${local.name}-ag-sqs-policy-attachment"
  roles      = [aws_iam_role.ag_sqs.name]
  policy_arn = aws_iam_policy.ag_sqs.arn
}
