import Error from "next/error";
import { Response, Request } from "express";
const next = require('next');
const express = require('express');

const hostname = 'localhost';
const PORT = 3000;

const app = next({hostname, PORT})
const handle = app.getRequestHandler();


app.prepare().then(() => {

  const server = express();


  server.get('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  //global error handler
  server.use('*', (req: Request, res: Response) => {
    return res.status(404).send('The page you are looking for does not exist');
  });


  //global error message
  server.use((err: Error, req: Request, res: Response, next: Request) => {
  const defaultErr = {
    log: 'GLOBAL ERROR HANDLER: caught unknown middleware error',
    status: 404,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

  
  server.listen(PORT, hostname, (err: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${PORT}`);
  });


});
