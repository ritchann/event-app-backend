import { Request, Response } from "express";
import { UpdateOptions, DestroyOptions } from "sequelize";
import { Event, EventInterface } from "../models/event.model";

export class EventController {
  public getFilteredList(req: Request, res: Response) {
    const { city, category, date } = req.query;
    Event.findAll<Event>({
      where: { city: city, category: category, date: date },
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

  public show(req: Request, res: Response) {
    const eventId: number = parseInt(req.params.id);

    Event.findByPk<Event>(eventId)
      .then((event: Event | null) => {
        if (event) res.json(event);
        else res.status(404).json({ errors: ["Event not found"] });
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public update(req: Request, res: Response) {
    const eventId: number = parseInt(req.params.id);
    const params: EventInterface = req.body;

    const update: UpdateOptions = {
      where: { id: eventId },
      limit: 1,
    };

    Event.update(params, update)
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
