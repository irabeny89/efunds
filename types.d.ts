type TimestampsAndId = {
  id: number;
  created_at?: string;
  updated_at?: string;
};

type User = {
  username: string;
  balance: number;
} & TimestampsAndId;

type Credit = {
  from: TimestampsAndId["id"];
  amount: number;
} & TimestampsAndId;

type Debit = {
  to: TimestampsAndId["id"];
  amount: number;
} & TimestampsAndId;

type Withdraws = {
  userId: number;
  amount: number;
} & TimestampsAndId;
