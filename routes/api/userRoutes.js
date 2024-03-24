const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require("../../controllers/userController");

router
    .route('/')
    .get(getUser)
    .post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route(':userId/friends/:friendId')
    .get(addFriend)
    .delete(removeFriend)
    
    
    module.exports = router;