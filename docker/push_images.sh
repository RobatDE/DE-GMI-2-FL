#aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 039978326156.dkr.ecr.us-east-2.amazonaws.com
#aws ecr batch-delete-image --repository-name degmi --image-ids imageTag=039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi:de-gmi-frontend

#docker login -u robatde -p ${DOCKER_HUB_TOKEN}
docker images --format="{{.Repository}} {{.ID}}" | grep "registry.gitlab" | cut -d' ' -f2 | xargs docker rmi --force
docker login registry.gitlab.com -u rob6112628 -p Chui2023@@
docker-compose build --no-cache

#docker-compose build web --no-cache
#docker tag frontend:latest 039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi/frontend:de-gmi-frontend
#docker tag frontend:latest 039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi/frontend:latest
#docker build -t registry.gitlab.com/de4512928/saas/backup:latest .
#docker tag robatde/de-gmi-images:frontend robatde/de-gmi-images:latest
#docker push robatde/de-gmi-images:frontend
# docker-compose build backend --no-cache
#docker tag backend:latest 039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi/backend:de-gmi-backend
#docker tag backend:latest 039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi/backend:latest
#docker push 039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi/backend:latest
#docker tag robatde/de-gmi-images:backend robatde/de-gmi-images:latest
docker push registry.gitlab.com/de4512928/saas/backend:latest
docker push registry.gitlab.com/de4512928/saas/frontend:latest
docker push registry.gitlab.com/de4512928/saas/expona-postgresql:latest
# 039978326156.dkr.ecr.us-east-2.amazonaws.com/degmi
