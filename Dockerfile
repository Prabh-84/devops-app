# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all remaining files
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
