const db = require('../config/db');

module.exports = class DishModel{
    static db = db

    static async GetDish(id){
        try {
            const dishes = await db("prato").select("*").where({id_restaurante: id})
            return dishes

        } catch (err) {
            console.error('Error fetching orders:', err);
            throw Error(err)
        }
    }

    static async PostDish (data) {
        try{
            const newDish = await db("prato").insert({
                ...data, 
                disponivel: data.disponivel === 'on',
                destaque: data.destaque === 'on'
            })
            return newDish
            
        } catch (err) {
            console.error(err)
            throw Error(err)
        }
    }

    static async PutDish (id, newPrice) {
        try{
            const { preco } = newPrice
            const dishForUp = await db("prato").where({id_prato: id}).update({
                preco
            })

            if (dishForUp) return dishForUp
            throw new Error('Dish not found')

        } catch (err) {
            console.error(err)
            throw Error(err)
        }
    }

    static async GetDishForPage(id){
        try{
            const dish = await db("prato").select("*").where({id_prato: id})
            if(dish) return dish
            throw new Error('Invalid id')
        } catch (err){
            console.error(err)
            throw Error(err)
        }
    }
}

