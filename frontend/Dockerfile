# ==================================
# STAGE 1: Build
# ==================================
FROM node:18-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Argument pour l'URL de l'API (peut être overridé au build)
ARG VITE_API_URL=http://localhost:5000/api
ENV VITE_API_URL=$VITE_API_URL

# Build de production
RUN npm run build

# ==================================
# STAGE 2: Production avec Nginx
# ==================================
FROM nginx:1.25-alpine AS production

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés depuis le stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Nginx démarre automatiquement avec CMD de l'image de base