import React, {FC} from "preact/compat";
import Box from "@mui/material/Box";
import {useFetchQuery} from "../../hooks/useCardinalityFetch";

const CardinalityPanel: FC = () => {

  const {isLoading} = useFetchQuery({visible: false});
  console.log("isLoading =>", isLoading);

  return <>
    <Box sx={{borderBottom: 1, borderColor: "divider"}}>
      <div>First new!</div>
    </Box>
    <Box>
      <div>New Name Year!!</div>
    </Box>
  </>;
};

export default CardinalityPanel;
