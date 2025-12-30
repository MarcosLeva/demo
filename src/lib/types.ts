export type User = {
  id: string;
  name: string;
  login: string;
  avatar: string;
  balance: number;
  deposits: number;
  withdrawals: number;
  winnings: number;
  game: string;
  createdAt: string;
};

export type BalanceHistoryEntry = {
  id: number;
  operation: string;
  deposit: number;
  withdraw: number;
  wager: number;
  betLimit: number;
  balanceBefore: number;
  currency: string;
  date: string;
  time: string;
  initiator: string;
  fromUser: string;
  system: string;
  toUser: string;
  ip: string;
};

export type ProviderStatistic = {
  provider: string;
  seal: string;
  bet: number;
  win: number;
  winnings: number;
  wager: number;
  addedBet: number;
  rtp: number;
};
