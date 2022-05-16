import React, {FC} from "preact/compat";
import Grid from "@mui/material/Grid";
import {useFetchQuery} from "../../hooks/useCardinalityFetch";
import EnhancedTable from "../Table/Table";
import {TSDBStatus, HeadStats, TopHeapEntry} from "./types";
import {Data} from "../Table/types";


const CardinalityPanel: FC = () => {

  const {isLoading, tsdbStatus} = useFetchQuery({headsData: undefined, visible: false});

  const headsStats = Object.keys(tsdbStatus.headsStats).map((key: string) => {
    return {name: key, value: tsdbStatus.headsStats[key as keyof HeadStats]} as Data;
  });
  return <Grid container spacing={2}>
    <Grid item xs={12} md={12} lg={12}>
      <EnhancedTable rows={headsStats} headerCells={[]} />
    </Grid>
    {Object.keys(tsdbStatus).map((key ) => {
      if (key == 'headsStats') {
        return null;
      }
      return (
        <Grid item xs={12} md={6} lg={6}>
          <EnhancedTable
            rows={tsdbStatus[key as keyof TSDBStatus] as unknown as Data[]}
            headerCells={[]} />
        </Grid>
      )
    })}
  </Grid>;
};

export default CardinalityPanel;
