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
      .route("/api/event/:id")
      .get(this.eventController.show, cors(corsOptions))
      .put(this.eventController.update, cors(corsOptions))
      .delete(this.eventController.delete, cors(corsOptions));
  }
}
