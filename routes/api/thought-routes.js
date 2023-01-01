const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/test', (req,res) => res.send(`API express routes working for thoughts.`))


router.get('/', async (req, res) => {
    Thought.find({}, (err, result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ error: 'Something went wrong' });
        }
      });
});


router.get('/:id', async (req, res) => {

    Thought.findOne({ _id: req.params.id })
    .select('-__v')
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));

});


router.post('/', async (req, res) => {
  Thought.create(req.body)
  .then((dbUserData) => res.json(dbUserData))
  .catch((err) => res.status(500).json(err));
});

router.put('/:id', async (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: req.body
         },
        { runValidators: true, new: true },
      ).then(updatedThought => res.json(updatedThought)).catch(err =>res.status(500).json(err));

      
      // User.findOneAndUpdate(
      //   { username: req.body.username },
      //   { $push: { thoughts: req.params.id } },
      //   { runValidators: true, new: true },
      //   (err, result) => {
      //     if (result) {
      //       res.status(200).json(result);
      //       console.log(`Updated: ${result}`);
      //     } else {
      //       console.log('Uh Oh, something went wrong');
      //       res.status(500).json({ error: 'Something went wrong' });
      //     }
      //   }
      // );
});

router.delete('/:id', async (req, res) => {

    Thought.findOneAndDelete(
        { _id: req.params.id },
        (err, result) => {
          if (result) {
            res.status(200).json(result);
            console.log(`Deleted: ${result}`);
          } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ error: 'Something went wrong' });
          }
        }
      );

});

module.exports = router;