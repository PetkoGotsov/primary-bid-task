FROM node:12

# Create app directory
WORKDIR /url-web-client

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# RUN npm run dev

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "dist/index.js" ]