# ==================================
# STAGE 1: Dependencies
# ==================================
FROM node:18-alpine AS dependencies

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances de production uniquement
RUN npm ci --only=production

# ==================================
# STAGE 2: Build
# ==================================
FROM node:18-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (dev + prod)
RUN npm ci

# Copier le code source
COPY . .

# ==================================
# STAGE 3: Production
# ==================================
FROM node:18-alpine AS production

# Installer dumb-init pour gérer les signaux
RUN apk add --no-cache dumb-init

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copier les dépendances de production depuis le stage 1
COPY --from=dependencies --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copier le code source depuis le stage 2
COPY --chown=nodejs:nodejs . .

# Changer vers l'utilisateur non-root
USER nodejs

# Exposer le port
EXPOSE 5000

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Démarrer l'application avec dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]