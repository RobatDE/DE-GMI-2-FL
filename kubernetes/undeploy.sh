kubectl delete -n gmi -f web-deployment.yaml,web-service.yaml
kubectl delete -n gmi -f backend-deployment.yaml,backend-service.yaml
kubectl delete -n gmi -f db-deployment.yaml,db-service.yaml
