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

export interface database {
  id: number;
  name: string;
  server_id: number;
  server_name: string;
  pipeline_id: number;
}

export interface pipelineStatistics {
  id?: number;
  streamName: string;
  active: boolean;
  connection: boolean;
  current_bitrate: number;
  resolution: string;
  avg_fps: number;
  isRecording: boolean;
  recordName: string;
  recordDuration: number;
  recordStart: Date;
}

// //iterate through the database to retrieve the names of the pipelines in an array
// // query each of the names to see if they are active, if so return true
// export async function getPipelineNames(): Promise<string[]> {

//   try {
//     //fetch from local database
//     const response = await fetch('http://localhost:3000/database.json');
//     const data = await response.json();
//     //create an array to store the names of the pipelines
//     const pipelineNames: string[] = [];
//     //regex to remove white spacing
//     const regex = /\s/g;

//     for (let i = 0; i < data.length; i++) {
//       //name in database doesn't match the name in streamNames, so need to modify for consistency
//       //converts all pipeline names to lowercase for consistency and remove white spacing
//       const name = data[i].name.toLowerCase().replaceAll(regex, '');
//       pipelineNames.push(name);
//     }
//     //returns an array of pipeline names
//     return pipelineNames;

//   } catch (error) {

//     console.log('Pipeline name error:', error);
//     throw new Error('Failed to retrieve pipeline names from database')
//   }
// }



// //function to query if pipeline is active
// export async function activePipelineCheck(pipelineNames: string[]): Promise<(DataType | Error)[]>  {
//   const activePipelineArray: (DataType | Error)[] = [];

//   //considerations: create an array to keep count of how many pipelines are in the queue
//   //question to note: do all the pipelines return data at different times?
//   //if so, we can use a queue method, but a longer load would block the shorter loads in parallel?
//   //else you can keep slicing the array and querying the pipelines in parallel, but would need feedback from the server to know when the querying is done (before 200ms)

//   for (const name of pipelineNames) {
//     //streamNames do not have white spacing, so no need to remove white spacing with regex
//     const streamName = name.toLowerCase();
//     try {
//         //mocked database to to emulate the api response
//         const response = await fetch('http://localhost:3000/pipelineDB.json');

//         // const response = await fetch(`http://videoserver.com/api/incomingstreams/${streamName}`)
//         if (response.status === 404) {
//           activePipelineArray.push(new Error(`Pipeline ${streamName} does not exist`));
//           //continues to check the rest of the pipelines or can break if needed
//           break;
//         }
//         const data = await response.json();
//         if (data[0].streamName.toLowerCase() === streamName && data[0].active === true) activePipelineArray.push(...data);
      
//     } catch (error) {
//       console.log('Pipeline check error for stream:', streamName, error);
//       activePipelineArray.push(new Error(`Failed to check if pipeline ${streamName} is active`));
//       throw new Error('Error 404: Pipeline does not exist', )
//     }
//   }
//   return activePipelineArray;
// }

// //function to check statistics of pipeline
// export async function streamRecordCheck(activePipelines: string[]): Promise<PipelineStatsType[] | any> {
//   const pipelineStatsArray: (PipelineStatsType | Error)[] = [];

//   for (const name of activePipelines) {

//     //again, streamNames do not have white spacing, so no need to remove white spacing with regex
//     const streamName = name.toLowerCase();
  
//     try {
//       //if api requests do not exceed 5, no need to time out
//       if (activePipelines.length > 5) {
//         //create buffer to limit api requests to 5 per second
//         await new Promise((resolve) => setTimeout(resolve, 200));


//         const response = await fetch('http://localhost:3000/recordStatsDB.json');
//         // const response = await fetch(`http://videoserver.com/api/streamRecorders/${streamName}`)


//         //if 404, throw error and continue to check the rest of the pipelines
//         if (response.status === 404) {
//           pipelineStatsArray.push(new Error(`Failed to check recording stats for pipeline ${streamName}, pipeline might not be active`));
//           //continues to check the rest of the pipelines or can break if needed
//         }
//         const data = await response.json();
//         if (data[0].streamName.toLowerCase() === streamName) pipelineStatsArray.push(...data);

//       } else {
//         //mocked database to to emulate the api response
//         const response = await fetch('http://localhost:3000/recordStatsDB.json');
//         // const response = await fetch(`http://videoserver.com/api/streamRecorders/${streamName}`)

//         if (response.status === 404) {
//           pipelineStatsArray.push(new Error(`Failed to check recording stats for pipeline ${streamName}, pipeline might not be active`));
//           //continues to check the rest of the pipelines or can break if needed
//           break;
//         }
//         const data = await response.json();
//         if (data[0].streamName.toLowerCase() === streamName) pipelineStatsArray.push(...data);
//       }

//     } catch (error) {
//       console.log('Pipeline stats error for stream:', streamName, error);
//       pipelineStatsArray.push(new Error(`Failed to check recording stats for pipeline ${streamName}, pipeline might not be active`));
//     }
//   }
//   return pipelineStatsArray;
// }