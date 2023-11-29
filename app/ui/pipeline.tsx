import PipelineStats from "@/app/ui/pipelineStats";
import { pipelineStatistics } from "../lib/types";

export default async function Pipeline() {
  //retrieves the pipeline names from the Database
  const pipeline = await fetch("http:localhost:3000/view")
  const pipelineStatistics = await pipeline.json();

  // console.log(pipelineStatistics, 'pipelineStatistics')


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg: grid-col-3 2xl:grid-cols-4 gap-4 md:gap-8">
      {pipelineStatistics.map((pipeline: pipelineStatistics): JSX.Element => {
        const {
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
          recordStart,
        } = pipeline;

        return (
          <PipelineStats
            key={id}
            id={id}
            streamName={streamName}
            active={active}
            connection={connection}
            current_bitrate={current_bitrate}
            resolution={resolution}
            avg_fps={avg_fps}
            isRecording={isRecording}
            recordName={recordName}
            recordDuration={recordDuration}
            recordStart={recordStart}
          />
        );
      })}
    </div>
  );
}
