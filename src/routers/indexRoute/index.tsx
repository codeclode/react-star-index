import { Box, Button, Stack } from "@mantine/core";
import { useState } from "react";
import IndexShowing from "../../components/other/indexShowing";

export function Index() {
  var [page, setPage] = useState(0);
  return (
    <Box h={"100%"} style={{ overflow: "hidden", position: "relative" }}>
      <IndexShowing></IndexShowing>
    </Box>
  );
}
