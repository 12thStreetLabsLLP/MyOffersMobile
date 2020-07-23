import { LayoutItem } from "../../model/layout-item.model";

export interface EcommerceData extends LayoutItem {
  route: string;
}

export const data: EcommerceData[] = [];
