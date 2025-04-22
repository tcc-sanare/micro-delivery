const express = require('express');
const router = express.Router();
const { createReview, getReviews } = require('../controllers/reviewsController');

router.post('/', createReview);
router.get('/', getReviews);

module.exports = router;