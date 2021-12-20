const readline = require("readline");
const { Client } = require("@notionhq/client")
const dotenv = require("dotenv")
const moment = require("moment");

dotenv.config()

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_WEEKS
const databaseIdMonths = process.env.NOTION_DATABASE_MONTHS
const iconToAdd = process.env.ICON
var start = moment('2022-01-03 00:00', "YYYY-MM-DD HH:mm");
var end = moment('2022-12-31 00:00', "YYYY-MM-DD HH:mm");
let weekBefore = { "id": process.env.LAST_WEEK_2021_ID }
let actualMonth = { "id": "" };
let monthBefore = { "id": "" };
populateDB(start, end, weekBefore);

async function populateDB(start, end, weekBefore) {

  for (var m = moment(start); m.isBefore(end); m.add(7, 'days')) {
    monthBefore = await getMonth(m.format("MMMM"), m.format("YYYY"));
    actualMonth = await getMonth(m.clone().add(6, 'd').format("MMMM"), m.clone().add(6, 'd').format("YYYY"));
    weekBefore = await fillWeeks(m, weekBefore.id, monthBefore.results[0], actualMonth.results[0]);
    console.log("Filling " + m.format("MMMM") + " ...")
  }



}

async function fillWeeks(momentName, weekBefore, monthBefore, actualMonth) {
  return await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    icon: {
      type: "external",
      external: {
        url: iconToAdd
      }
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: (momentName.format("MMM") === momentName.clone().add(6, 'd').format("MMM")) ? momentName.format('D') + " - " + momentName.clone().add(6, 'd').format('D') + " " + momentName.clone().add(6, 'd').format("MMM") : momentName.format('D') + " " + momentName.format("MMM") + " - " + momentName.clone().add(6, 'd').format('D') + " " + momentName.clone().add(6, 'd').format("MMM"),
            },
          },
        ],
      },
      [process.env.DATES_NAME]: {
        date:
        {
          "start": momentName.toISOString(true),
          "end": momentName.clone().add(6, 'd').toISOString(true)
        },

      },
      [process.env.WEEK_BEFORE_NAME]: {
        relation: [{
          "id": weekBefore
        }]

      },
      [process.env.MONTH_NAME]: {
        relation: [{
          "id": monthBefore.id
        }, {
          "id": actualMonth.id
        }]
      }
    },
    children: [],
  });
}

async function getMonth(monthName, year) {
  const databaseId = databaseIdMonths;
  return await notion.databases.query({
    database_id: databaseId,
    filter: {
      "property": "Name",
      "text": {
        "contains": monthName + " " + year
      }
    }
  });
}