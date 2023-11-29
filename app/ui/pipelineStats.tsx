"use client";

import { useState, useEffect } from "react";
import { pipelineStatistics } from "../lib/types";
import { millisecondsToMinutes } from "../lib/utils";
import { limiter } from "../lib/utils";

export default function PipelineStats({
  id,
  streamName,
  active,
  connection,
  current_bitrate,
  resolution,
  avg_fps,
  recordName,
  recordDuration,
  recordStart,
  isRecording,
}: pipelineStatistics) {
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [recording, setRecording] = useState<boolean>(isRecording);
  const [activePipeline, setActivePipeline] = useState<boolean>(active);
  const [recordingDuration, setRecordingDuration] = useState<any>(recordDuration);
  const [recordDate, setRecordDate] = useState<any>(recordStart);

  // let recordDate;
  // recordStart ? (recordDate = new Date(recordStart)) : (recordDate = "");

  useEffect(() => {

   }, [activePipeline])

  //handles the record button state toggle
  const handlePipelineClick = () => {
    if (activePipeline) {
      if (window.confirm("Stop this pipeline?")) {
        setRecording(false);
        setActivePipeline(false);
        console.log("Pipeline stopped");

        //  patch request to send to videoserver to stop pipeline
        limiter.schedule(() => fetch(`http://localhost:3000/view/?id=${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            streamName: streamName,
            active: false,
          }),
        }))
      }

    } else {
      setActivePipeline(true);
      console.log('Pipeline started')
      
      //  patch request to send to videoserver to start pipeline
      limiter.schedule(() => fetch(`http://localhost:3000/view/?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          streamName: streamName,
          active: true,
        }),
      })).then((res) =>
        res.json().then((data) => {
          setRecording(data.isRecording);
          setRecordingDuration(data.recordDuration);
          setRecordDate(new Date(data.recordStart));
        })
      );
      
      if (recording === false) {
        setRecording(true);
      }
    }
  };

  const pipelineColor = activePipeline ? "bg-red-700" : "bg-green-700";

  return (
    <div className="flex flex-col w-80 gap-2 border-solid border-2 border-sky-950 p-4 rounded-lg">
      <h1>{`Database Id: ${id}`}</h1>
      <div className="border-solid border-stone-400 border" />
      <p>{`Stream Name: ${streamName}`}</p>
      <p>{`Active: ${activePipeline}`} </p>
      <p>{`Connection: ${connection}`}</p>
      <p>{`Current Bit Rate: ${current_bitrate} kbps`}</p>
      <p>{`Resolution: ${resolution}`}</p>
      <p>{`Average FPS: ${avg_fps}`}</p>

      <div className="border-solid border-stone-400 border" />

      <button
        className={`${pipelineColor} text-white rounded-lg p-2 mt-4`}
        onClick={handlePipelineClick}
      >
        {activePipeline ? "Stop Pipeline" : "Start Pipeline"}
      </button>
      <div className="mt-2">
        {/* if name is not set, then display the name of the recording */}
        <p>{`Recording: ${recording ? "ON" : "OFF"}`}</p>
        <h1>{`Record Name: ${name ? name : recordName}`}</h1>
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

      <p>
        Record Duration:{" "}
        {`${millisecondsToMinutes(recordingDuration ? recordingDuration : 0)}`}
      </p>
      <p>Record Start: {recordDate ? recordDate.toString(): ''}</p>
    </div>
  );
}
