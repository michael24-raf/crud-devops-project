## 🔒 Security

This project implements comprehensive security scanning:

- **Dependency Scanning**: Automated vulnerability checks for npm packages
- **Container Scanning**: Docker image vulnerability analysis with Trivy
- **Code Analysis**: Static code analysis with CodeQL
- **Secret Detection**: Prevents accidental secret commits
- **Configuration Linting**: Validates Kubernetes and Docker configs

### Security Scan Status

![Security Scan](https://github.com/michael24-raf/crud-devops-project/workflows/Security-Scan/badge.svg)

### Running Security Scans Locally
```bash
# Audit dependencies
npm audit

# Scan Docker images
docker run --rm aquasec/trivy:latest image your-image:tag
```

# 🚀 CRUD DevOps - Projet CI/CD Complet

![CI/CD Status](https://github.com/michael24-raf/crud-devops-project/workflows/CI-CD-Pipeline/badge.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/michael24-raf/crud-devops-project)
![Docker Backend](https://img.shields.io/docker/v/michael24-raf/crud-backend?label=backend)
![Docker Frontend](https://img.shields.io/docker/v/michael24-raf/crud-frontend?label=frontend)
![GitHub repo size](https://img.shields.io/github/repo-size/michael24-raf/crud-devops-project)
![License](https://img.shields.io/github/license/michael24-raf/crud-devops-project)


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
