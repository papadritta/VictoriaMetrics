import {ErrorTypes} from "../types";
import {useAppState} from "../state/common/StateContext";
import {useEffect, useState} from "preact/compat";
import {getCardinalityInfo} from "../api/tsdb";
import {getAppModeEnable, getAppModeParams} from "../utils/app-mode";
import {TSDBStatus} from "../components/CardinalityPanel/types";

interface FetchQueryParams {
  visible: boolean
  headsData: any,

}

const appModeEnable = getAppModeEnable();
const {serverURL: appServerUrl} = getAppModeParams();

export const useFetchQuery = ({visible}: FetchQueryParams): {
  fetchUrl?: string[],
  isLoading: boolean,
  error?: ErrorTypes | string
  tsdbStatus: TSDBStatus,
} => {
//  console.log("APP STATE =>", useAppState());
  const {serverUrl, queryControls: {nocache}} = useAppState();
  const [queryOptions, setQueryOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [graphData, setGraphData] = useState<MetricResult[]>();
  // const [liveData, setLiveData] = useState<InstantMetricResult[]>();
  const [error, setError] = useState<ErrorTypes | string>();
  // const [fetchQueue, setFetchQueue] = useState<AbortController[]>([]);
  const [tsdbStatus, setTSDBStatus] = useState<TSDBStatus>({
    headsStats: {
      numOfLabelPairs: 0,
      numSeries: 0,
      numberOfLabelsValuePairs: 0,
    },
    labelValueCountByLabelName: [], // [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    seriesCountByLabelValuePair: [], // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    seriesCountByMetricName: []
  })

  useEffect(() => {
    if (error) {
      // setGraphData(undefined);
      // setLiveData(undefined);
      console.log("got error =>", error);
    }
  }, [error]);

  // const throttledFetchData = useCallback(throttle(fetchData, 1000), []);


  const fetchCardinalityInfo = async () => {
    const server = appModeEnable ? appServerUrl : serverUrl;
    if (!server) return;
    const url = getCardinalityInfo(server);

    try {
      const response = await fetch(url);
      const resp = await response.json();
      if (response.ok) {
        const {headsStats, data} = resp;
        console.log("headsStats =>", headsStats);
        console.log("data =>", data);

        setTSDBStatus({
          headsStats: headsStats,
          labelValueCountByLabelName: data.labelValueCountByLabelName,
          seriesCountByLabelValuePair: data.seriesCountByLabelValuePair,
          seriesCountByMetricName: data.seriesCountByMetricName,
        })
        setQueryOptions(resp.data);
      }
    } catch (e) {
      if (e instanceof Error) setError(`${e.name}: ${e.message}`);
    }
  };

  // const fetchUrl = useMemo(() => {
  //     const server = appModeEnable ? appServerUrl : serverUrl;
  //     const expr = predefinedQuery ?? query;
  //     const displayChart = (display || displayType) === "chart";
  //     if (!period) return;
  //     if (!server) {
  //       setError(ErrorTypes.emptyServer);
  //     } else if (expr.every(q => !q.trim())) {
  //       setError(ErrorTypes.validQuery);
  //     } else if (isValidHttpUrl(server)) {
  //       const updatedPeriod = {...period};
  //       if (customStep.enable) updatedPeriod.step = customStep.value;
  //       return expr.filter(q => q.trim()).map(q => displayChart
  //         ? getQueryRangeUrl(server, q, updatedPeriod, nocache)
  //         : getQueryUrl(server, q, updatedPeriod));
  //     } else {
  //       setError(ErrorTypes.validServer);
  //     }
  //   },
  //   [serverUrl, period, displayType, customStep]);


  useEffect(() => {
    fetchCardinalityInfo();
  }, [serverUrl]);

  // return { fetchUrl, isLoading, graphData, liveData, error, queryOptions: queryOptions };

  return {isLoading, tsdbStatus};
};
