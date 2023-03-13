const {
  getUsers,
  setUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/userControllers");

const { body } = require("express-validator");

const router = require("express").Router();
router
  .route("/")
  .get(getUsers)
  .post(
    body("name", "Please include your name").notEmpty(),
    body("email", "Please include a valid email").isEmail(),
    setUsers
  );
router.route("/:id").put(updateUsers).delete(deleteUsers);

module.exports = router;
