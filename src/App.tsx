import LeftNav from "./components/layouts/LeftNav";
import TopHeader from "./components/layouts/topHeader";
import Comment from "./components/other/comment";
import { Box, createStyles, Flex } from "@mantine/core";
import "./App.css";
import { Outlet } from "react-router-dom";
import { headerContent } from "./utils/constants";
import { useState } from "react";

const useStyle = createStyles(() => ({
  routerDomain: {
    flex: "auto",
    height: "100%",
    overflow: "auto",
    scrollBehavior: "smooth",
    "&::-webkit-scrollbar": {
      width: "10px",
      borderRadius: "10px",
      background: "rgba(0,0,0,0)",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "rgba(196,44,67,1)",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      background: "rgba(123,44,67,1)",
    },
  },
}));

function App() {
  const { classes } = useStyle();
  const [commenting, setCommenting] = useState(false);
  function setCommentingAsTrue() {
    setCommenting(true);
  }
  function setCommentingAsFalse() {
    setCommenting(false);
  }
  return (
    <div className="App">
      <Flex
        w={"100%"}
        h={"100%"}
        justify="flex-start"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <TopHeader
          links={headerContent.links}
          socials={headerContent.socials}
        ></TopHeader>
        <Flex
          w={"100%"}
          h={"90%"}
          justify="space-between"
          align="flex-start"
          direction="row"
          wrap="nowrap"
        >
          <LeftNav setCommentingState={setCommentingAsTrue}></LeftNav>
          <Box className={classes.routerDomain}>
            <Outlet></Outlet>
          </Box>
        </Flex>
      </Flex>
      <Comment
        commenting={commenting}
        setCommentingState={setCommentingAsFalse}
      ></Comment>
    </div>
  );
}

export default App;
