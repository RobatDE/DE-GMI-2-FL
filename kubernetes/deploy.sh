kubectl create namespace gmi
kubectl apply -n gmi -f db-init-config-map.yaml
kubectl apply -n gmi -f db-claim0-persistentvolumeclaim.yaml,db-deployment.yaml,db-service.yaml
kubectl apply -n gmi -f web-deployment.yaml,web-service.yaml
kubectl apply -n gmi -f backend-claim0-persistentvolumeclaim.yaml,backend-claim1-persistentvolumeclaim.yaml,backend-deployment.yaml,backend-service.yaml

# aws iam create-role  --role-name AmazonEKS_EBS_CSI_Driver  --assume-role-policy-document file://"trust-policy.json"
# aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy --role-name AmazonEKS_EBS_CSI_Driver
# aws eks create-addon  --cluster-name DEGMI  --addon-name aws-ebs-csi-driver  --service-account-role-arn arn:aws:iam::039978326156:role/AmazonEKS_EBS_CSI_DriverRole
# eksctl create iamserviceaccount     --name ebs-csi-controller-sa     --namespace kube-system     --cluster DEGMI     --role-name AmazonEKS_EBS_CSI_DriverRole     --role-only     --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy     --approve
# kubectl get all -l app.kubernetes.io/name=aws-ebs-csi-driver -n kube-system

kubectl -n gmi get pods
kubectl -n gmi get svc 
