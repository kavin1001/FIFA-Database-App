const { Router } = require("express");
const { usersRouter } = require("./user.routes");
const { dbRouter } = require("./db.routes");
const { playerRouter } = require("./player.routes");
const { teamRouter } = require("./team.routes");

const router = Router();

router.use('/user', usersRouter);
router.use('/sql', dbRouter);
router.use('/player', playerRouter);
router.use('/team', teamRouter);

module.exports = router;
