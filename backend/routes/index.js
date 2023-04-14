const { Router } = require("express");
const { usersRouter } = require("./user.routes");
const { dbRouter } = require("./db.routes");

const { matchRouter } = require("./matches")
const { playerRouter } = require("./player.routes");
const { teamRouter } = require("./team.routes");


const router = Router();

router.use('/user', usersRouter);
router.use('/sql', dbRouter);
router.use('/matches', matchRouter)
router.use('/player', playerRouter);
router.use('/team', teamRouter);

module.exports = router;
