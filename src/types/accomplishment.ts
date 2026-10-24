export interface Accomplishment {
  id: number;
  key: string;
  title: string;
  description: string;
  descriptionDisplay: string;
  tags: string[];
  date: string;
}

export interface EncouragingMessage {
  id: number;
  key: string;
  description: string;
}
