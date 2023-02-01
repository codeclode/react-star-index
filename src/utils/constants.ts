import {
  IconAlertCircle,
  IconBrandBaidu,
  IconBrandD3,
  IconBrandGithub,
  IconBrandHipchat,
  IconBrandThreejs,
  IconChartArcs,
  IconChartAreaLine,
  IconChartBar,
  IconCircles,
  IconDashboard,
  IconFlame,
  IconInfoCircle,
  IconQuestionCircle,
  IconSvg,
  TablerIcon,
} from "@tabler/icons";
import { FunctionComponent } from "react";

class commentType {
  icon: TablerIcon;
  selection: string;
  color: string;
  constructor(icon: TablerIcon, selection: string, color: string) {
    this.icon = icon;
    this.selection = selection;
    this.color = color;
  }
}

export const commentTypes = {
  question: new commentType(IconQuestionCircle, "疑问", "grape"),
  info: new commentType(IconInfoCircle, "普通", "blue"),
  warning: new commentType(IconAlertCircle, "警告", "yellow"),
  suggestion: new commentType(IconFlame, "建议", "red"),
};

export const dividerBorder = "1px solid #FFFFFF86";

export interface HeaderSearchProps {
  links: { isRoute: boolean; link: string; label: string }[];
  socials: { link: string; label: string; icon: TablerIcon }[];
}

export interface feature {
  title: string;
  badgeColor: string;
  badgeDetail: string;
  detail: string;
  buttonSrc: string;
  buttonString: string;
  buttonColor: string;
  icon: TablerIcon;
  iconColor: string;
}
export interface ChartLink {
  icon: TablerIcon;
  label: string;
  iconColor: string;
  color: string;
  link: string;
  children?: Array<ChartLink>;
}

export type documentPostTypes = "chat" | "data_Visualization" | null;

export interface DocumentType {
  name: string;
  value: documentPostTypes;
  icon: TablerIcon;
}
export interface Document {
  title: string;
  info: string;
  type: string;
  avatar: string;
  updateTime: Date;
  tags?: Array<string>;
}

export const buildinColors = [
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "green",
  "lime",
  "yellow",
  "orange",
  "teal",
];

export const headerContent: HeaderSearchProps = {
  links: [
    {
      isRoute: true,
      link: "website",
      label: "此网站",
    },
  ],
  socials: [
    {
      label: "github",
      link: "https://github.com/codeclode",
      icon: IconBrandGithub,
    },
  ],
};
export const features: Array<feature> = [
  {
    title: "数据可视化",
    badgeColor: "green",
    detail: "选择合适的可视化框架进行您的可视化工作",
    buttonSrc:
      "https://www.baidu.com/s?wd=%E6%95%B0%E6%8D%AE%E5%8F%AF%E8%A7%86%E5%8C%96",
    buttonString: "百度",
    badgeDetail: "data",
    buttonColor: "red",
    icon: IconBrandBaidu,
    iconColor: "#2f37e1",
  },
  {
    title: "D3",
    badgeColor: "pink",
    detail: "最喜欢的一个",
    buttonSrc: "https://d3js.org/",
    buttonString: "D3",
    badgeDetail: "svg",
    buttonColor: "blue",
    icon: IconBrandD3,
    iconColor: "#f47e4e",
  },
  {
    title: "eCharts",
    badgeColor: "yellow",
    detail: "比较好用的一个",
    buttonSrc: "https://echarts.apache.org/zh/index.html",
    buttonString: "eCharts",
    badgeDetail: "canvas",
    buttonColor: "teal",
    icon: IconChartArcs,
    iconColor: "#ee6666",
  },
  {
    title: "threeJS",
    badgeColor: "grape",
    detail: "我不会，但是很厉害",
    buttonSrc: "https://threejs.org/",
    buttonString: "threeJS",
    badgeDetail: "webGL",
    buttonColor: "cyan",
    icon: IconBrandThreejs,
    iconColor: "#121212",
  },
  {
    title: "图表",
    badgeColor: "indigo",
    detail: "not the end",
    buttonSrc: "https://en.wikipedia.org/wiki/chart",
    buttonString: "图表",
    badgeDetail: "chart",
    buttonColor: "violet",
    icon: IconChartAreaLine,
    iconColor: "#e173b3",
  },
  {
    title: "dashBoard",
    badgeColor: "orange",
    detail: "一切都是为了它？",
    buttonSrc: "https://en.wikipedia.org/wiki/Dashboard",
    buttonString: "仪表盘",
    badgeDetail: "visualization",
    buttonColor: "lime",
    icon: IconDashboard,
    iconColor: "#73b3e1",
  },
];
export const charts: Array<ChartLink> = [
  {
    icon: IconChartArcs,
    label: "饼图",
    iconColor: "teal",
    color: "teal",
    link: "arc",
  },
];

export const documentTypes: Array<DocumentType> = [
  {
    name: "全部",
    value: null,
    icon: IconCircles,
  },
  {
    name: "可视化",
    value: "data_Visualization",
    icon: IconChartBar,
  },
  {
    name: "杂谈",
    value: "chat",
    icon: IconBrandHipchat,
  },
];
