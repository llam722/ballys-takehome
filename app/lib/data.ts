export interface DataType {
  streamName: string;
  active: boolean;
  connection: boolean;
  current_bitrate: number;
  resolution: string;
  avg_fps: number;
}

export interface PipelineStatsType {
  streamName: string;
  isRecording: boolean;
  recordName: string;
  recordDuration: number;
  recordStart: Date;
}

//iterate through the database to retrieve the names of the pipelines in an array
// query each of the names to see if they are active, if so return true
export async function getPipelineNames(): Promise<string[]> {

  try {

    const response = await fetch('http://localhost:3000/database.json');
    const data = await response.json();
    
    const pipelineNames: string[] = [];
    for (let i = 0; i < data.length; i++) {
      pipelineNames.push(data[i].name);
    }

    //returns an array of pipeline names
    return pipelineNames;

  } catch (error) {

    console.log('Pipeline name error:', error);
    throw new Error('Failed to retrieve pipeline names from database')
  }
}



//function to query if pipeline is active
export async function activeCheck(pipelineNames: string[]): Promise<DataType[] | any>  {
  const activePipelineArray: (DataType | Error)[] = [];

  //iterate through the array of pipeline names and query each one with 200ms delay
  for (const streamName of pipelineNames) {
    try {
      //if api requests do not exceed 5, no need to time out
      if (pipelineNames.length > 5) {
        //create buffer to limit api requests to 5 per second
        await new Promise((resolve) => setTimeout(resolve, 200));

      } else {
        const data = await fetch(`http://videoserver.com/api/incomingstreams/${streamName}`)
        const response = await data.json();
        activePipelineArray.push(response);
      }

    } catch (error) {
      console.log('Pipeline check error for stream:', streamName, error);
      activePipelineArray.push(new Error(`Failed to check if pipeline ${streamName} is active`));
    }
  }
  return activePipelineArray;
}

//function to check statistics of pipeline
export async function pipelineStatsCheck(activePipelines: string[]): Promise<PipelineStatsType[] | any> {
  const pipelineStatsArray: (PipelineStatsType | Error)[] = [];

  for (const streamName of activePipelines) {
    try {
      //if api requests do not exceed 5, no need to time out
      if (activePipelines.length > 5) {
        //create buffer to limit api requests to 5 per second
        await new Promise((resolve) => setTimeout(resolve, 200));

      } else {
        const data = await fetch(`http://videoserver.com/api/streamRecorders/${streamName}`)
        const response = await data.json();
        pipelineStatsArray.push(response);
      }
    } catch (error) {
      console.log('Pipeline stats error for stream:', streamName, error);
      pipelineStatsArray.push(new Error(`Failed to check recording stats for pipeline ${streamName}`));
    }
  }
  return pipelineStatsArray;
}