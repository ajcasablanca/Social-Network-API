const { User, Thought } = require('../models');

module.exports = {
    async getUser(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.userId)
                .populate('thoughts')
                .populate('friends');
            if (!user) {
                return res.status(404).json({ message: "User does not exist" });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                req.body,
                { runValidators: true, new: true }
            );
            if (!user) {
                res.status(404).json({ message: "User does not exist" });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                res.status(404).json({ message: "User does not exist" });
            }
            await Thought.deleteMany({ username: user.username });
            res.json({ message: 'User has been deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                res.status(404).json({ message: "User does not exist" });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.body.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                res.status(404).json({ message: "User does not exist" });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
