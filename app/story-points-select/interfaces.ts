export interface StoryPoint {
  id: number;
  selectedPoint: number;
  user: string;
}

export type HandleGetStoryPoints = () => void;
