import { EventController } from "../controllers/event.controller";
import * as cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
};

export class Routes {
  public eventController: EventController = new EventController();

  public routes(app): void {
    app
      .route("/api/event/getFilteredList")
      .get(this.eventController.getFilteredList, cors(corsOptions))
      .post(this.eventController.create, cors(corsOptions));

    app
      .route("/api/event/getList")
      .get(this.eventController.getList, cors(corsOptions));

    app
      .route("/api/event/getEvent/:id")
      .get(this.eventController.getEvent, cors(corsOptions))

    app
      .route("/api/event/createEvent")
      .post(this.eventController.createEvent, cors(corsOptions));

    app
      .route("/api/event/updateEvent/:id")
      .post(this.eventController.updateEvent, cors(corsOptions));
  }
}
