import { NextFunction, Request, Response } from "express";

const express = require('express');
const router = express.Router();


router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!');
});