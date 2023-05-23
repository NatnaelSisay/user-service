const k8s = require("@kubernetes/client-node");

// Create an instance of the Kubernetes API client
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const coreApi = kc.makeApiClient(k8s.CoreV1Api);

// Define the namespace and secret name where the secret is located
const namespace = "default";
const secretName = "jwt-private-key";

// Retrieve the secret from Kubernetes
async function getSecretKey() {
  const secret = await coreApi.readNamespacedSecret(secretName, namespace);
  const secretData = secret.body.data;
  const secretKey = secretData["private_key.pem"];
  const decodedSecretKey = Buffer.from(secretKey, "base64").toString("utf-8");
  return decodedSecretKey;
}

module.exports = getSecretKey;