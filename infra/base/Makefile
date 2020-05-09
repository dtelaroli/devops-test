init:
	tfswitch 0.12.24
	aws-vault exec denilson-prd -d 1h -- terraform init

workspaces:
	# aws-vault exec denilson-dev -d 1h -- terraform workspace new devops-test-dev
	aws-vault exec denilson-prd -d 1h -- terraform workspace new devops-test-prd
	
apply_dev:
	tfswitch 0.12.24
	# aws-vault exec denilson-dev -d 1h -- terraform workspace select devops-test-dev
	aws-vault exec denilson-dev -d 1h -- terraform apply

apply_prd:
	tfswitch 0.12.24
	aws-vault exec denilson-prd -d 1h -- terraform workspace select devops-test-prd
	aws-vault exec denilson-prd -d 1h -- terraform apply
	