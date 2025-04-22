const DishController = require('../controllers/dish-controller');

// const GetDishController = require('../controllers/dish-controller')
const dishRouter = require('express').Router()

dishRouter.get('/dishes/new', (req, res) => res.render('add-dish'))
dishRouter.get('/dishes/edit/:id', DishController.DishForPage)

dishRouter.get('/dishes/:id', DishController.getDishes)

dishRouter.post('/dishes', DishController.postDish)

dishRouter.put('/dishes/:id', DishController.putDish)


module.exports = dishRouter;