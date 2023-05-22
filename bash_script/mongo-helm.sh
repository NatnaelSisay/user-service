helm install mongo-review \
    --set architecture=$ARCHITECTURE,auth.rootPassword=password,auth.username=user,auth.password=password,auth.database=review-db,replicaCount=3 \
    oci://registry-1.docker.io/bitnamicharts/mongodb
    