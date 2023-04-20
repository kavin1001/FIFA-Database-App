const { Router } = require("express");
const { usersRouter } = require("./user.routes");
const { dbRouter } = require("./db.routes");

const { matchRouter } = require("./matches.routes")
const { playerRouter } = require("./player.routes");

const router = Router();

router.use('/user', usersRouter);
router.use('/sql', dbRouter);
router.use('/matches', matchRouter)
router.use('/player', playerRouter);

module.exports = router;
