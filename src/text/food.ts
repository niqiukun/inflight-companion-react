export interface FoodInfo {
  foodName: string;
  subtitle: string;
  imgSrc: string;
  price: number;
  shortDescription: string;
  description: string;
}

export const FOOD_TYPES = [
  {
    typeName: "Set",
    FoodList: [
      {
        foodName: "Seafood doria",
        subtitle: "Oriental selection",
        imgSrc: "/assets/img/meals/chinese.jpg",
        price: 0,
        shortDescription: "204 Cal\nPrice: Free\n",
        description:
          "Appetiser\n    Apple and celery salad with smoked salmon\nMain Course\n    Grilled beef fillet with balsamic onion sauce\nDessert\n    Sweet potato and orange cake\nFrom the Bakery\n    Roll and butter\nHot Beverages\n    Coffee - Tea"
      },
      {
        foodName: "Beef Noodles",
        subtitle: "Set B",
        imgSrc: "/assets/img/meals/western.jpg",
        price: 0,
        shortDescription: "250 Cal\nPrice: Free",
        description:
          "Appetiser\n    Apple and celery salad with smoked salmon\nMain Course\n    Grilled beef fillet with balsamic onion sauce\nDessert\n    Sweet potato and orange cake\nFrom the Bakery\n    Roll and butter\nHot Beverages\n    Coffee - Tea"
      },
      {
        foodName: "Beef Noodles Super",
        subtitle: "Set B",
        imgSrc: "/assets/img/meals/western.jpg",
        price: 0,
        shortDescription: "280 Cal\nPrice: Free",
        description:
          "Appetiser\n    Apple and celery salad with smoked salmon\nMain Course\n    Grilled beef fillet with balsamic onion sauce\nDessert\n    Sweet potato and orange cake\nFrom the Bakery\n    Roll and butter\nHot Beverages\n    Coffee - Tea"
      }
    ]
  },
  {
    typeName: "Vegetable",
    FoodList: [
      {
        foodName: "Vegetable Salad",
        subtitle: "Healthy Choice",
        imgSrc: "/assets/img/meals/chinese.jpg",
        price: 3.5,
        shortDescription: "Calories: 104cal\nPrice: Free",
        description:
          "Appetiser\n    Apple and celery salad with smoked salmon\nMain Course\n    Grilled beef fillet with balsamic onion sauce\nDessert\n    Sweet potato and orange cake\nFrom the Bakery\n    Roll and butter\nHot Beverages\n    Coffee - Tea"
      }
    ]
  }
];
