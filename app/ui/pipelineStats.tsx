"use client";

import { useState } from "react";
import { activeCheck, pipelineStats } from "../lib/data";

export default function PipelineStats({ streamName }: { streamName: string }) {
  const [recordName, setRecordName] = useState<string>("");
  const [recording, setRecording] = useState<Boolean>(false);

  const handleRecordClick = () => {
    if (recording) {
      setRecording(false);
    } else {
      setRecording(true);
    }
  };

  const recordColor = recording ? "bg-red-700" : "bg-green-700";

  //destructure pipelineData to populate data
  // const {
  //   active,
  //   connection,
  //   current_bitrate,
  //   resolution,
  //   avg_fps
  // } = pipelineData

  //only if the pipeline is active then we can get the recording stats, to reduce the amount of api calls
  // if (active) {
  //   setActivePipeline(true)
  //   const recordingStats = await pipelineStats(streamName);
  //   setRecording(recordingStats);
  // };

  return (
    <div className="flex flex-col w-80 gap-2 border-solid border-2 border-sky-950 p-4 rounded-lg">
      <h1>
        {`Record Name:`}
        <input
          placeholder="Set name..."
          type="text"
          value={recordName}
          onChange={(e) => setRecordName(e.target.value)}
        />
      </h1>
      <p>{`Stream Name: ${streamName}`}</p>
      <p>{`Active: ${true}`} </p>
      <p>{`Connection: ${true}`}</p>
      <p>{`Current Bit Rate: ${3000} kbps`}</p>
      <p>{`Resolution: `}</p>
      <p>{`Average FPS: `}</p>

      <button
        className={`${recordColor} text-white rounded-lg p-2 mt-4`}
        onClick={() => handleRecordClick()}
      >
        <p>{`Recording: ${recording ? "ON" : "OFF"}`}</p>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      <div>
        <h1>Recording Statistics:</h1>
        <p>Record Duration:</p>
        <p>Record Start:</p>
      </div>
    </div>
  );
}
