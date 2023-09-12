kubectl delete -n gmi -f db-init-config-map.yaml
kubectl delete -n gmi -f web-deployment.yaml,web-service.yaml
kubectl delete -n gmi -f backend-claim0-persistentvolumeclaim.yaml,backend-claim1-persistentvolumeclaim.yaml,backend-deployment.yaml,backend-service.yaml
kubectl delete -n gmi -f db-claim0-persistentvolumeclaim.yaml,db-deployment.yaml,db-service.yaml
# kubectl delete namespace gmi
