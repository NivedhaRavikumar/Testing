# Use an official Node.js image
FROM node:14-alpine
# Create and set the working directory in the container
WORKDIR /usr/src/app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install app dependencies
RUN npm install
RUN npm install express
# Copy server and HTML files to the container
COPY server.js .
COPY index.html .
# Expose the port the app runs on
EXPOSE 3000
# Command to run the application
CMD ["node", "server.js"]
