#!/bin/bash

echo "🚀 Déploiement de l'application CRUD sur Kubernetes"
echo "=================================================="

# Variables
NAMESPACE="crud-app"
K8S_DIR="k8s/base"

# Fonction pour vérifier l'état
check_status() {
  echo "✅ Vérification de l'état..."
  kubectl get all -n $NAMESPACE
}

# Créer le namespace
echo "📦 Création du namespace..."
kubectl apply -f $K8S_DIR/namespace.yaml

# Créer les secrets et configmaps
echo "🔐 Configuration des secrets et configmaps..."
kubectl apply -f $K8S_DIR/postgres-secret.yaml
kubectl apply -f $K8S_DIR/postgres-configmap.yaml
kubectl apply -f $K8S_DIR/backend-configmap.yaml

# Créer le PVC
echo "💾 Création du volume persistant..."
kubectl apply -f $K8S_DIR/postgres-pvc.yaml

# Déployer PostgreSQL
echo "🐘 Déploiement de PostgreSQL..."
kubectl apply -f $K8S_DIR/postgres-deployment.yaml
kubectl apply -f $K8S_DIR/postgres-service.yaml

echo "⏳ Attente de PostgreSQL..."
kubectl wait --for=condition=ready pod -l app=postgres -n $NAMESPACE --timeout=120s

# Déployer Backend
echo "🔨 Déploiement du Backend..."
kubectl apply -f $K8S_DIR/backend-deployment.yaml
kubectl apply -f $K8S_DIR/backend-service.yaml

echo "⏳ Attente du Backend..."
kubectl wait --for=condition=ready pod -l app=backend -n $NAMESPACE --timeout=120s

# Déployer Frontend
echo "🎨 Déploiement du Frontend..."
kubectl apply -f $K8S_DIR/frontend-deployment.yaml
kubectl apply -f $K8S_DIR/frontend-service.yaml

echo "⏳ Attente du Frontend..."
kubectl wait --for=condition=ready pod -l app=frontend -n $NAMESPACE --timeout=120s

# Afficher l'état final
check_status

# Obtenir l'URL
echo ""
echo "🎉 Déploiement terminé !"
echo "========================"
echo ""
echo "🌍 Accède à l'application via :"
minikube service frontend-service -n $NAMESPACE --url