
const pipelineController = require('../controllers/pipelineController');
const express = require('express');
const router = express.Router();


router.get('/', pipelineController.getPipelineNames, pipelineController.activePipelineCheck, pipelineController.streamRecordCheck, (req, res) => {
  res.json(res.locals.pipelineStatsArray);
});

module.exports = router;