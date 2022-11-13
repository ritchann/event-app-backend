import { Request, Response } from "express";
import {
  PersonalСategory,
  Category,
  GoWith,
  DayEvent,
  TimeType,
} from "../models/enums";
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

function getTime(value) {
  var hm = value;
  var str = hm.split(":");
  var seconds = +str[0] * 60 * 60 + +str[1] * 60;
  return seconds / 60;
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
    const { plan, goWith, day, time, city } = req.body;
    const planList = plan as number[];
    const goWithVar = parseInt(goWith);
    const dayVar = parseInt(day);
    const timeVar = parseInt(time);
    const isAllCity = city == "all";

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
    if (!isAllCity) whereObj["city"] = city;
    Event.findAll<Event>({
      where: whereObj as WhereOptions,
    })
      .then((events: Array<Event>) => {
        let result: Event[] = [];
        const list = events;
        if (dayVar == DayEvent.Today) {
          const now = DateTime.format(new Date(), "date");
          list.forEach((item) => {
            if (item.date == now) result.push(item);
          });
        } else if (dayVar == DayEvent.Weekends) {
          var curr = new Date();
          var sun = new Date(curr.setDate(curr.getDate() - curr.getDay()));
          var sut = DateTime.addDays(sun, -1);
          const listDates: string[] = [
            DateTime.format(sun, "date"),
            DateTime.format(sut, "date"),
          ];
          list.forEach((item) => {
            if (listDates.includes(item.date)) result.push(item);
          });
        } else if (dayVar == DayEvent.Week) {
          let now = new Date();
          const listDates: string[] = [];
          while (now.getDay() != 1) {
            listDates.push(DateTime.format(now, "date"));
            now = DateTime.addDays(now, 1);
          }
          list.forEach((item) => {
            if (listDates.includes(item.date)) result.push(item);
          });
        }
        
        if (timeVar == TimeType.Morning)
          result = result.filter(
            (item) => getTime(item.time) >= 360 && getTime(item.time) < 720
          );

        if (timeVar == TimeType.Day)
          result = result.filter(
            (item) => getTime(item.time) >= 720 && getTime(item.time) < 1080
          );

        if (timeVar == TimeType.Afternoon)
          result = result.filter(
            (item) => getTime(item.time) >= 1080 && getTime(item.time) < 1440
          );

        if (timeVar == TimeType.Night)
          result = result.filter(
            (item) => getTime(item.time) >= 0 && getTime(item.time) < 360
          );

        res.json(result);
      })
      .catch((err: Error) => res.status(500).json(err));
  }
}
