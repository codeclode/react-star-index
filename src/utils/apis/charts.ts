import { IconChartArcs, IconChartHistogram } from "@tabler/icons";
import axios from "axios";
import { ChartLink } from "../constants";
import * as icons from "@tabler/icons";

export type TempChartLink = {
  icon: string;
  label: string;
  iconColor: string;
  color: string;
  link: string;
  children?: Array<TempChartLink>;
};

const transform = (c: Array<TempChartLink>): Array<ChartLink> => {
  return c.map(function (v: TempChartLink): ChartLink {
    let icon = icons[v.icon as keyof typeof icons] || icons.IconError404;
    return {
      icon: icon,
      iconColor: v.iconColor,
      label: v.label,
      link: v.link,
      color: v.color,
      children: v.children === undefined ? undefined : transform(v.children),
    };
  });
};

const targetUrl = "https://reace-index-charts.vercel.app/api/getCharts";
export function getCharts(): Promise<Array<ChartLink>> {
  return axios.get(targetUrl).then((res) => {
    return new Promise((resolve) => {
      resolve(transform(res.data));
    });
  });
}
