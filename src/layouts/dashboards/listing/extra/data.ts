import { ImageSourcePropType } from "react-native";

export class Training {
  constructor(
    readonly title: string,
    readonly duration: number,
    readonly kcal: number,
    readonly image: ImageSourcePropType,
    readonly description: string,
    readonly location: string,
    readonly code: string
  ) {}

  get formattedDuration(): string {
    const hours: number = Math.floor(this.duration / 60);
    const minutes: number = this.duration % 60;

    return `${hours}:${minutes} min`;
  }

  get formattedKcal(): string {
    return `${this.kcal} kcal`;
  }

  static code1(): Training {
    return new Training(
      "Josco Coupon Code",
      30,
      150,
      require("../assets/image-training-1.jpg"),
      "Great offers going on...",
      "Trivandrum",
      "FUNCODE"
    );
  }

  static code2(): Training {
    return new Training(
      "Josco Coupon Code",
      30,
      150,
      require("../assets/image-training-1.jpg"),
      "Great offers going on...",
      "Trivandrum",
      "FUNCODE"
    );
  }
}
