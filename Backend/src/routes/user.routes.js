const express = require('express')
const userController = require('../controllers/user.controller')
const identifyUser = require('../middleware/auth.middleware')

const userRouter = express.Router()

userRouter.post("/follow/:username", identifyUser, userController.followUserController)

userRouter.get("/follow/requests", identifyUser, userController.getPendingRequestController)

userRouter.post("/follow/accept/:username", identifyUser, userController.acceptFollowRequestController)

userRouter.post("/follow/reject/:username", identifyUser, userController.rejectFollowRequestController)

userRouter.get("/following/", identifyUser, userController.getFollowingController)

userRouter.get("/followers", identifyUser, userController.getFollowersController)

userRouter.post("/unfollow/:username", identifyUser, userController.unFollowUserController)

userRouter.get("/getUsers", identifyUser, userController.getAllUsersController)

module.exports = userRouter;