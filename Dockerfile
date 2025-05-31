# Stage 1: Build the Angular app
FROM node:20-alpine AS builder

# Create and set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --force

# Copy the rest of the app source
COPY . .

# Stage 2: Run the SSR app
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy built app and node_modules from builder
COPY --from=builder /app /app

# Expose Angular (4200) and Genkit Admin UI (4000)
EXPOSE 4200
EXPOSE 4000

# Start the SSR app with Genkit
CMD ["/bin/sh", "-c", "echo | npm run start"]

