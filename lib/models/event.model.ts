import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";
const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

export class Event extends Model {
  id!: number;
  header!: string;
  city!: string;
  description!: string;
  date!: string;
  category!: number;
  time!: string;
  language!: number;
  address!: string;
  isPaid!: boolean;
  paymentInformation!: string;
  status!: number;
  duration!: string;
}

export interface EventInterface {
  id: number;
  header: string;
  city: string;
  description: string;
  date: string;
  category: number;
  time: string;
  language: number;
  address: string;
  isPaid: boolean;
  paymentInformation: string;
  status: number;
  duration: string;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    header: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING(1000),
    },
    date: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.INTEGER,
    },
    time: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
    },
    paymentInformation: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    duration: {
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

async function createEvent() {
  await Event.create({
    header: "ART PARTY",
    city: "Budva",
    description: `We offer a stylish and creative way to spend the weekend 😎
    Program:
    🔥 You will have 3 hours of creative reboot in the PERLA restaurant , a cozy company , gifts from us 🎁
    🔥 Professional canvases , all materials , inventory , creative paintings !
    🔥 A glass of wine and snacks from the restaurant !
    🔥 Professional photographer !
    📍Cost 55 €, all inclusive ! 
    📍Experience and skills are not needed , everyone can handle it ! We have a large selection of different paintings for you 👌
    
    WAITING FOR YOU 🥳`,
    date: "11/16/2022",
    category: 3,
    time: "13:00",
    language: 0,
    address: "PERLA Restaurant (Mediteranska, Budva)",
    isPaid: true,
    paymentInformation: "55€",
    status: 2,
    duration: "3",
  });

  await Event.create({
    header: "Ethnic music",
    city: "Budva",
    description: `Ethnic music performed by the virtuoso performer Vladislav Romanovsky. We are waiting for you at the restaurant Atelier.`,
    date: "11/15/2022",
    category: 0,
    time: "20:00",
    language: 0,
    address: "Zrtva Fasizma 13",
    isPaid: false,
    paymentInformation: "",
    status: 2,
    duration: "2",
  });

  await Event.create({
    header: `Exhibition "Reverse Illusion"`,
    city: "Bečići",
    description: `The exhibition "Reverse Illusion" will give you the opportunity to look through the photos, finding something new and unusual for yourself.
    Beginning at 17:00
    It is not possible to "see" such works right away — here it is necessary to look into the details and independently collect the overall picture of each frame. All photos are taken on film used twice — this is how the overlay effect is created.
    📸We invite you for new experiences, acquaintance and communication in a cultural environment.
    After the opening of the exhibition, a film screening will begin at 19:00. The title of the film is still kept secret. We will reveal the details closer to the weekend!`,
    date: "11/15/2022",
    category: 4,
    time: "17:00",
    language: 0,
    address: "2 Narodnog Fronta",
    isPaid: false,
    paymentInformation: "",
    status: 2,
    duration: "4",
  });

  await Event.create({
    header: `Playing Mafia`,
    city: "Budva",
    description: `We have a lot of fun😍😍😍`,
    date: "11/15/2022",
    category: 2,
    time: "18:00",
    language: 0,
    address: "Donji Bulevar bb, Tre Canne",
    isPaid: false,
    paymentInformation: "",
    status: 2,
    duration: "2",
  });

  await Event.create({
    header: `A performance in the genre of "baby theater" called "Sea Story"`,
    city: "Budva",
    description: `This is a special genre for special viewers. The child, it is at this age (1-3 years), meets for the first time with such an art form as theater.
    Performances of the "baby theater" genre take place with a minimum of words, so the audience is not limited by any language barriers and what is happening on stage is clear to all children.`,
    date: "11/15/2022",
    category: 1,
    time: "10:00",
    language: 0,
    address: "Dukley Gardens, Hotel Harmonia by Dukley",
    isPaid: true,
    paymentInformation: "10€ (child + adult)",
    status: 2,
    duration: "2",
  });

  await Event.create({
    header: `🎨Art evening "Paul Cezanne: Dialogue of Space and Form"`,
    city: "Herceg Novi",
    description: `Dear friends, we are pleased to invite you to the next chamber lecture on November 18. We meet over a glass, get acquainted, communicate and get inspired by the beautiful
    Let's talk about the life and work of Cezanne, a serious analyst, a subtle poet and a reformer of painting.
    At the evening we will discuss:
    🎨 Why did Matisse and Picasso call him the father of modern art?
    How did Cezanne change painting?
    🎨Why was post-impressionism NOT after Impressionism?
    🎓 Speaker: Sofia Aksenova- art critic, graduate of Moscow State University, researcher at the Tretyakov Gallery
    (We treat all guests with a glass of wine)`,
    date: "11/18/2022",
    category: 9,
    time: "18:00",
    language: 0,
    address: "Restaurant  Gradska Kafana, Njegoševa 31",
    isPaid: true,
    paymentInformation: "15€",
    status: 2,
    duration: "2",
  });

  await Event.create({
    header: `🎨Art lecture "Henri Matisse: the power of color"`,
    city: "Herceg Novi",
    description: `On November 14, we invite you to an atmospheric lecture over a glass of wine 🍷  at the Jadran restaurant
    At the lecture we will discuss:
    🎨What is Fauvism and why did Matisse's painting change the art of the twentieth century?
    🎨How love stories and Matisse's work are connected.
    🎨Why did lawyer Matisse decide to change his profession?
    🎓Speaker: Sofya Aksenova -art critic, graduate of Moscow State University, researcher at the Tretyakov Gallery
    (We treat all guests with drinks of their choice)`,
    date: "11/14/2022",
    category: 9,
    time: "19:00",
    language: 0,
    address: "Restaurant Jadran, Njegoševa 31",
    isPaid: true,
    paymentInformation: "15€",
    status: 2,
    duration: "2",
  });

  await Event.create({
    header: `Autumn tour to the mountains of Durmitor`,
    city: "Podgorica",
    description: `We are going to the Mountains to enjoy the golden autumn, in a comfortable minibus, with a professional photographer, and therefore photo shoots! We are waiting for the incredible beauty of the Durmitor National Park with a visit to interesting places along the way: the canyon of the Moraca River, the Djurdjevic Bridge, Zabljak, Black Lake, Cape Churevac, and of course the most amazing mountain road to the Beer Lake, which takes your breath away.
    The tour includes:
    
    🏞️ Visiting amazing places
    🏡 Accommodation in a cozy house with mountain views
    🥭 Healthy breakfasts
    📸 Photo and video shooting for tour participants and memorable shots from the trip.
    
    Details and entry: @vital_travel`,
    date: "11/19/2022",
    category: 7,
    time: "09:00",
    language: 0,
    address: "",
    isPaid: true,
    paymentInformation:
      "100€ for 3 days of adventure. Children get a discount.",
    status: 2,
    duration: "9",
  });

  await Event.create({
    header: `Culinary Heritage Market`,
    city: "Tivat",
    description: `A Culinary Heritage Market dedicated to the promotion of traditional dishes of the Bay of Kotor will be held.`,
    date: "11/14/2022",
    category: 5,
    time: "18:00",
    language: 2,
    address: "Pine embankment",
    isPaid: false,
    paymentInformation: "",
    status: 2,
    duration: "3",
  });

  await Event.create({
    header: `Valentino DeVasco Concert`,
    city: "Herceg Novi",
    description: `Don't miss the last Valentino Devasko concert in Herceg Novi this year!
    Live Latin American music and dancing on Saturday 18.10 at Kontra caffe bar`,
    date: "11/18/2022",
    category: 2,
    time: "21:30",
    language: 1,
    address: "Kontra Caffe Bar",
    isPaid: false,
    paymentInformation: "",
    status: 2,
    duration: "2",
  });

  await Event.create({
    header: `The musical “San o Boki"`,
    city: "Podgorica ",
    description: `The premiere of the musical "San o Boki" on the big stage of the cultural center "Budo Tomović".

    Musical in four acts, 24 actors, orchestra. The plot unfolds on the terraces and in the halls of the Boca Hotel.`,
    date: "11/20/2022",
    category: 4,
    time: "20:00",
    language: 2,
    address: `Cultural Center "Budo Tomović"`,
    isPaid: true,
    paymentInformation: "10€",
    status: 2,
    duration: "2",
  });

  await Event.create({
    header: `Flute concert at the Museum of Modern Art`,
    city: "Podgorica ",
    description: `The flute ensemble from Trieste, Trieste Flute Ensemble, will present the premiere concert.

    The ensemble has been in existence since 2005 and is one of the first professional flute ensembles in Europe.  The concert program includes works by authors from different parts of the world.`,
    date: "11/25/2022",
    category: 0,
    time: "18:00",
    language: 1,
    address: `Gallery "Moderna", 4 Marka Miljanova`,
    isPaid: true,
    paymentInformation: "10€",
    status: 2,
    duration: "2",
  });

  await Event.create({
    header: `Rock Saturday`,
    city: "Podgorica ",
    description: `Rock Saturday in Podgorica 🤘🤘🤘

    Nikolaj Vrankovic from Belgrade and the Montenegrin band Autogeni trening will perform.`,
    date: "11/25/2022",
    category: 0,
    time: "20:00",
    language: 1,
    address: `Kolektor`,
    isPaid: true,
    paymentInformation:
      "Tickets from 10€, sold at the Ithaca Bar until Saturday.",
    status: 1,
    duration: "2",
  });

  await Event.create({
    header: `Rakia Festival`,
    city: "Podgorica ",
    description: `120 producers from Montenegro and neighboring countries will present their alcoholic beverages.`,
    date: "12/04/2022",
    category: 5,
    time: "18:00",
    language: 2,
    address: `In the lobby of the Capital Plaza Hotel`,
    isPaid: false,
    paymentInformation: "",
    status: 0,
    duration: "3",
  });
}

async function createEventFromCSV() {
  const list: EventInterface[] = [];
  fs.createReadStream('/app/lib/events.csv')
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", async function (row) {
      await Event.create({
        description: row[1],
        city: row[2],
        category: row[3],
        paymentInformation: row[4],
        isPaid: row[5],
        date: row[6],
        time: row[7],
        language: 2,
        header: "",
        address: "",
        status: 2,
        duration: "2",
        id: 0,
      });
    });
  console.log(list)
  list.forEach(async (x) => {
    await Event.create(x);
  });
}

(async () => {
  await Event.sync({ force: false }).then(() => {});
  //await createEvent();
  await createEventFromCSV();
})();
