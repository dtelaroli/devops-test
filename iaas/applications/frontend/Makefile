init_dev:
	aws-vault exec denilson-dev -d 1h -- aws s3 mb s3://denilson-dev-frontent

init_prd:
	aws-vault exec denilson-prd -d 1h -- aws s3 mb s3://denilson-prd-frontend

deploy_dev:
	aws-vault exec denilson-dev -d 1h -- sh deploy-dev.sh

deploy_prd:
	aws-vault exec denilson-prd -d 1h -- sh deploy-prd.sh
	
destroy_dev:
	aws-vault exec denilson-prd -- aws cloudformation delete-stack --stack-name denilson-dev-frontend
	echo "Ok"

destroy_prd:
	aws-vault exec denilson-prd -- aws cloudformation delete-stack --stack-name denilson-prd-frontend
	echo "Ok"
