IMAGE_NAME="userimage"
USER_NAME="javaethio"
VERSION="0.0.8"

cd ..
docker build -t $IMAGE_NAME:$VERSION .
docker tag $IMAGE_NAME:$VERSION $USER_NAME/$IMAGE_NAME:$VERSION
docker push $USER_NAME/$IMAGE_NAME:$VERSION