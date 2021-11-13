import Express from "express";
import { resolve, dirname } from "path";

export const imgApp = Express();

const __dirname = resolve(dirname(""));
imgApp.use(Express.static(__dirname + "/public"));
