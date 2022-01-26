# WeLoveMovies API
> ### Back-end RESTful API for mock database storing movies, theaters, critics, and reviews.
>
> #### &nbsp;&nbsp;&nbsp;`Task:`&nbsp;&nbsp; *Set up a database and build out specific routes for database access and manipulation.*
> ---
> ### &nbsp;&nbsp;&nbsp;[\[ Deployed API \]](https://we-love-movies-prod.herokuapp.com/)
> 
> ### &nbsp;&nbsp;&nbsp; Built with:
> #### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Express &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PostgreSQL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Knex &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; JavaScript <br>&nbsp;

---
 
## API Routes
> | Method | Path | API Behavior |
> |:------:|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | GET    | `/movies`                   | Return all data for movies in database. |
> | GET    | `/movies?is_showing=true`   | Return all data for movies in database that are currently showing. |
> | GET    | `/movies/:movieId`          | *If database contains a movie with id = movieId,* <br>&nbsp;&nbsp;&nbsp;&nbsp; return all data for that movie. <br> *If database does not contain a movie with id = movieId,* <br>&nbsp;&nbsp;&nbsp;&nbsp; return commensurate error. |
> | GET    | `/movies/:movieId/theaters` | *If database contains a movie with id = movieId,* <br>&nbsp;&nbsp;&nbsp;&nbsp; return data for all theaters where that movie is showing. <br> *If database does not contain a movie with id = movieId,* <br>&nbsp;&nbsp;&nbsp;&nbsp; return commensurate error. |
> | GET    | `/movies/:movieId/reviews`  | *If database contains a movie with id = movieId,* <br>&nbsp;&nbsp;&nbsp;&nbsp; return data for all reviews for that movie, including all data for associated review critic. <br> *If database does not contain a movie with id = movieId,* <br>&nbsp;&nbsp;&nbsp;&nbsp; return commensurate error. |
> | GET    | `/theaters`                 | Return all data for theaters in database,  <br>&nbsp;&nbsp; including data for all movies currently showing at each theater. |
> | PUT    | `/reviews/:reviewId`        | *If database contains a review with id = reviewId,* <br>&nbsp;&nbsp;&nbsp;&nbsp; **(AND)** <br>&nbsp;&nbsp; *request body is object with keys-typeOf(values) = { 'score': integer, 'content': string },* <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; update that review with requested values and return all data for that review, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; including data for associated review critic and requested updates. <br> *If database does not contain a review with id = reviewId,* <br>&nbsp;&nbsp;&nbsp;&nbsp; **(OR)** <br>&nbsp;&nbsp;  *request body is not object with correct keys-typeOf(values),* <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return commensurate error. |
> | DELETE | `/reviews/:reviewId`        | *If database contains a review with id = reviewId,*  <br>&nbsp;&nbsp;&nbsp;&nbsp; delete that review from data base and return **204** response. <br> *If database does not contain a review with id = reviewId,* <br>&nbsp;&nbsp;&nbsp;&nbsp; return commensurate error. |
