import PipelineStats from "@/app/ui/pipelineStats"
import { PipelineStatsType, activeCheck, getPipelineNames, DataType, pipelineStatsCheck } from "../lib/data"

export default async function Pipeline() {
  
  //retrieves the pipeline names from the Database
  const pipelineNames = await getPipelineNames();
  //retrieves the active pipelines from the Database, along with other info
  const pipelineData = await activeCheck(pipelineNames);
  //grabs the active pipelines names in an array to minimize request size
  const activePipelines: string[] = pipelineData.map((pipeline: DataType) => pipeline.streamName)

  const pipelineStats = await pipelineStatsCheck(activePipelines)


  //states to check if the pipeline is active or not

  // const [activePipeline, setActivePipeline] = useState<Boolean>(false);
  // const [recording, setRecording] = useState<PipelineStatsType>({
  //   streamName: '',
  //   isRecording: false,
  //   recordName: '',
  //   recordDuration: 0,
  //   recordStart: new Date(),
  // });


  //sets the maximum of 15 pipelines to be viewed at once
  // const pipelineArray = [];
  // for (let i = 0; i < 15; i++) {
  //   pipelineArray.push(<Pipeline key={i} />);
  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg: grid-col-3 2xl:grid-cols-4 gap-4">
      {tempDB.map((pipeline: any) => {
        return (
          <PipelineStats key={pipeline.id}  streamName={pipeline.name} />
        )
      })}
    </div>
  )

}

const tempDB = [
{
"id": 2451,
"name": "East Packager 12",
"server_id": 19,
"server_name": "East Packager",
"pipeline_id": 12
},
{
"id": 2452,
"name": "East Packager 13",
"server_id": 19,
"server_name": "East Packager",
"pipeline_id": 13
},
{
"id": 2453,
"name": "East Packager 14",
"server_id": 19,
"server_name": "East Packager",
"pipeline_id": 14
},
{
"id": 2454,
"name": "East Packager 15",
"server_id": 19,
"server_name": "East Packager",
"pipeline_id": 15
},
{
"id": 2455,
"name": "East Packager 16",
"server_id": 19,
"server_name": "East Packager",
"pipeline_id": 16
},

]