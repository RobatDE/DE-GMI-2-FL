docker images --format="{{.Repository}} {{.ID}}" | grep "registry.gitlab" | cut -d' ' -f2 | xargs docker rmi --force
docker-compose build --no-cache

