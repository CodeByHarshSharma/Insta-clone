const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')

async function followUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if (followeeUsername === followerUsername) {
        return res.status(400).json({
            message: "Invalid Follow Request"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: `${followeeUsername} not found!`
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })

    if (isAlreadyFollowing) {
        if (isAlreadyFollowing.status === "pending") {
            return res.status(200).json({
                message: `Follow request already sent!`
            })
        }

        if (isAlreadyFollowing.status === "accepted") {
            return res.status(200).json({
                message: `You are already following ${followeeUsername}`
            })
        }
    }


    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: 'pending'
    })


    res.status(200).json({
        message: `Follow request sent to ${followeeUsername}`,
        followRecord
    })
}

async function getPendingRequestController(req, res) {
    const followeeUsername = req.user.username

    const pendingRequests = await followModel.find({
        status: 'pending'
    })

    res.status(200).json({
        message: "Pending requests fetched!",
        requests: pendingRequests
    })

}

async function acceptFollowRequestController(req, res) {

    const followeeUsername = req.user.username
    const followerUsername = req.params.username

    const followRequest = await followModel.findOneAndUpdate({
        followee: followeeUsername,
        follower: followerUsername,
        status: "pending"
    },
    {
        status: "accepted"
    },
    {
        returnDocument: 'after'
    })

    if (!followRequest) {
        return res.status(404).json({
            message: "Follow Request Not Found!"
        })
    }

    res.status(200).json({
        message: `${followeeUsername} has accepted you request`
    })
}

async function rejectFollowRequestController(req, res) {

    const followeeUsername = req.user.username
    const followerUsername = req.params.username

    const followRequest = await followModel.findOneAndDelete({
        followee: followeeUsername,
        follower: followerUsername,
        status: "pending"
    })

    if (!followRequest) {
        return res.status(404).json({
            message: "No Follow request found!"
        })
    }

    res.status(200).json({
        message: "Follow Request rejected!"
    })
}

async function unFollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        followee: followeeUsername,
        follower: followerUsername
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}


module.exports = {
    followUserController,
    unFollowUserController,
    getPendingRequestController,
    acceptFollowRequestController,
    rejectFollowRequestController
}