"use client";

import { Headers } from "node-fetch";
import { FormEvent, SyntheticEvent, useState } from "react";
import { pipelineStatistics } from "../lib/data";

export default function PipelineStats({
  streamName,
  resolution,
  avg_fps,
  recordName,
  recordDuration,
  recordStart,
}: pipelineStatistics) {
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [recording, setRecording] = useState<boolean>(false);

  //handles the record button state toggle
  const handleRecordClick = () => {
    if (recording) {
      if (window.confirm("Stop this recording?")) setRecording(false);
      // fetch(`/api/videoserver.com/api/incomingstreams/${streamName}`, {method: "POST"})
    } else {
      setRecording(true);
      // fetch(`/api/videoserver.com/api/incomingstreams/${streamName}`, {method: "DELETE"});
    }
  };

  const recordColor = recording ? "bg-red-700" : "bg-green-700";

  return (
    <div className="flex flex-col w-80 gap-2 border-solid border-2 border-sky-950 p-4 rounded-lg">
      <p>{`Stream Name: ${streamName}`}</p>
      <p>{`Active: ${true}`} </p>
      <p>{`Connection: ${true}`}</p>
      <p>{`Current Bit Rate: ${3000} kbps`}</p>
      <p>{`Resolution: ${resolution}`}</p>
      <p>{`Average FPS: ${avg_fps}`}</p>

      <div className="border-solid border-stone-400 border" />

      <button
        className={`${recordColor} text-white rounded-lg p-2 mt-4`}
        onClick={handleRecordClick}
      >
        <p>{`Recording: ${recording ? "ON" : "OFF"}`}</p>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      <div className="mt-2">
        <h1>{`Record Name: ${name}`}</h1>
        <label htmlFor="name"></label>
        <input
          className={
            disableButton
              ? "hidden"
              : "border-solid border-2 border-sky-950 rounded-lg p-[.2rem]"
          }
          id="name"
          placeholder="Set name..."
          type="text"
          value={name}
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value);
          }}
        />
        <button
          className={
            disableButton
              ? "ml-2 p-1 border-2 bg-blue-400 rounded-lg hidden"
              : "ml-2 p-1 border-2 bg-blue-400 rounded-lg"
          }
          onClick={() => setDisableButton(true)}
        >
          Set Name
        </button>
      </div>

      <h1>Recording Statistics:</h1>
      <p>Record Duration:</p>
      <p>Record Start:</p>
    </div>
  );
}
