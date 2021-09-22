import express from 'express';
import { createMovieSchema, deleteMovieSchema } from '../schemas/movies.js';
import { getMovies, createMovie, deleteMovie } from '../controllers/movies.js';
import { common } from '../utils/constants.js';

const movieRouter = express.Router();

movieRouter.get(`${common.basePathMovies}${common.pathRoot}`, getMovies);
movieRouter.post(`${common.basePathMovies}${common.pathRoot}`, createMovieSchema, createMovie);
movieRouter.delete(`${common.basePathMovies}${common.pathMovieId}`, deleteMovieSchema, deleteMovie);

export default movieRouter;
