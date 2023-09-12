aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 039978326156.dkr.ecr.us-east-2.amazonaws.com
#aws ecr batch-delete-image --repository-name degmi --image-ids imageTag=039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi:de-gmi-frontend
docker-compose build --no-cache

#docker-compose build web --no-cache
#docker tag frontend:latest 039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi/frontend:de-gmi-frontend
#docker tag frontend:latest 039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi/frontend:latest
docker push 039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi/frontend:latest
# docker-compose build backend --no-cache
#docker tag backend:latest 039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi/backend:de-gmi-backend
#docker tag backend:latest 039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi/backend:latest
docker push 039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi/backend:latest

# 039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi
