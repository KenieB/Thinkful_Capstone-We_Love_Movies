const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

const reduceReview = reduceProperties("review_id", {
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
});

function readReviewDetail(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.preferred_name", "c.surname", "c.organization_name")
    .where({ "r.review_id": reviewId })
    .then(reduceReview)
    .then((data) => {
      data.forEach((review) => {
        const singleCritic = review.critic[0];
        review.critic = singleCritic;
        return review;
      });
      return data;
    })
    .then((detailUpdatedRecord) => detailUpdatedRecord[0]);
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  read,
  readReviewDetail,
  update,
  delete: destroy,
};
