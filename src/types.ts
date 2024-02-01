type CoinTrackingScheme = {
  // e.g. 'Trade', 'Withdrawal', 'Deposit'
  type: string;
  // e.g. '42.0', could also be deposit amount
  buyAmount: string;
  // e.g. 'ZTG-TOK', could also be deposit currency
  buyCurrency: string;
  // e.g. '42.0', could also be withdrawal amount
  sellAmount: string;
  // e.g. 'ZTG', could also be withdrawal currency
  sellCurrency: string;
  // e.g. '42.0' should be transaction fee or null for swap fee
  feeAmount: string | null;
  // e.g. 'ZTG'
  feeCurrency: string | null;
  // e.g. 'ZeitgeistPM AMM' or 'ZTG Wallet dE17ow...vQ7o'
  exchange: string;
  // e.g. 'ZTG-MID21-COI2'
  tradeGroup: string;
  // e.g. 'Extrinsic Hash: '0x8d5835b4ceea65cd55c4ca6c0dcc11123e1a55d58aef464de26f18bd81636c16', Extrinsic Name: 'Utility.batch''
  comment: string;
  // e.g. '30.01.2018  15:20:25'
  date: string;
  // e.g. 'ZTG-PID42'
  liquidityPool: string | null;
  // extrinsic hash e.g. '0x8d5835b4ceea65cd55c4ca6c0dcc11123e1a55d58aef464de26f18bd81636c16'
  txId: string;
  // if 'buyCurrency' has no price data: e.g. '42.0' for the value of the 'buyCurrency' in the currency 'USD' or 'EUR'
  buyValueInAccountCurrency: string | null;
  // if 'sellCurrency' has no price data: e.g. '42.0' for the value of the 'sellCurrency' in the currency 'USD' or 'EUR'
  sellValueInAccountCurrency: string | null;
};

type CoinTrackingTrade = Pick<
  CoinTrackingScheme,
  // 'Trade'
  | "type"
  // '42.0'
  | "buyAmount"
  // 'ZTG-TOK'
  | "buyCurrency"
  // '42.0'
  | "sellAmount"
  // 'ZTG' or other base asset like 'DOT' or 'USDC'
  | "sellCurrency"
  // TODO: would be nice to have the swap fee explicitly stated here, however it is not mandatory right now since the swap fee is inherently included in the resulting swap price
  // TODO: swap fees exist since this upgrade https://github.com/zeitgeistpm/zeitgeist/blob/main/docs/changelog_for_devs.md#v035
  // 'null' because swap fee is inherently included in the resulting swap price
  | "feeAmount"
  // 'null' because swap fee is inherently included in the resulting swap price
  | "feeCurrency"
  // 'ZeitgeistPM AMM'
  | "exchange"
  // 'ZTG-MID21-COI2' for Zeitgeist Market Id 21, Categorical Outcome Index 2 (unique identifier for the asset)
  | "tradeGroup"
  // 'Extrinsic Hash: '0x8d5835b4ceea65cd55c4ca6c0dcc11123e1a55d58aef464de26f18bd81636c16', Extrinsic Name: 'Utility.batch''
  | "comment"
  // '30.01.2018  15:20:25' in UTC
  | "date"
  // 'ZTG-PID42'
  | "liquidityPool"
  // '0x8d5835b4ceea65cd55c4ca6c0dcc11123e1a55d58aef464de26f18bd81636c16' is the extrinsic hash
  | "txId"
  // if 'buyCurrency' has no price data: '42.0' for the value of the 'buyCurrency' in the currency 'USD' or 'EUR'
  // TODO: https://github.com/zeitgeistpm/zeitgeist-subsquid/issues/492
  | "buyValueInAccountCurrency"
  // if 'sellCurrency' has no price data: '42.0' for the value of the 'sellCurrency' in the currency 'USD' or 'EUR'
  | "sellValueInAccountCurrency"
>;

type CoinTrackingDeposit = Pick<
  CoinTrackingScheme,
  // 'Deposit'
  | "type"
  // '42.0' just the deposit amount, should not include the transaction fees, so amount after transaction fees (only withdrawals include those)
  | "buyAmount"
  // 'ZTG' just the deposit currency
  | "buyCurrency"
  // 'ZTG Wallet dE17ow...vQ7o' (limit is up to 32 characters, need to cut the address)
  | "exchange"
  // 'Extrinsic Hash: '0x8d5835b4ceea65cd55c4ca6c0dcc11123e1a55d58aef464de26f18bd81636c16', Extrinsic Name: 'Utility.batch''
  | "comment"
  // '30.01.2018  15:20:25' in UTC
  | "date"
  // '0x8d5835b4ceea65cd55c4ca6c0dcc11123e1a55d58aef464de26f18bd81636c16' is the extrinsic hash
  | "txId"
>;

type CoinTrackingWithdrawal = Pick<
  CoinTrackingScheme,
  // 'Withdrawal'
  | "type"
  // '42.0' just the withdrawal amount, transaction fees are charged from this amount and stated in the 'feeAmount' field
  | "sellAmount"
  // 'ZTG' just the withdrawal currency
  | "sellCurrency"
  // `feeAmount` should be included in the 'sellAmount', but stated explicitly here for clarity how much fee it was
  | "feeAmount"
  // 'ZTG' or other fee currency specified in pallet_asset_tx_payment
  | "feeCurrency"
  // 'ZTG Wallet dE17ow...vQ7o' (limit is up to 32 characters, need to cut the address)
  | "exchange"
  // 'Extrinsic Hash: '0x8d5835b4ceea65cd55c4ca6c0dcc11123e1a55d58aef464de26f18bd81636c16', Extrinsic Name: 'Utility.batch''
  | "comment"
  // '30.01.2018  15:20:25' in UTC
  | "date"
  // '0x8d5835b4ceea65cd55c4ca6c0dcc11123e1a55d58aef464de26f18bd81636c16' is the extrinsic hash
  | "txId"
>;

type CoinTrackingStaking = Pick<
  CoinTrackingScheme,
  // 'Staking'
  | "type"
  // '42.0'
  | "buyAmount"
  // 'ZTG'
  | "buyCurrency"
  // 'ZTG Wallet dE17ow...vQ7o' (limit is up to 32 characters, need to cut the address)
  | "exchange"
  // 'ZeitgeistPM Staking'
  | "tradeGroup"
  // '30.01.2018  15:20:25' in UTC
  | "date"
>;

type CoinTrackingOtherFee = Pick<
  CoinTrackingScheme,
  // 'Other Fee'
  | "type"
  // '42.0'
  | "sellAmount"
  // 'ZTG' or other fee asset
  | "sellCurrency"
  // 'ZTG Wallet dE17ow...vQ7o' (limit is up to 32 characters, need to cut the address)
  | "exchange"
  // 'Extrinsic Hash: '0x8d5835b4ceea65cd55c4ca6c0dcc11123e1a55d58aef464de26f18bd81636c16', Extrinsic Name: 'Utility.batch''
  | "comment"
  // '30.01.2018  15:20:25' in UTC
  | "date"
  // '0x8d5835b4ceea65cd55c4ca6c0dcc11123e1a55d58aef464de26f18bd81636c16' is the extrinsic hash
  | "txId"
>;

export {
  CoinTrackingScheme,
  CoinTrackingTrade,
  CoinTrackingDeposit,
  CoinTrackingWithdrawal,
  CoinTrackingStaking,
  CoinTrackingOtherFee,
};
