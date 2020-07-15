import cors from 'cors';
import express from 'express';
import * as dotenv from "dotenv";
import mongoose from 'mongoose';
import helmet from "helmet";
// import * as urlCRUD from './url-crud';
import * as urlCRUD from './url-crud-mongo';

dotenv.config();

if (!process.env.PORT) {
  console.log(`Error to get ports`);
    process.exit(1);
 }
 
const uri: string = "mongodb://127.0.0.1:27017";

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Connecting to MONGO`);
  }
});

 const PORT: number = parseInt(process.env.PORT as string, 10);
 
 const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const authorisedRoute = express.Router();
app.use("/url/api", authorisedRoute);

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', "true");
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

  next();
});


// Send message for default URL
authorisedRoute.get('/', (req, res) => res.send('Welcome to default response of Url API'));

authorisedRoute.get('/urls', urlCRUD.getUrlList);
authorisedRoute.post('/urls',urlCRUD.createUrl);
authorisedRoute.post('/updateurl',urlCRUD.updateUrl);
authorisedRoute.post('/deleteurl', urlCRUD.deleteUrl);

module.exports = server