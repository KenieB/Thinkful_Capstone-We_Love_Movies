const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movieId = req.params.movieId;
  const movie = await moviesService.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

function checkQueryShowing(req, res, next) {
  if (req.query.is_showing) {
    res.locals.queryIsShowing = req.query.is_showing;
    return next();
  } else {
    return next();
  }
}

function validateQueryShowingValue(req, res, next) {
  if (res.locals.queryIsShowing === "true") {
    return next();
  } else if (!res.locals.queryIsShowing) {
    return next();
  } else {
    return next({
      status: 404,
      message: `Invalid request query: ?is_showing=${res.locals.queryIsShowing}`,
    });
  }
}

async function list(req, res, next) {
  const data = !res.locals.queryIsShowing
    ? await moviesService.list()
    : await moviesService.listShowing();

  res.json({ data });
}

function read(req, res, next) {
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function readTheaterList(req, res, next) {
  const movieId = req.params.movieId;
  const data = await moviesService.readTheaterList(movieId);
  res.json({ data });
}

async function readMovieReviews(req, res, next) {
  const movieId = req.params.movieId;
  const data = await moviesService.readMovieReviews(movieId);
  res.json({ data });
}

module.exports = {
  list: [
    checkQueryShowing,
    validateQueryShowingValue,
    asyncErrorBoundary(list),
  ],
  read: [asyncErrorBoundary(movieExists), read],
  readTheaterList: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheaterList),
  ],
  readMovieReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readMovieReviews),
  ],
};
