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
    TypeName: "Set",
    FoodList: [
      {
        foodName: "Singapore Chicken Rice",
        subtitle: "Oriental Set",
        imgSrc: "/assets/img/meals/chicken_rice.jpg",
        price: 0,
        shortDescription: "204 Cal\nPrice: Free\n",
        description:
          "Appetiser\n    Apple and celery salad with smoked salmon\nMain Course\n    Grilled beef fillet with balsamic onion sauce\nDessert\n    Sweet potato and orange cake\nFrom the Bakery\n    Roll and butter\nHot Beverages\n    Coffee - Tea"
      },
      {
        foodName: "Baked Rosemary Chicken with Roasted Paprika Potato",
        subtitle: "Western Set",
        imgSrc: "/assets/img/meals/baked_chicken.jpg",
        price: 0,
        shortDescription: "250 Cal\nPrice: Free\n",
        description:
          "Appetiser\n    Apple and celery salad with smoked salmon\nMain Course\n    Grilled beef fillet with balsamic onion sauce\nDessert\n    Sweet potato and orange cake\nFrom the Bakery\n    Roll and butter\nHot Beverages\n    Coffee - Tea"
      },
      {
        foodName: "Grilled Beef Tenderloin with Peppercorn Sauce",
        subtitle: "Western Set",
        imgSrc: "/assets/img/meals/grilled_beef.jpg",
        price: 0,
        shortDescription: "280 Cal\nPrice: Free\n",
        description:
          "Appetiser\n    Apple and celery salad with smoked salmon\nMain Course\n    Grilled beef fillet with balsamic onion sauce\nDessert\n    Sweet potato and orange cake\nFrom the Bakery\n    Roll and butter\nHot Beverages\n    Coffee - Tea"
      }
    ]
  },
  {
    TypeName: "Vegetable",
    FoodList: [
      {
        foodName: "Vegetable Salad",
        subtitle: "Healthy Choice",
        imgSrc: "/assets/img/meals/vegetable_salad.jpg",
        price: 3.5,
        shortDescription: "Calories: 104cal\nPrice: Free\n",
        description:
          "Appetiser\n    Apple and celery salad with smoked salmon\nMain Course\n    Grilled beef fillet with balsamic onion sauce\nDessert\n    Sweet potato and orange cake\nFrom the Bakery\n    Roll and butter\nHot Beverages\n    Coffee - Tea"
      }
    ]
  }
];
