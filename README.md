# 🚀 CRUD DevOps - Projet CI/CD Complet

![CI/CD Status](https://github.com/TON_USERNAME/crud-devops-project/workflows/CI-CD-Pipeline/badge.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-brightgreen)
![CI/CD Status](https://github.com/TON_USERNAME/crud-devops-project/workflows/CI-CD-Pipeline/badge.svg)
![Tests](https://github.com/TON_USERNAME/crud-devops-project/workflows/Tests/badge.svg)
![Docker Backend](https://img.shields.io/docker/v/TON_USERNAME/crud-backend?label=backend)
![Docker Frontend](https://img.shields.io/docker/v/TON_USERNAME/crud-frontend?label=frontend)

Projet complet d'apprentissage DevOps avec CI/CD, containerisation Docker, et orchestration Kubernetes.

## 📚 Stack Technique

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **ORM**: Sequelize
- **Base de données**: PostgreSQL 15

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **UI**: CSS3 (Responsive)

### DevOps
- **Containerisation**: Docker + Docker Compose
- **Orchestration**: Kubernetes (Minikube)
- **CI/CD**: GitHub Actions
- **Registry**: Docker Hub

## 🏗️ Architecture
```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│   Frontend  │─────▶│   Backend   │─────▶│  PostgreSQL  │
│   (React)   │      │  (Node.js)  │      │              │
└─────────────┘      └─────────────┘      └──────────────┘
      │                     │                      │
      └─────────────────────┴──────────────────────┘
                    Kubernetes Cluster
```

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- Docker & Docker Compose
- Kubernetes (Minikube)
- kubectl

### 1. Clone le projet
```bash
git clone https://github.com/TON_USERNAME/crud-devops-project.git
cd crud-devops-project
```

### 2. Lancement local (sans Docker)

**Backend:**
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 3. Lancement avec Docker Compose
```bash
docker-compose up -d
```

### 4. Déploiement sur Kubernetes
```bash
# Démarrer Minikube
minikube start

# Déployer l'application
./k8s/deploy.sh

# Accéder à l'application
minikube service frontend-service -n crud-app
```

## 📦 Structure du Projet
```
crud-devops-project/
├── backend/              # API Node.js + Express
├── frontend/             # Application React
├── k8s/                  # Manifests Kubernetes
│   └── base/
├── .github/              # GitHub Actions workflows
│   └── workflows/
├── docker-compose.yml    # Orchestration Docker locale
└── README.md
```

## 🔄 Pipeline CI/CD

Le pipeline GitHub Actions s'exécute automatiquement à chaque push sur `main` :

1. ✅ **Lint & Test** - Vérification du code
2. 🐳 **Build Docker Images** - Construction des images
3. 📤 **Push to Docker Hub** - Publication des images
4. ☸️ **Deploy to Kubernetes** - Déploiement automatique

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 👤 Auteur

**Ton Nom**
- GitHub: [@michael24-raf](https://github.com/michael24-raf)

## 📄 Licence

MIT