import { ImageSourcePropType } from "react-native";

export class Product {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly price: ProductPrice,
    readonly primaryImage: ImageSourcePropType,
    readonly images: ImageSourcePropType[],
    readonly details: string[],
    readonly options: ProductOption[]
  ) {}

  static centralParkApartment(): Product {
    return new Product(
      "Josco offer",
      "description comes here...",
      ProductPrice.tenDollarsPerNight(),
      require("../assets/image-product.jpg"),
      [
        require("../assets/image-product.jpg"),
        require("../assets/image-product.jpg"),
        require("../assets/image-product.jpg"),
      ],
      ["2 Guests", "2 Bad", "2 Bath"],
      [
        ProductOption.wifiOption(),
        ProductOption.tvOption(),
        ProductOption.parkingOption(),
      ]
    );
  }
}

export class ProductPrice {
  constructor(
    readonly value: string,
    readonly currency: string,
    readonly scale: string
  ) {}

  get formattedValue(): string {
    return `${this.currency}${this.value}`;
  }

  get formattedScale(): string {
    return `/${this.scale}`;
  }

  static tenDollarsPerNight(): ProductPrice {
    return new ProductPrice("FUNJOSCO", "", "night");
  }
}

export class ProductOption {
  constructor(readonly icon: string, readonly title: string) {}

  static wifiOption(): ProductOption {
    return new ProductOption("wifi", "Wi-Fi");
  }

  static tvOption(): ProductOption {
    return new ProductOption("tv", "TV");
  }

  static parkingOption(): ProductOption {
    return new ProductOption("car", "Free Parking");
  }
}
