const express = require('express');
const router = express.Router();
const noteController = require('../app/api/controllers/noteController');

router.route('/notes')
    .get(noteController.index)
    .post(noteController.create);

router.route('/notes/:noteId')
    .get(noteController.show)
    .patch(noteController.update)
    .put(noteController.update)
    .delete(noteController.destroy);

module.exports = router;