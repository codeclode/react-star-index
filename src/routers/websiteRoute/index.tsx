import {
  createStyles,
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  Col,
  Box,
} from "@mantine/core";
import {
  IconFlame,
  IconFileCode,
  IconBrandReact,
  IconBrandGraphql,
  IconGitBranch,
  Icon3dCubeSphere,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`,
    color: "transparent",
    backgroundClip: "text",
    backgroundImage: theme.fn.linearGradient(
      30,
      "#fbc2eb",
      " #a6c1ee",
      "#84fab0",
      "#8fd3f4"
    ),
    userSelect: "none",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
  },

  icon: {
    transition: "all 0.9s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      transform: "rotate(360deg)",
    },
  },
}));

const features = [
  {
    icon: IconGitBranch,
    title: "开源",
    description: "如果这种垃圾代码都不好意思开源。",
  },
  {
    icon: IconFileCode,
    title: "函数式",
    description: "众所周知，D3是函数式编程，你必须知道有些函数是返回函数的。",
  },
  {
    icon: Icon3dCubeSphere,
    title: "警告，内含glsl",
    description:
      "阅读含有three的代码时，你要先确保自己是了解计算机图形学和glsl这门面向GPU的语言的。",
  },
  {
    icon: IconFlame,
    title: "可直接使用的",
    description: "向echarts一样直接把代码CV跑跑看吧。",
  },
  {
    icon: IconBrandReact,
    title: "锐评前端应用",
    description:
      "React无话可说，Mantine的CSS in JS让我手足无措，但越用越好使。D3提供了优越的，直接和底层dom对话的api让我们有极大的自由度进行可视化调度。",
  },
  {
    icon: IconBrandGraphql,
    title: "锐评后端应用",
    description:
      "NestJS注解式开发，类似springboot。不过这次希望使用graphql+moongodb开发，也许困难重重。",
  },
];

export function WebsiteInformation() {
  const { classes } = useStyles();

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        className={classes.icon}
        gradient={{ deg: 133, from: "blue", to: "cyan" }}
      >
        <feature.icon size={26} stroke={1.5} />
      </ThemeIcon>
      <Text size="lg" mt="sm" weight={500}>
        {feature.title}
      </Text>
      <Text size="sm">{feature.description}</Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Grid>
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
            可视化代码栈
          </Title>
          <Text>
            作者用来堆放他不成熟的可视化代码（以D3JS和threeJS为主），当然也可以从这里了解到他对于可视化的理解。
            在这里感谢不知名老哥提供的D3可视化全栈电子书以及被我白嫖的作者，这本书籍不仅用大白话讲明白了可视化的准则，
            也提供了丰富的代码带我入门了D3js。你说得对，但是《D3JS》是由D3JS开源团队自主研发的一款全新可视化框架。
            框架发生在一个被称作「svg」的前端世界，在这里，被选择器选中的元素将被授予「数据绑定」，导引函数式编程之力。
            你将扮演一位名为「链式调用」的神秘角色，在自由的冒险中邂逅图表们，和他们一起组织海量数据，找回内在逻辑——同时，
            逐步发掘「数据可视化」的真相。
          </Text>

          <Button
            variant="gradient"
            gradient={{ deg: 133, from: "blue", to: "cyan" }}
            size="lg"
            radius="md"
            mt="xl"
            onClick={() => window.open("https://d3js.org", "__blank")}
          >
            看看D3
          </Button>
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid
            cols={2}
            spacing={30}
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
          >
            {items}
          </SimpleGrid>
        </Col>
      </Grid>
    </div>
  );
}
