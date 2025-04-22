const DishModel = require('../models/dish-model')

module.exports = class DishController {
    static async getDishes(req, res){
        try {
            const dishes = await DishModel.GetDish(req.params.id)
            res.status(200).render('dishes', {pratos : dishes})

        } catch (err) {
            console.error(err)
            res.status(500).json({error: 'Internal server error'})
        }
    }

    static async postDish(req, res){
        console.log(req)
        try{
            const dish = await DishModel.PostDish(req.body)
            res.status(200).json(dish)
        }  catch (err) {
            console.error(err)
            res.status(500).json({error: 'Internal server error'})
        }
    }

    static async putDish(req, res){
        try{
            const dishUpdated = await DishModel.PutDish(req.params.id, req.body)
            res.status(200).json(dishUpdated)
        } catch (err) {
            console.error(err)
            res.status(500).json({error: 'Internal server error'})
        }
    }


    static async DishForPage(req, res){
        try{
            const dish = await DishModel.GetDishForPage(req.params.id)
            console.log(dish)
            res.status(200).render('edit-price',{ prato: dish[0]})

        } catch {
            console.error(err)
            res.status(500).json({error: 'Internal server error'})
        }
    }
}




