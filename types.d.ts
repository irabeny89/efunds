type TimestampsAndId = {
  id: number;
  created_at?: string;
  updated_at?: string;
};

export type User = {
  username: string;
  balance?: number;
} & TimestampsAndId;
