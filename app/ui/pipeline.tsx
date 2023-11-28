import PipelineStats from "@/app/ui/pipelineStats";
import {
  PipelineStatsType,
  activePipelineCheck,
  getPipelineNames,
  database,
  DataType,
  streamRecordCheck,
} from "../lib/data";

export default async function Pipeline() {
  //retrieves the pipeline names from the Database
  const pipelineNames = await getPipelineNames();
  //retrieves the active pipelines from the Database, along with other info
  const pipelineData = await activePipelineCheck(pipelineNames);
  //filters the active pipelines names in an array to minimize request size
  const activePipelines: string[] = pipelineData.map(
    (pipeline: DataType[]) => pipeline[0].streamName
  );
  // console.log(pipelineData, 'pipelineData')
  const pipelineStats = await streamRecordCheck(activePipelines);
  console.log(pipelineStats, 'pipelineStats')


  // const { active, connection, current_bitrate, resolution, avg_fps }
  //   = pipelineData;

  // const {
  //   streamName,
  //   isRecording,
  //   recordName,
  //   recordDuration,
  //   recordStart,
  // } = pipelineStats;

  // console.log(active, connection, current_bitrate, resolution, avg_fps, 'pipelineData')
  // console.log(streamName, isRecording, recordName, recordDuration, recordStart, 'pipelineStats')


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg: grid-col-3 2xl:grid-cols-4 gap-4 md:gap-8">

      {pipelineData.map((pipeline: DataType[], i: number): JSX.Element => {
        return <PipelineStats key={i} streamName={pipeline[i].streamName} />;
      })}
    </div>
  );
}


