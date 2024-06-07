# FROM node:21-alpine

# WORKDIR /app

# COPY package*.json .

# RUN npm install yarn

# RUN yarn install

# COPY . .

# EXPOSE 3000

# CMD ["npm ", "start"]



# Use an official Node.js runtime as the base image
FROM node:21-alpine as react-build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Bundle app source
COPY . .

# Install dependencies
RUN yarn install
RUN yarn build

# Stage 2: Serve the React App using Nginx
FROM nginx:alpine
COPY --from=react-build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
