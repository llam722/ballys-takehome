
const next = require('next');
const express = require('express');
const bodyParser = require('body-parser')

const hostname = 'localhost';
const dev = process.env.NODE_ENV !== "production";
const PORT = 3000;

const app = next({dev})
const handle = app.getRequestHandler();


app.prepare().then(() => {

  const server = express();
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  

  server.get('*', (req, res) => {
    return handle(req, res);
  });


  

  //global error handler
  server.use('*', (req, res) => {
    return res.status(404).send('The page you are looking for does not exist');
  });


  //global error message
  server.use((err, req, res, next) => {
  const defaultErr = {
    log: 'GLOBAL ERROR HANDLER: caught unknown middleware error',
    status: 404,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

  
  server.listen(PORT, hostname, (err) => {
    if (err) throw err;
    console.log(`> Listening on http://${hostname}:${PORT}...`);
  });


});
