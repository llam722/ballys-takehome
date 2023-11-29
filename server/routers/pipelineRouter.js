
const pipelineController = require('../controllers/pipelineController');
const express = require('express');
const router = express.Router();


router.get('/', pipelineController.getPipelineNames, pipelineController.activePipelineCheck, pipelineController.streamRecordCheck, (req, res) => {
  res.status(200).json(res.locals.pipelineStatsArray);
});

router.patch('/', pipelineController.checkActivePipe, pipelineController.getNewActivePipe, (req, res) => {
  res.json(res.locals.hi);
});

module.exports = router;