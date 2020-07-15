import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import unsafestore from './routes/unsafestore';
import unsafeproducers from './routes/unsafeproducers';
import store from './routes/store';
import authstore from './routes/authstore';
import users from './routes/users';
import auth from './routes/auth';

dotenv.config({
  path: path.join(__dirname, '.env'),
});
const app = express();

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Credentials', 'true');
  res.append(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.append(
    'Access-Control-Allow-Headers',
    'authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  next();
});

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

// routes
app.use('/api/unsafestore', unsafestore);
app.use('/api/unsafeproducers', unsafeproducers);
app.use('/api/store', store);
app.use('/api/authstore', authstore);
app.use('/api/users', users);
app.use('/api/auth', auth);

mongodb.MongoClient.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?ssl=true&replicaSet=Bgshop-shard-0&authSource=admin&retryWrites=true&w=majority`,
  (err, db) => {
    if (err) {
      console.log(err);
    }
    app.set('db', db);

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, './index.html'));
    });

    app.listen(2370, () => console.log('Running on localhost:2370'));
  }
);
