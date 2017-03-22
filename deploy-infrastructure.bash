#!/bin/bash -ex

cd infrastructure
terraform init
terraform plan -var-file audio-insights.tfvars
terraform apply -var-file audio-insights.tfvars
cd ..
