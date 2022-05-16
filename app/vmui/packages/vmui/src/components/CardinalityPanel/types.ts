export interface TSDBStatus {
  headsStats: HeadStats;
  labelValueCountByLabelName: TopHeapEntry[]; // [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  seriesCountByLabelValuePair: TopHeapEntry[]; // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  seriesCountByMetricName: TopHeapEntry[]
}

export interface HeadStats {
  numOfLabelPairs: number;
  numSeries: number;
  numberOfLabelsValuePairs: number;
}

export interface TopHeapEntry {
  name:  string;
  count: number;
}
