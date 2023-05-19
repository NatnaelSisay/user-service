
# Check environmental vairable
POD_NAME=user-deployment-748994f459-k2kq2
kubectl exec -it $POD_NAME -- /bin/sh -c 'echo $DB_NAME'