# Stage 1: Build the application
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2: Create the final image
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

COPY --from=builder /app .

# Install Chrome
RUN npx playwright install chrome

# Set the entry point for the container
CMD ["npm", "run", "test"]
