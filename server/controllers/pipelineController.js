const { pipeline } = require("stream");

const pipelineController = {

  getPipelineNames: async (req, res, next) => {
  try {
    //fetch from local database
    const response = await fetch('http://localhost:3000/database.json');
    const data = await response.json();
    //create an array to store the names of the pipelines
    const pipelineNames = [];
    //regex to remove white spacing
    const regex = /\s/g;

    for (let i = 0; i < data.length; i++) {
      //name in database doesn't match the name in streamNames, so need to modify for consistency
      //converts all pipeline names to lowercase for consistency and remove white spacing
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
    
    const pipelineNames  = res.locals.pipelineNames;
    // console.log(res.locals.pipelineNames)
  // considerations: create an array to keep count of how many pipelines are in the queue
  // question to note: do all the pipelines return data at different times?
  // if so, we can use a queue method, but a longer load would block the shorter loads in parallel?
    //   else you can keep slicing the array and querying the pipelines in parallel, but would need feedback from the server to know when the querying is done (before 200ms)

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
        if (data[i].streamName.toLowerCase() === streamName && data[i].active === true) {
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
      
      const { id, streamName, active, connection, current_bitrate, resolution, avg_fps } = pipeline;
  
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
          if (data[i].streamName === streamName) {

            const { isRecording, recordName, recordDuration, recordStart } = data[i];
            const pipelineStats = {
              id,
              streamName,
              active,
              connection,
              current_bitrate,
              resolution,
              avg_fps,
              isRecording,
              recordName,
              recordDuration,
              recordStart
            };
            pipelineStatsArray.push(pipelineStats);
          }
        }

    } catch (error) {
      console.log('Pipeline stats error for stream:', streamName, error);
      pipelineStatsArray.push(new Error(`Failed to check recording stats for pipeline ${streamName}, pipeline might not be active`));
    }
    }
  res.locals.pipelineStatsArray = pipelineStatsArray;
  return next();
}
};


module.exports = pipelineController;