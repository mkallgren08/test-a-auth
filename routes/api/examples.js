const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

// Matches with "/api/books"
router.route("/")
  .get(exampleController.findAll)
  .post(exampleController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(exampleController.findById)
  .put(exampleController.update)
  .delete(exampleController.remove);

module.exports = router;
