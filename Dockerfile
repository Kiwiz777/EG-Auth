# Stage 1: Base Builder
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .


# Declare build-time arguments
ARG COOKIE_NAME
ARG BACKEND_PORT
ARG JWT_SECRET
ARG DB_NAME
ARG MONGODB_CONN_STRING
ARG JWT_EXP_TIME
ARG CORS_ORIGIN
ARG VITE_API_URL

# Expose them as environment variables for build scripts to access
ENV COOKIE_NAME=$COOKIE_NAME
ENV BACKEND_PORT=$BACKEND_PORT
ENV JWT_SECRET=$JWT_SECRET
ENV DB_NAME=$DB_NAME
ENV MONGODB_CONN_STRING=$MONGODB_CONN_STRING
ENV JWT_EXP_TIME=$JWT_EXP_TIME
ENV CORS_ORIGIN=$CORS_ORIGIN
ENV VITE_API_URL=$VITE_API_URL


RUN npm ci

# Build frontend
RUN npm run build --workspace=client

# Build backend
RUN npm run build --workspace=server
# Stage 2: Runtime Image
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/client/dist ./public
COPY --from=builder /app/apps/server/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose backend port
EXPOSE 3000
CMD ["node", "dist/main"]