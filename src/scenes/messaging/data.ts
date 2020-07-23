import { LayoutItem } from "../../model/layout-item.model";

export interface MessagingData extends LayoutItem {
  route: string;
}

export const data: MessagingData[] = [];
