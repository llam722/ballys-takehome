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

export interface Database {
  id: number;
  name: string;
  server_id: number;
  server_name: string;
  pipeline_id: number;
}

export interface PipelineStatistics {
  id: number;
  streamName: string;
  active: boolean;
  connection: boolean;
  current_bitrate: number;
  resolution: string;
  avg_fps: number;
  isRecording: boolean;
  recordName?: string;
  recordDuration?: number;
  recordStart?: string;
}
