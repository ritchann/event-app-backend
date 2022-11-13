import { Request, Response } from "express";
import { PersonalСategory, Category, GoWith, DayEvent } from "../models/enums";
import {
  UpdateOptions,
  DestroyOptions,
  where,
  WhereOptions,
  Op,
} from "sequelize";
import { Event, EventInterface } from "../models/event.model";
import { categoriesPlan, goWithList } from "../helper/helper";
import { DateTime } from "../helper/dateTime";

export interface PlanItem {
  type: PersonalСategory;
  list: Category[];
}

export interface PersonalInfo {
  plan: number[];
  day: number;
  goWith: GoWith;
  time: number;
  city: string;
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export class EventController {
  public getFilteredList(req: Request, res: Response) {
    const { city, category, date } = req.query;

    const isAllCategory = parseInt(category.toString()) == Category.All;
    const isAllCity = city == "all";
    var whereObj = new Object();

    if (!isAllCategory) whereObj["category"] = category;

    if (!isAllCity) whereObj["city"] = city;

    whereObj["date"] = date;

    Event.findAll<Event>({
      where: whereObj as WhereOptions,
    })
      .then((events: Array<Event>) => res.json(events))
      .catch((err: Error) => res.status(500).json(err));
  }

  public getList(req: Request, res: Response) {
    Event.findAll<Event>({})
      .then((events: Array<Event>) => res.json(events))
      .catch((err: Error) => res.status(500).json(err));
  }

  public create(req: Request, res?: Response) {
    const params: EventInterface = req.body;

    Event.create<Event>(params)
      .then((events: Event) => res.status(201).json(events))
      .catch((err: Error) => res.status(500).json(err));
  }

  public getEvent(req: Request, res: Response) {
    const eventId: number = parseInt(req.params.id);

    Event.findByPk<Event>(eventId)
      .then((event: Event | null) => {
        if (event) res.json(event);
        else res.status(404).json({ errors: ["Event not found"] });
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public createEvent(req: Request, res: Response) {
    const params: EventInterface = req.body;
    Event.create(params)
      .then(() => res.status(202).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public updateEvent(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const params: EventInterface = req.body;
    const options: UpdateOptions = {
      where: { id },
      limit: 1,
    };

    Event.update(params, options)
      .then(() => res.status(202).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public delete(req: Request, res: Response) {
    const eventId: number = parseInt(req.params.id);
    const options: DestroyOptions = {
      where: { id: eventId },
      limit: 1,
    };

    Event.destroy(options)
      .then(() => res.status(204).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public getPersonalList(req: Request, res: Response) {
    const { plan, goWith, day } = req.body;
    const planList = plan as number[];
    const goWithVar = parseInt(goWith);
    const dayVar = parseInt(day);
    const isAnywhere = planList.includes(PersonalСategory.Anywhere);
    const mainCategoryOptions = [];
    var whereObj = new Object();

    const result: Category[] = [];
    if (!isAnywhere) {
      let mainCategory: Category[] = [];
      categoriesPlan.forEach((item) => {
        if (planList.includes(item.type))
          mainCategory = [...mainCategory, ...item.list];
      });
      mainCategory = mainCategory.filter(onlyUnique);
      goWithList.forEach((item) => {
        if (mainCategory.includes(item.type))
          if (item.list.includes(goWithVar)) result.push(item.type);
      });
      mainCategory = result;
      mainCategory.forEach((item) =>
        mainCategoryOptions.push(new Object({ category: item }))
      );
      whereObj = { [Op.or]: mainCategoryOptions };
    }

    Event.findAll<Event>({
      where: whereObj as WhereOptions,
    })
      .then((events: Array<Event>) => {
        const result: Event[] = [];
        const list = events;
        if (dayVar == DayEvent.Today) {
          const now = DateTime.format(new Date(), "date");
          list.forEach((item) => {
            if (item.date == now) result.push(item);
          });
          res.json(result);
        } else res.json(events);
      })
      .catch((err: Error) => res.status(500).json(err));
  }
}
