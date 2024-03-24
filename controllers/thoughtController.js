const { User, Thought } = require('../models');

module.exports = {
    async getThough(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId)
                .populate('username')
                .populate('reaction');
            if (!thought) {
                return res.status(404).json({ message: "Thought does not exist" });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: "Thought does not exist" });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id);

            if (!thought) {
                return res.status(404).json({ message: "Thought does not exist" });
            }

            await User.updateMany(
                { thoughts: req.params.id },
                { $pull: { thoughts: req.params.id } }
            );

            res.json({ message: 'Thought has been deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },


    async createReaction(req, res) {
        try {
            const { reactionBody, username } = req.body;

            // Find the thought by its ID and push the new reaction into the reactions array
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: { reactionBody, username } } },
                { runValidators: true, new: true }
            );

            // Check if the thought exists
            if (!thought) {
                return res.status(404).json({ message: "Thought does not exist" });
            }

            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const { reactionId } = req.params;

            // Find the thought by its ID and pull the reaction from the reactions array
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { _id: reactionId } } },
                { new: true }
            );

            // Check if the thought exists
            if (!thought) {
                return res.status(404).json({ message: "Thought does not exist" });
            }

            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

}
