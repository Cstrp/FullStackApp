export interface Overview {
  gain: overviewItems;
  orders: overviewItems;
}

type overviewItems = {
  percent: number;
  compare: number;
  yesterday: number;
  higher: boolean;
};
