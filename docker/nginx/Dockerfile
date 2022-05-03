# The first stage
# Build React static files
FROM node:14 as build

WORKDIR /app/frontend
COPY ./web-marketplace/package.json ./
COPY ./web-marketplace/package-lock.json ./
RUN npm ci --silent
COPY ./web-marketplace/ ./
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]