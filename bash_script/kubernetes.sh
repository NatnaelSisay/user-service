
# Check environmental vairable
POD_NAME=user-deployment-57758fc467-f8qlx
kubectl exec -it $POD_NAME -- /bin/sh -c 'echo $JWT_SECRET'