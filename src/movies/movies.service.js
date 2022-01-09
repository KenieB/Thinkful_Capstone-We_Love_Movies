const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

function list() {
  return knex("movies")
    .select(
      "movie_id as id",
      "title",
      "runtime_in_minutes",
      "rating",
      "description",
      "image_url"
    )
    .orderBy("id");
}

function listShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select(
      "m.movie_id as id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url"
    )
    .where({ "mt.is_showing": true })
    .groupBy("id")
    .orderBy("id");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function readTheaterList(movieId) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.movie_id": movieId });
}

const reduceReviews = reduceProperties("review_id", {
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
});

function readMovieReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.preferred_name", "c.surname", "c.organization_name")
    .where({ "r.movie_id": movieId })
    .then(reduceReviews)
    .then((data) => {
      data.forEach((review) => {
        const singleCritic = review.critic[0];
        review.critic = singleCritic;
        return review;
      });
      return data;
    });
}

module.exports = {
  list,
  listShowing,
  read,
  readTheaterList,
  readMovieReviews,
};
