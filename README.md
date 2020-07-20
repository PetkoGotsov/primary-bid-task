# Use TypeScript to Create CRUD API using NodeJS, MongoDB and front-end client.

## Before using

 - Please make sure that you have:
 - node.js installed (https://nodejs.org/)
 - have mongodb installed and running locally (https://www.mongodb.com/)
 - Using Windows, just open the terminal at where you installed mongo and run `mongod.exe`

## Usage

To run the project, please use a command line and the following:
 - cd to url-web-client root directory
 - npm run dev
    - It will install Node.js and the client-app dependencies,
      and will concurrently run the express back-end and react front-end.
    - It will run the server at port 3000, and the client-app at port 8080.
    - Access the vue client app at http://localhost:8080/
    - Use the front-end to send an url starting with http:// or https://. Once validated and created, 
      it will be added to the top of the list, or you will see the error message below the form.
    - Trimmed urls cannot be duplicated.
    - The back-end API can be accessed using localhost:8080/url/api/urls GET and POST requests. 
    - The front-end is a responsive SPA.


