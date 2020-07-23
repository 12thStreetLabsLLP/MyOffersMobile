import { LayoutItem } from "../../model/layout-item.model";

export interface DashboardData extends LayoutItem {
  route: string;
}

export const data: DashboardData[] = [];
