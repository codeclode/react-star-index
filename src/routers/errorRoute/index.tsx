import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
} from "@mantine/core";

import { IconHome2 } from "@tabler/icons";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,
    color: "#fdfeff",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export function NotFoundTitle() {
  const { classes } = useStyles();
  const navgative = useNavigate();
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text
        color="#fdfeff"
        size="lg"
        align="center"
        className={classes.description}
      >
        其实这只是一个404页。。。
      </Text>
      <Group position="center">
        <Button
          variant="light"
          radius="md"
          size="xl"
          leftIcon={<IconHome2></IconHome2>}
          color="gray"
          onClick={() => {
            navgative("/");
          }}
        >
          返回首页
        </Button>
      </Group>
    </Container>
  );
}
