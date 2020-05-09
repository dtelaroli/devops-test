resource "aws_iam_role" "ecs" {
  name = "${local.company}-ecs-role"

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
  role       = aws_iam_role.ecs.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
