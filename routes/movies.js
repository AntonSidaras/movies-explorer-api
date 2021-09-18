import express from 'express';
import { createMovieSchema, deleteMovieSchema } from '../schemas/movies.js';
import { createMovie, deleteMovie } from '../controllers/movies.js';
import { common } from '../utils/constants.js';

const movieRouter = express.Router();

movieRouter.post(common.pathRoot, createMovieSchema, createMovie);
movieRouter.delete(common.pathMovieId, deleteMovieSchema, deleteMovie);

export default movieRouter;
