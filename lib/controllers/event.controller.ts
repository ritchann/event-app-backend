import { Request, Response } from "express";
import { Сategory } from "../models/enums";
import { UpdateOptions, DestroyOptions, where, WhereOptions } from "sequelize";
import { Event, EventInterface } from "../models/event.model";

export class EventController {
  public getFilteredList(req: Request, res: Response) {
    const { city, category, date } = req.query;

    const isAllCategory = parseInt(category.toString()) == Сategory.All;
    const isAllCity = city == "all";
    var whereObj = new Object();

    if(!isAllCategory)
      whereObj['category'] = category;
      
    if(!isAllCity)
      whereObj['city'] = city;

    whereObj['date'] = date;

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
}
