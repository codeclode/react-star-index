import { useState } from "react";
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import {
  TablerIcon,
  IconHome2,
  IconGauge,
  IconArticle,
  IconMessageDots,
  IconUser,
  IconMessages,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.white,
    opacity: 0.85,
    "&:hover": {
      opacity: 1,
      borderRadius: "50%",
      backgroundColor: theme.fn.lighten(
        "rgb(122, 182, 234)",
        // theme.fn.variant({ variant: "filled", color: "cyan" }).background!,
        0.1
      ),
    },
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      borderRadius: "50%",
      backgroundColor: theme.fn.lighten("rgb(56, 112, 255)", 0.6),
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip
      label={label}
      withArrow
      position="top"
      color="blue"
      transitionDuration={0}
    >
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "首页", route: "" },
  { icon: IconGauge, label: "仪表盘", route: "dashboard" },
  { icon: IconArticle, label: "文档", route: "documents" },
  { icon: IconMessages, label: "如何评价", route: "comments" },
];

const NavbarMinimalColored = (props: { setCommentingState: Function }) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        if (link.route) {
          navigate("/" + link.route);
        } else {
          navigate("/");
        }
      }}
    />
  ));

  return (
    <Navbar
      height={"100%"}
      width={{ base: 80 }}
      p="md"
      sx={(theme) => ({
        border: "0",
        borderRight: "1px solid #FFFFFF86",
        backgroundColor: theme.fn.variant({
          variant: "outline",
          color: theme.primaryColor,
        }).background,
      })}
    >
      <Navbar.Section grow>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={IconMessageDots}
            label="评论"
            onClick={() => {
              props.setCommentingState();
            }}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};
export default NavbarMinimalColored;
