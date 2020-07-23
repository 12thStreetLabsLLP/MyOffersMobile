import { LayoutItem } from "../../model/layout-item.model";

export interface AuthData extends LayoutItem {
  route: string;
}

export const data: AuthData[] = [];
