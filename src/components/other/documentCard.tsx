import {
  createStyles,
  Text,
  Title,
  TextInput,
  Button,
  Image,
  Box,
  Badge,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { buildinColors, Document } from "../../utils/constants";
import { motion } from "framer-motion";

const useStyles = createStyles((theme) => ({
  wrapper: {
    cursor: "pointer",
    display: "grid",
    gridTemplateColumns: "8fr 1fr",
    alignItems: "center",
    margin: "10px",
    padding: "15px 10px",
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.gray[8] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
    transition: "all 0.6s ease",
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
  },

  body: {
    paddingRight: theme.spacing.xl * 4,
  },
  image: {
    "& .mantine-Image-image": {
      aspectRatio: "1/1",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },
}));

interface Card extends Document {
  navUrl: string;
  rank: number;
}

export function DocumentCard(prop: Card) {
  const navigate = useNavigate();
  const { classes } = useStyles();
  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: -1080, opacity: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.35 * prop.rank,
      }}
      className={classes.wrapper}
      onClick={() =>
        navigate(`/${prop.navUrl}/${prop.title}`, {
          state: {
            tags: prop.tags || [],
            title: prop.title,
            updateTime: prop.updateTime,
          },
        })
      }
    >
      <div className={classes.body}>
        <Title className={classes.title}>{prop.title}</Title>
        <Text size="sm" lineClamp={2} color="dimmed">
          {prop.info}
        </Text>
        <Text size="sm" lineClamp={2} color="dimmed">
          {prop.updateTime.toDateString()}
        </Text>
        <Box mt={"3px"}>
          {prop.tags?.length
            ? prop.tags.map((v) => {
                return (
                  <Badge
                    mr={8}
                    color={
                      buildinColors[
                        Math.round(Math.random() * buildinColors.length)
                      ]
                    }
                    key={v}
                    size="xl"
                  >
                    {v}
                  </Badge>
                );
              })
            : ""}
        </Box>
      </div>
      <Box>
        <Image fit="contain" src={prop.avatar} className={classes.image} />
      </Box>
    </motion.div>
  );
}
