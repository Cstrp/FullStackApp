export interface Analytics {
  average: number;
  chart: chartItem[];
}

type chartItem = {
  label: string;
  order: number;
  gain: number;
};
