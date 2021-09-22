import Movie from '../models/movie.js';
import BadRequest from '../utils/bad-request-error.js';
import NotFound from '../utils/not-found-error.js';
import Forbidden from '../utils/forbidden-error.js';
import { errorNameConstants } from '../utils/constants.js';

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      Movie.findById(movie)
        .populate('owner')
        .then((m) => {
          res.status(200).send(m);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === errorNameConstants.validationErrorName) {
        throw new BadRequest(err.message);
      }
      throw err;
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    .orFail(() => {
      next(new NotFound(`${errorNameConstants.movieNotFoundErrorName} ${movieId}`));
    })
    .then((movie) => {
      if (movie.owner.toString() !== userId.toString()) {
        next(new Forbidden(errorNameConstants.movieDeleteErrorName));
        return;
      }
      Movie.deleteOne(movie)
        .then((m) => {
          res.status(200).send(m);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === errorNameConstants.castErrorName) {
        throw new BadRequest(err.message);
      }
      throw err;
    })
    .catch(next);
};

export {
  getMovies,
  createMovie,
  deleteMovie,
};
