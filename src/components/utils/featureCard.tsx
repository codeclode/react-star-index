import {
  Badge,
  Button,
  Card,
  Center,
  createStyles,
  Group,
  Text,
} from "@mantine/core";
import { Icon123, TablerIcon } from "@tabler/icons";
import { feature } from "../../utils/constants";

const useStyle = createStyles({
  featureCard: {
    transition: "all 0.6s ease-in-out",
    backgroundColor: "#FFFFFF1A",
    backdropFilter: "blur(6px)",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
});

const FeatureCard = (prop: feature) => {
  const { classes } = useStyle();
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      className={classes.featureCard}
      withBorder
    >
      <Card.Section>
        <Center>
          {<prop.icon size={72} color={prop.iconColor}></prop.icon>}
        </Center>
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} color={prop.badgeColor}>
          {prop.title}
        </Text>
        <Badge color={prop.badgeColor} variant="light">
          {prop.badgeDetail}
        </Badge>
      </Group>
      <Group>
        <Text style={{ fontFamily: "DFKai-SB FangSong" }} color={"black"}>
          {prop.detail}
        </Text>
      </Group>
      <Button
        variant="light"
        onClick={() => {
          window.open(prop.buttonSrc);
        }}
        color={prop.buttonColor}
        fullWidth
        mt="md"
        radius="md"
      >
        {prop.buttonString}
      </Button>
    </Card>
  );
};

export default FeatureCard;
