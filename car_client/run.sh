ip=`docker inspect -f='{{.NetworkSettings.IPAddress}}' $(docker ps -f ancestor=ford:repo -q)`
docker run -it --add-host=repo:$ip ford:car