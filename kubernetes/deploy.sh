export REGISTRY_USERNAME='rob6112628'
export REGISTRY_PASSWORD='Chui2023@@'
export REGISTRY_TOKEN='glpat-uUwaX8obSBDuw5nAix3f'
export REGISTRY_EMAIL='rob@digitalexhaust.co'
export BASE_64_BASIC_AUTH_CREDENTIALS_PSWD='echo -n "$REGISTRY_USERNAME:$REGISTRY_PASSWORD" | base64'
export BASE_64_BASIC_AUTH_CREDENTIALS='echo -n "$REGISTRY_USERNAME:$REGISTRY_TOKEN" | base64'

kubectl config set-cluster expona
kubectl create namespace gmi
kubectl config set-context --current --namespace=gmi

kubectl apply -n gmi -f db-init-config-map.yaml
kubectl apply -n gmi -f db-deployment.yaml,db-service.yaml
kubectl apply -n gmi -f web-deployment.yaml,web-service.yaml
kubectl apply -n gmi -f backend-deployment.yaml,backend-service.yaml

kubectl get pods --all-namespaces
kubectl get svc --all-namespaces
