import PipelineStats from "@/app/ui/pipelineStats";
import { pipelineStatistics } from "../lib/types";
import { limiter } from "../lib/utils";

export default async function Pipeline() {
  //retrieves the pipeline names from the Database, revalidates every 5 seconds 
  //30 requests / 2 = 15 active pipelines / 5 requests per second = 3 seconds to send all requests, giving it a buffer of 2 seconds
  const pipeline = await limiter.schedule(() => fetch("http:localhost:3000/view", {next: {revalidate: 5000}}))
  const pipelineStatistics = await pipeline.json();

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
