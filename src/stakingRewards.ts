import { CoinTrackingScheme, CoinTrackingStaking } from "./types";

export const getStakingRewards = (accountId: string): CoinTrackingScheme[] => {
  const resultArr: CoinTrackingScheme[] = [];
  const result: CoinTrackingStaking = {
    type: "Staking",
    buyAmount: "0",
    buyCurrency: "ZTG",
    exchange: accountId.toString(),
    tradeGroup: "ZeitgeistPM Staking",
    date: "",
  };
  resultArr.push(result as CoinTrackingScheme);
  return resultArr;
};
