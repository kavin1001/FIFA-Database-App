const { Router } = require("express");
const { usersRouter } = require("./user.routes");
const { dbRouter } = require("./db.routes");

const router = Router();

router.use('/user', usersRouter);
router.use('/sql', dbRouter);

module.exports = router;
