const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).send({ message: 'There is no thought with that ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.staus(404).json(err);
            });
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
}