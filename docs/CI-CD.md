# 📚 Guide CI/CD

## Pipeline Overview

Notre pipeline CI/CD est composé de 5 étapes principales :

1. **Test Backend** - Vérifie le code backend
2. **Test Frontend** - Build et vérifie le frontend
3. **Build Backend** - Crée l'image Docker backend
4. **Build Frontend** - Crée l'image Docker frontend
5. **Deploy** - Déploie sur Kubernetes

## Déclencheurs

- ✅ Push sur `main` → Pipeline complet
- ✅ Push sur `develop` → Tests + Build
- ✅ Pull Request → Tests uniquement
- ✅ Manuel → Via GitHub Actions UI

## Secrets Requis

- `DOCKER_USERNAME` - Username Docker Hub
- `DOCKER_PASSWORD` - Password Docker Hub

## Versioning

- `latest` - Dernière version stable
- `develop` - Version de développement
- `SHA commit` - Version spécifique

## Rollback

Pour revenir à une version antérieure :
```bash
kubectl set image deployment/backend-deployment \
  backend=USERNAME/crud-backend:VERSION -n crud-app
```

## Monitoring

- Logs: `kubectl logs -n crud-app -l app=backend`
- Status: `kubectl get all -n crud-app`
- Events: `kubectl get events -n crud-app`
```

---

## ✅ CHECKLIST PHASE 5

Vérifie que tout fonctionne :

- [ ] Repository GitHub créé
- [ ] Secrets GitHub configurés
- [ ] Workflow CI/CD créé
- [ ] README avec badges
- [ ] Premier commit/push effectué
- [ ] Pipeline s'exécute sans erreur
- [ ] Images poussées sur Docker Hub automatiquement
- [ ] Déploiement Kubernetes réussi
- [ ] Application accessible après le déploiement
- [ ] Badges de statut fonctionnent

---

## 📁 ARBORESCENCE FINALE COMPLÈTE
```
crud-devops-project/
├── .github/
│   └── workflows/
│       ├── ci-cd-pipeline.yml
│       ├── tests.yml
│       └── rollback.yml
├── backend/
│   ├── src/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── ...
├── k8s/
│   ├── base/
│   │   ├── namespace.yaml
│   │   ├── postgres-*.yaml
│   │   ├── backend-*.yaml
│   │   └── frontend-*.yaml
│   ├── deploy.sh
│   └── cleanup.sh
├── docs/
│   └── CI-CD.md
├── .gitignore
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md