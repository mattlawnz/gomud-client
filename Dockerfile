# Use an official Node runtime as a base image
FROM node:18-alpine as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# If you have specific directories for images and icons, copy them as well
COPY images ./images
COPY icons ./icons

# Build the React app
RUN npm run build

# Use Nginx to serve the React app
FROM nginx:alpine

# Copy the React build from the previous stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html 

# Copy the images and icons directory from the previous stage
COPY --from=build /usr/src/app/images /usr/share/nginx/html/images
COPY --from=build /usr/src/app/icons /usr/share/nginx/html/icons

# Remove the default Nginx configuration file
RUN rm -rf /etc/nginx/conf.d

# Replace with custom Nginx configuration file
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

