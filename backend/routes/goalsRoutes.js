const express  = require('express');
const router = express.Router();
const {getGoals,updateGoal,setGoal,deleteGoal} = require('../controller/goalController')



// Shorter Code for the same type of routes /
// router.get('/', getGoals);
// router.post('/', setGoal);
router.route('/').get(getGoals).post(setGoal);


// Shorter Code for the same type of routes /:id
// router.put('/:id', updateGoal);
// router.delete ('/:id', deleteGoal);
router.route('/:id').delete(deleteGoal).put(updateGoal);
module.exports = router;