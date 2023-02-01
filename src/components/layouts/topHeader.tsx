import { useTheme } from "@emotion/react";
import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Title,
  keyframes,
} from "@mantine/core";
import {
  IconBrandCss3,
  IconBrandMantine,
  IconBrandReact,
  IconBrandVite,
  IconSearch,
  IconBrandD3,
  IconBrandThreejs,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { HeaderSearchProps } from "../../utils/constants";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: "transparent",
    width: "100%",
    borderBottom: "1px solid #FFFFFF86",
    padding: 0,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  siteIcons: {
    display: "flex",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  SiteTitle: {
    color: "transparent",
    backgroundClip: "text",
    backgroundImage:
      "url(https://pic1.zhimg.com/v2-d4b7331a3548dda1f8dd8ceaf6ee6df2_r.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  social: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: "white",
    transition: "all 0.2s linear ",
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: "#6ecbaa",
      color: "#ffcb6e",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: "white",
    transition: "all 0.2s linear ",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: "#66ccff",
      color: "black",
    },
  },
}));
export default function TopHeader({ links, socials }: HeaderSearchProps) {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();
        if (link.isRoute) {
          navigate(link.link);
        } else {
          window.open(link.link, "__blank");
        }
      }}
    >
      {link.label}
    </a>
  ));
  const social = socials.map((social) => {
    return (
      <a
        key={social.label}
        href={social.link}
        target="__black"
        className={classes.social}
      >
        <social.icon size={32} />
      </a>
    );
  });

  return (
    <Header height={"10%"} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <IconBrandReact color="#61dafb"></IconBrandReact>
          <IconBrandMantine color="#339af0"></IconBrandMantine>
          <IconBrandCss3 color="#2660e5"></IconBrandCss3>
          <IconBrandVite color="#fed530"></IconBrandVite>
          <IconBrandD3 color="#f47e4e"></IconBrandD3>
          <IconBrandThreejs color="#121212"></IconBrandThreejs>
        </Group>
        <Group>
          <Title className={classes.SiteTitle} order={1}>
            前端复习中
          </Title>
        </Group>
        <Group>
          {items}
          {social}
        </Group>
      </div>
    </Header>
  );
}
