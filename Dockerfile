# Use the official Node.js image to build the app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the app
RUN npm run build

# Use Node.js to serve the app
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the build folder from the previous stage
COPY --from=build /app/dist /app/build

# Install serve to serve the build
RUN npm install -g serve

# Expose the port that the app will run on
EXPOSE 4173

# Command to start the server
CMD ["serve", "-s", "build", "-l", "4173"]
