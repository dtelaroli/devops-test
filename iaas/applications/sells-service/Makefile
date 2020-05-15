init_dev:
	aws-vault exec denilson-dev -d 1h -- aws s3 mb s3://denilson-dev-sells-service

init_prd:
	aws-vault exec denilson-prd -d 1h -- aws s3 mb s3://denilson-prd-sells-service

deploy_dev:
	aws-vault exec denilson-dev -d 1h -- sh deploy-dev.sh

deploy_prd:
	aws-vault exec denilson-prd -d 1h -- sh deploy-prd.sh
	
destroy_dev:
	aws-vault exec denilson-prd -- aws cloudformation delete-stack --stack-name denilson-dev-sells-service
	echo "Ok"

destroy_prd:
	aws-vault exec denilson-prd -- aws cloudformation delete-stack --stack-name denilson-prd-sells-service
	echo "Ok"
