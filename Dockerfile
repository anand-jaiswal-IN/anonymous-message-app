# Stage 1: Build Stage
FROM node:22.14.0 AS builder

# Set the working directory
WORKDIR /app

# Install Bun as the package manager
RUN npm install -g bun

# Copy package.json and bun.lockb (if exists) to the working directory
COPY package.json bun.lockb* ./

# Accept build-time environment variablesARG NEXT_PUBLIC_APP_NAME
ARG NEXT_PUBLIC_APP_EMAIL
ARG NEXTAUTH_SECRET
ARG MONGODB_URI
ARG CLIENT_USER
ARG CLIENT_ID
ARG CLIENT_SECRET
ARG REDIRECT_URI
ARG REFRESH_TOKEN

# Set environment variables for the build process
ENV NEXT_PUBLIC_APP_NAME = ${NEXT_PUBLIC_APP_NAME}
ENV NEXT_PUBLIC_APP_EMAIL= ${NEXT_PUBLIC_APP_EMAIL}
ENV NEXTAUTH_SECRET = ${NEXTAUTH_SECRET}
ENV MONGODB_URI = ${MONGODB_URI}
ENV CLIENT_USER = ${CLIENT_USER}
ENV CLIENT_ID = ${CLIENT_ID}
ENV CLIENT_SECRET = ${CLIENT_SECRET}
ENV REDIRECT_URI = ${REDIRECT_URI}
ENV REFRESH_TOKEN = ${REFRESH_TOKEN}

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN bun run build

# Stage 2: Runtime Stage
FROM node:22.14.0-alpine

# Set the working directory
WORKDIR /app

# Install Bun as the package manager
RUN npm install -g bun

# Copy only the necessary files from the build stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock
COPY --from=builder /app/node_modules ./node_modules

# Expose the port that the application will run on
EXPOSE 3000

# Start the Next.js application
CMD ["bun", "start"]