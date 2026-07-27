const followModel = require('../models/follow.model')

async function followUserController(req, res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username 

    if(followeeUsername === followerUsername){
        return res.status(400).json({
            message: "Invalid Follow Request"
        })
    }

    const isFolloweeExists = await followModel.findOne({
        followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(404).json({
            message: `${followeeUsername} not found!`
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message: `You are already following ${followeeUsername}`
        })
    }


    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })


    res.status(200).json({
        message: `You are now following ${followeeUsername}`,
        followRecord
    })
}

async function unFollowUserController(req, res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        followee: followeeUsername,
        follower: followerUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete( isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}


module.exports = { followUserController, unFollowUserController }