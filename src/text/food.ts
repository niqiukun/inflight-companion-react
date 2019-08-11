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
    TypeName: "Meals",
    FoodList: [
      {
        foodName: "Singapore Chicken Rice",
        subtitle: "Oriental Set",
        imgSrc: "/assets/img/meals/chicken_rice.jpg",
        price: 0,
        shortDescription: "204 Cal\nFree\n",
        description:
          "Content:\n" +
          "Appetiser\n    Selection of Singapore-style appetiser\n" +
          "Main Course\n    Singapore signature chicken rice\n" +
          "Dessert\n    Sweet potato and orange cake\n" +
          "From the Bakery\n    Roll and butter\n" +
          "Hot Beverage\n    Green tea\n" +
          "Cold Beverage\n    Oolong tea"
      },
      {
        foodName: "Baked Rosemary Chicken",
        subtitle: "Western Set",
        imgSrc: "/assets/img/meals/baked_chicken.jpg",
        price: 0,
        shortDescription: "250 Cal\nFree\n",
        description:
          "Content:\n" +
          "Appetiser\n    Apple and celery salad with smoked salmon\n" +
          "Main Course\n    Baked rosemary chicken with roasted paprika potato\n" +
          "Dessert\n    Sweet potato and orange cake\n" +
          "From the Bakery\n    Roll and butter\n" +
          "Hot Beverages\n    Coffee - Tea"
      },
      {
        foodName: "Grilled Beef Tenderloin",
        subtitle: "Western Set",
        imgSrc: "/assets/img/meals/grilled_beef.jpg",
        price: 0,
        shortDescription: "280 Cal\nFree\n",
        description:
          "Content:\n" +
          "Appetiser\n    Apple and celery salad with smoked salmon\n" +
          "Main Course\n    Grilled beef tenderloin with peppercorn sauce\n" +
          "Dessert\n    Sweet potato and orange cake\n" +
          "From the Bakery\n    Roll and butter\n" +
          "Hot Beverages\n    Coffee - Tea"
      }
    ]
  },
  {
    TypeName: "Vegetables",
    FoodList: [
      {
        foodName: "Vegetable Salad",
        subtitle: "Healthier Choice",
        imgSrc: "/assets/img/meals/vegetable_salad.jpg",
        price: 3.5,
        shortDescription: "104 Cal\nSGD 3.50\n",
        description: ""
      }
    ]
  },
  {
    TypeName: "Snacks",
    FoodList: [
      {
        foodName: "Häagen-Dazs (Caramel Cone)",
        subtitle: "Ice Cream",
        imgSrc: "/assets/img/meals/ice_cream.jpg",
        price: 6,
        shortDescription: "280 Cal\nSGD 6.00\n",
        description:
          "Ingredients: cream, skim milk, strawberries, sugar, egg yolks"
      }
    ]
  }
];
