const { get } = require("http");

const pipelineController = {

  getPipelineNames: async (req, res, next) => {
  try {
    //fetch from local database
    const response = await fetch('http://localhost:3000/database.json');
    const data = await response.json();
    //create an array to store the names of the pipelines
    const pipelineNames = [];
    //regex to remove spaces
    const regex = /\s/g;

    for (let i = 0; i < data.length; i++) {
      //name in database doesn't match the name in streamNames, so need to modify to lowercase and remove white spacing for consistency
      const name = data[i].name.toLowerCase().replaceAll(regex, '');
      pipelineNames.push([name, data[i].id]);
    }
    res.locals.pipelineNames = pipelineNames;
    //returns an array of pipeline names
    return next();

  } catch (error){
    console.log('Pipeline name error:', error);
    throw new Error('Failed to retrieve pipeline names from database')
  }
  },
  
  activePipelineCheck: async (req, res, next) => {
    const activePipelineArray = [];
    
    const pipelineNames = res.locals.pipelineNames;

    for (const name of pipelineNames) {
    //streamNames do not have white spacing, so no need to remove white spacing with regex
      const streamName = name[0].toLowerCase();
      // console.log(name)
      const id = name[1];
    try {
        //mocked database to to emulate the api response
      const response = await fetch('http://localhost:3000/pipelineDB.json');
        // const response = await fetch(`http://videoserver.com/api/incomingstreams/${streamName}`)
      if (response.status === 404) {
          res.sendStatus(404).send(`Failed to check if pipeline ${streamName} is active`);
          activePipelineArray.push(new Error(`Failed to check if pipeline ${streamName} is active`));
          //continues to check the rest of the pipelines or can break if needed
          break;
        }
      const data = await response.json();
      
      //cross references multiple pipelines from mock database
      for (let i = 0; i < data.length; i++) {
        if (data[i].streamName.toLowerCase() === streamName) {
          const newData = { id: id, ...data[i] }
          activePipelineArray.push(newData);
        }
    
      }
        
      } catch (error) {
        console.log('Pipeline check error for stream:', streamName, error);
        activePipelineArray.push(new Error(`Failed to check if pipeline ${streamName} is active`));
        throw new Error('Error 404: Pipeline does not exist', )
      }
  }

    res.locals.activePipelineArray = activePipelineArray;
    return next();
  },
  

  streamRecordCheck: async (req, res, next) => {
    const pipelineStatsArray = [];
  
    const activePipelines = res.locals.activePipelineArray;
    
    for (const pipeline of activePipelines) {
      const {streamName} = pipeline;
      try {
        //mocked database to to emulate the api response
        const response = await fetch('http://localhost:3000/recordStatsDB.json');
        // const response = await fetch(`http://videoserver.com/api/streamRecorders/${streamName}`)

        if (response.status === 404) {
          res.sendStatus(404).send(`Failed to check recording stats for pipeline ${streamName}, pipeline might not be active`);
          //continues to check the rest of the pipelines for local db or can break if needed
          break;
        }
        const data = await response.json();

        for (let i = 0; i < data.length; i++) {
          if (data[i].streamName === streamName && pipeline.active === true) {
              
              const pipelineStats = Object.assign(pipeline, data[i]);
              pipelineStatsArray.push(pipelineStats);

            } else if (data[i].streamName === streamName && pipeline.active === false) {
            pipelineStatsArray.push(pipeline);
          }
        }

    } catch (error) {
      console.log('Pipeline stats error for stream:', streamName, error);
      pipelineStatsArray.push(new Error(`Failed to check recording stats for pipeline ${streamName}, pipeline might not be active`));
    }
    }
  res.locals.pipelineStatsArray = pipelineStatsArray;
  return next();
  },

  checkActivePipe: async (req, res, next) => {

    const response = await (fetch('http://localhost:3000/pipelineDB.json'));
    const data = await response.json()

    for (let i = 0; i < data.length; i++) {

      if (data[i].streamName === req.body.streamName) {
        data[i].active = req.body.active;
        res.locals.hi = data[i];
      }
    }
    
    return next()
  },

  getNewActivePipe: async (req, res, next) => {
    const first = res.locals.hi
    try {
      if (first.active === true) {
  
        const response = await fetch('http://localhost:3000/recordStatsDB.json')
        const data = await response.json();
    
        for (let i = 0; i < data.length; i++) {
          if (data[i].streamName === req.body.streamName) {
            data[i].active = req.body.active;
            res.locals.pipeline = Object.assign(first, data[i]);
          }
        }
      } else {
        res.locals.pipeline = first;
      }

    } catch (error) {
      console.log('Pipeline stats error for stream:', first.streamName, error);
      res.send(`Failed to check recording stats for newly activated pipeline`)
    }
    return next()
  },


};


module.exports = pipelineController;