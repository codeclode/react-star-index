import {
  ActionIcon,
  Box,
  Button,
  Card,
  createStyles,
  Grid,
  Stack,
  Title,
} from "@mantine/core";
import FeatureCard from "../utils/featureCard";
import { features } from "../../utils/constants";

const useStyle = createStyles({});

const indexShowing = () => {
  const { classes } = useStyle();
  return (
    <>
      <Title
        order={1}
        weight={"bolder"}
        align="center"
        gradient={{
          from: "#66ccff",
          to: "#FFFFFF",
          deg: 180,
        }}
        variant={"gradient"}
      >
        own gallery，with failure
      </Title>
      <Grid m={"0 5%"} columns={12}>
        {features.map((v, i) => (
          <Grid.Col key={i} span={4}>
            <FeatureCard {...v}></FeatureCard>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};
export default indexShowing;
