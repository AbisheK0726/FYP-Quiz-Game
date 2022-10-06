const express = require('express');
const router = express.Router();
const { getRooms, getRoom, addScore, updateRoom } = require('../controllers/RoomController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getRooms);
router.put('/addscore/:id', protect, addScore);
router.route('/:id').get(protect, getRoom).put(protect, updateRoom);

module.exports = router;
