const { Router } = require("express");
const { usersRouter } = require("./user.routes");
const { dbRouter } = require("./db.routes");
const { matchRouter } = require("./matches")

const router = Router();

router.use('/user', usersRouter);
router.use('/sql', dbRouter);
router.use('/matches', matchRouter)

module.exports = router;
