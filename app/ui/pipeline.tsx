import PipelineStats from "@/app/ui/pipelineStats";
import {
  PipelineStatsType,
  // activePipelineCheck,
  // getPipelineNames,
  database,
  DataType,
  // streamRecordCheck,
} from "../lib/data";

export default async function Pipeline() {
  //retrieves the pipeline names from the Database
  const pipelineStatistics = await fetch("http:localhost:3000/view").then(
    (res) => res.json()
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg: grid-col-3 2xl:grid-cols-4 gap-4 md:gap-8">
      {pipelineStatistics.map((pipeline: DataType, i: number): JSX.Element => {
        return (
          <PipelineStats
            key={i}
            streamName={pipeline.streamName}
            resolution={pipeline.resolution}
            avg_fps={pipeline.avg_fps}
            recordName={pipeline.recordName}
            recordDuration={pipeline.recordDuration}
            recordStart={pipeline.recordStart}
          />
        );
      })}
    </div>
  );
}
