import {
  AppShell,
  Box,
  createStyles,
  Flex,
  Header,
  LoadingOverlay,
  Navbar,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarItem from "../../components/utils/navbarItem";
import { getCharts } from "../../utils/apis/charts";
import { ChartLink, charts } from "../../utils/constants";

const useStyle = createStyles({
  navbar: {
    overflow: "auto",
    " &::-webkit-scrollbar": {
      width: "4px",
      background: "#FFFFFF",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      background: "rgba(1,1,1,0.2)",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 0,
      background: "rgba(0,0,0,0.1)",
    },
    "& .mantine-NavLink-children": {
      paddingLeft: "0",
    },
  },
  outletBox: {
    flex: "auto",
    width: "85%",
    height: "100%",
    overflow: "auto",
    " &::-webkit-scrollbar": {
      cursor: "pointer",
      width: "6px",
      height: "8px",
      background: "#FFFFFF",
    },
    "&::-webkit-scrollbar-thumb": {
      cursor: "pointer",
      borderRadius: "6px",
      background: "#369f6ca0",
    },
    "&::-webkit-scrollbar-track": {
      cursor: "pointer",
      borderRadius: 0,
      background: "rgba(0,0,0,0.1)",
    },
  },
});

export function DashBoard() {
  const { classes } = useStyle();
  const [charts, setCharts] = useState(new Array<ChartLink>(0));

  useEffect(() => {
    getCharts()
      .then((res: Array<ChartLink>) => {
        setCharts(res);
      })
      .catch(() => {
        showNotification({
          title: "网络错误",
          color: "red",
          message: "vercel不稳定罢了",
        });
      });
  }, []);

  return (
    <>
      <Flex h={"100%"} w={"100%"} justify={"flex-start"}>
        <LoadingOverlay
          visible={charts.length === 0}
          overlayBlur={2}
          exitTransitionDuration={1000}
        />
        <Navbar className={classes.navbar} w={"15%"}>
          {(charts as Array<ChartLink>).map((v) => {
            return <NavbarItem key={v.link} path="" {...v}></NavbarItem>;
          })}
        </Navbar>
        <Box className={classes.outletBox}>
          <Outlet></Outlet>
        </Box>
      </Flex>
    </>
  );
}
