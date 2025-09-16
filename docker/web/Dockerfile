FROM node:22.5-alpine

# Install required system packages
RUN apk add --no-cache bash git python3 make g++

# Install PM2 globally
RUN npm install --global pm2

# Create non-root user
RUN addgroup -g 1001 appuser && \
    adduser -u 1001 -G appuser -D appuser

WORKDIR /usr/src/web

# Copy package files first (better layer caching)
COPY ./src/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY ./src .

# Build the app
RUN npm run build

USER appuser

EXPOSE 3000

# Run production build with PM2
CMD ["pm2-runtime", "npm", "--name", "web", "--", "dev"]
