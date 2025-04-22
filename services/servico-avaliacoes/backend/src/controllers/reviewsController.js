const pool = require('../config/database');

const createReview = async (req, res) => {
  const { order_id, restaurant_id, user_id, rating, comment } = req.body;
  
  try {
    const [result] = await pool.execute(
      `INSERT INTO reviews (order_id, restaurant_id, user_id, rating, comment) 
       VALUES (?, ?, ?, ?, ?)`,
      [order_id, restaurant_id, user_id, rating, comment]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
};

const getReviews = async (req, res) => {
  const { restaurant_id } = req.query;
  try {
    const query = restaurant_id 
      ? 'SELECT * FROM reviews WHERE restaurant_id = ?' 
      : 'SELECT * FROM reviews';
    const [reviews] = await pool.execute(query, restaurant_id ? [restaurant_id] : []);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
};

module.exports = { createReview, getReviews };