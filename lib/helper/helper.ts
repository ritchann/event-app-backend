import { PlanItem } from "../controllers/event.controller";
import { PersonalСategory, Category, GoWith } from "../models/enums";

export const categoriesPlan: PlanItem[] = [
  { type: PersonalСategory.Dance, list: [Category.Concert, Category.Party] },
  {
    type: PersonalСategory.HangOut,
    list: [Category.Concert, Category.Party, Category.FestivalMarket],
  },
  {
    type: PersonalСategory.TakeWalk,
    list: [Category.FestivalMarket, Category.Trip],
  },
  {
    type: PersonalСategory.ChillOut,
    list: [
      Category.Concert,
      Category.Workshop,
      Category.Art,
      Category.FoodDrinks,
    ],
  },
  {
    type: PersonalСategory.TeamBuilding,
    list: [Category.Party, Category.Workshop, Category.FoodDrinks],
  },
  {
    type: PersonalСategory.LearnNew,
    list: [Category.Workshop, Category.Art, Category.Lecture],
  },
  {
    type: PersonalСategory.Drink,
    list: [Category.Party, Category.FestivalMarket, Category.FoodDrinks],
  },
  {
    type: PersonalСategory.Eat,
    list: [Category.Party, Category.FestivalMarket, Category.FoodDrinks],
  },
  {
    type: PersonalСategory.ForChildren,
    list: [Category.ForChildren],
  },
  {
    type: PersonalСategory.Sing,
    list: [Category.Concert, Category.Party],
  },
  {
    type: PersonalСategory.CelebrateBirthday,
    list: [Category.Party, Category.FoodDrinks],
  },
  {
    type: PersonalСategory.Laugh,
    list: [Category.StandUp],
  },
];

export const goWithList: { type: Category; list: GoWith[] }[] = [
  {
    type: Category.Concert,
    list: [GoWith.MyCouple, GoWith.Friends],
  },
  {
    type: Category.ForChildren,
    list: [GoWith.Family],
  },
  {
    type: Category.Party,
    list: [GoWith.MyCouple, GoWith.Friends],
  },
  {
    type: Category.Workshop,
    list: [GoWith.Myself, GoWith.MyCouple, GoWith.Friends, GoWith.Family],
  },
  {
    type: Category.Art,
    list: [GoWith.Myself, GoWith.MyCouple, GoWith.Friends, GoWith.Family],
  },
  {
    type: Category.FestivalMarket,
    list: [GoWith.Myself, GoWith.MyCouple, GoWith.Friends],
  },
  {
    type: Category.FoodDrinks,
    list: [GoWith.MyCouple, GoWith.Friends],
  },
  {
    type: Category.Trip,
    list: [GoWith.MyCouple, GoWith.Friends, GoWith.Family],
  },
  {
    type: Category.StandUp,
    list: [GoWith.MyCouple, GoWith.Friends],
  },
  {
    type: Category.Lecture,
    list: [GoWith.Myself, GoWith.MyCouple, GoWith.Friends],
  },
];
