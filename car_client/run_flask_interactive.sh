ip=`docker inspect -f='{{.NetworkSettings.IPAddress}}' $(docker ps -f ancestor=ford:repo -q)`
docker run -it -e FLASK_APP=/app/car.py --add-host=repo:$ip -p 3001:5000 -v "$(pwd)":/app ford:car /app/start_services.sh
