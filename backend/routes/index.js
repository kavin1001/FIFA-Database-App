const { Router } = require("express");
const { usersRouter } = require("./user.routes");
const { postsRouter } = require("./posts.routes");
const { feedRouter } = require("./feed.routes");
const { friendsRouter } = require("./friends.routes");
const { chatRouter } = require("./chat.routes");

const router = Router();

router.use('/user', usersRouter);
router.use('/posts', postsRouter);
router.use('/feed', feedRouter);
router.use('/friends', friendsRouter);
router.use('/chat', chatRouter);

module.exports = router;