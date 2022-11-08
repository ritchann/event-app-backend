import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class Event extends Model {
  public id!: number;
  public name!: string;
  public city!: string;
}

export interface EventInterface {
  id: number;
  name: string;
  city: string;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "event",
    sequelize: database,
    createdAt: false,
    updatedAt: false,
  }
);

Event.sync({ force: true }).then(() => {}); //true for create new table
