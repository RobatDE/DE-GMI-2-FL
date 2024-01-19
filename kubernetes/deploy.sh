export REGISTRY_USERNAME='rob6112628'
export REGISTRY_PASSWORD='Chui2023@@'
export REGISTRY_TOKEN='glpat-uUwaX8obSBDuw5nAix3f'
export REGISTRY_EMAIL='rob@digitalexhaust.co'
export BASE_64_BASIC_AUTH_CREDENTIALS_PSWD='echo -n "$REGISTRY_USERNAME:$REGISTRY_PASSWORD" | base64'
export BASE_64_BASIC_AUTH_CREDENTIALS='echo -n "$REGISTRY_USERNAME:$REGISTRY_TOKEN" | base64'

# kubectl create secret docker-registry registry-credentials --docker-server=https://registry.gitlab.com --docker-username=REGISTRY_USERNAME --docker-password=REGISTRY_PASSWORD --docker-email=REGISTRY_EMAIL
# kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "registry-credentials"}]}'
# kubectl apply -f registry-credentials.yaml
kubectl config set-cluster expona
kubectl create namespace gmi
kubectl config set-context --current --namespace=gmi

# define ingress controller
kubectl apply -f ./ingress-ingress.yaml 

kubectl apply -n gmi -f db-init-config-map.yaml
kubectl apply -n gmi -f db-deployment.yaml,db-service.yaml
kubectl apply -n gmi -f web-deployment.yaml,web-service.yaml
kubectl apply -n gmi -f backend-deployment.yaml,backend-service.yaml

# aws iam create-role  --role-name AmazonEKS_EBS_CSI_Driver  --assume-role-policy-document file://"trust-policy.json"
# aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy --role-name AmazonEKS_EBS_CSI_Driver
# aws eks create-addon  --cluster-name DEGMI  --addon-name aws-ebs-csi-driver  --service-account-role-arn arn:aws:iam::039978326156:role/AmazonEKS_EBS_CSI_DriverRole
# eksctl create iamserviceaccount     --name ebs-csi-controller-sa     --namespace kube-system     --cluster DEGMI     --role-name AmazonEKS_EBS_CSI_DriverRole     --role-only     --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy     --approve
# kubectl get all -l app.kubernetes.io/name=aws-ebs-csi-driver -n kube-system

kubectl get pods --all-namespaces
kubectl get svc --all-namespaces
