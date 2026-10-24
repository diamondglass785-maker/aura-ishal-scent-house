export function portableMediaPath(pointer: { original_filename: string }): string;
export function stageMedia(options: {
  source: string;
  staging: string;
  mediaDirectory?: string;
  origin: string;
}): Promise<void>;