"use client";

import { Headers } from "node-fetch";
import { FormEvent, useState } from "react";

export default function PipelineStats({ streamName }: { streamName: string }) {

  const [recordName, setRecordName] = useState<string>("");
  const [recording, setRecording] = useState<Boolean>(false);

  //handles the record button state toggle
  const handleRecordClick = () => {
    if (recording) {
      setRecording(false);
      // fetch(`/api/videoserver.com/api/incomingstreams/${streamName}`, {method: "POST"})
    } else {
      setRecording(true);
      // fetch(`/api/videoserver.com/api/incomingstreams/${streamName}`, {method: "DELETE"});
    }
  };

  const recordColor = recording ? "bg-red-700" : "bg-green-700";

  return (
    <div className="flex flex-col w-80 gap-2 border-solid border-2 border-sky-950 p-4 rounded-lg">
      <div>
        <h1>{`Record Name: ${recordName}`}</h1>
        <input
          placeholder="Set name..."
          type="text"
          value={recordName}
          onChange={(e) => {
            setRecordName(e.target.value);
          }}
        />
      </div>

      <p>{`Stream Name: ${streamName}`}</p>
      <p>{`Active: ${true}`} </p>
      <p>{`Connection: ${true}`}</p>
      <p>{`Current Bit Rate: ${3000} kbps`}</p>
      <p>{`Resolution: `}</p>
      <p>{`Average FPS: `}</p>

      <button
        className={`${recordColor} text-white rounded-lg p-2 mt-4`}
        onClick={handleRecordClick}
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
