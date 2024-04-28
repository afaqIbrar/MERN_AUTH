const express  = require('express');
const router = express.Router();
const {getGoals,updateGoal,setGoal,deleteGoal} = require('../controller/goalController')
const {protect} = require('../middleware/authMiddleware');


// Shorter Code for the same type of routes /
// router.get('/', getGoals);
// router.post('/', setGoal);
router.route('/').get(protect,getGoals).post(protect,setGoal);


// Shorter Code for the same type of routes /:id
// router.put('/:id', updateGoal);
// router.delete ('/:id', deleteGoal);
router.route('/:id').delete(protect,deleteGoal).put(protect,updateGoal);
module.exports = router;