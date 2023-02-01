import { Box, createStyles, LoadingOverlay, Title } from "@mantine/core";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { frameLocationStoreContext } from "../../../store/frameLocation.store";

const useStyle = createStyles({
  detailPage: {
    width: "95%",
    height: "95%",
    border: "0",
    background: "#66ccff",
    boxSizing: "border-box",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "10px",
    boxShadow: "0 0 20px 4px #ffffff8a",
  },
});

export default observer(function ChartFrame() {
  const { classes } = useStyle();
  const frameLocationStore = useContext(frameLocationStoreContext);
  const [src, setSrc] = useState("https://reace-index-charts.vercel.app/");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setSrc(
      `https://reace-index-charts.vercel.app/${frameLocationStore.currentPage}`
    );
  }, [frameLocationStore.url]);
  return (
    <>
      <Box style={{ position: "relative", width: "100%", height: "99%" }}>
        <LoadingOverlay
          overlayBlur={2}
          color="pink"
          visible={frameLocationStore.frameLoading}
        ></LoadingOverlay>
        <iframe
          src={src}
          onLoad={() => {
            frameLocationStore.setLoading(false);
          }}
          className={classes.detailPage}
        ></iframe>
      </Box>
    </>
  );
});
