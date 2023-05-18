IMAGE_NAME="userimage:latest"
USER_NAME="javaethio"

docker build -t $IMAGE_NAME .
docker tag $IMAGE_NAME $USER_NAME/$IMAGE_NAME
docker push $USER_NAME/$IMAGE_NAME