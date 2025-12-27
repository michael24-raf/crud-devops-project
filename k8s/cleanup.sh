#!/bin/bash

echo "🧹 Nettoyage de l'application CRUD"
echo "===================================="

NAMESPACE="crud-app"

echo "⚠️  Suppression de tous les resources dans le namespace $NAMESPACE..."

kubectl delete all --all -n $NAMESPACE
kubectl delete configmap --all -n $NAMESPACE
kubectl delete secret --all -n $NAMESPACE
kubectl delete pvc --all -n $NAMESPACE
kubectl delete namespace $NAMESPACE

echo "✅ Nettoyage terminé !"