const router = require('express').Router();
const {getUser, getSingleUser, createUser, addFriend, removeFriend } = require('../../controllers/userController');
const {User} = require('../../models');

router.route('/').get(getUser).post(createUser)
router.route('/:userId').get(getSingleUser)
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)
// router.get('/test', (reg, res) => res.send(`API express routes working for user.`))


router.put('/:id', async (req, res) => {

  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set:req.body },
    { runValidators: true, new: true },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Updated: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
  );
});

router.delete('/:id', async (req, res) => {
  User.findOneAndDelete(
    { _id: req.params.id },
    (err, result) => {
      if (result) {
        res.status(200).json({ message: `${result.username} deleted!`});
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
  );
});

module.exports = router;