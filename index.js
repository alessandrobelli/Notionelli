const readline = require("readline");
const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");
const moment = require("moment");
const { abort } = require("process");
const { months } = require("moment");

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_WEEKS;
const databaseIdMonths = process.env.NOTION_DATABASE_MONTHS;
const databaseIdYear = process.env.DATABASE_YEARS_ID;
const iconURL = process.env.ICON;
const emoji = process.env.EMOJI;
var start = moment("2023-01-02 00:00", "YYYY-MM-DD HH:mm");
var end = moment("2023-12-31 00:00", "YYYY-MM-DD HH:mm");
let weekBefore = { id: process.env.LAST_WEEK_2021_ID };
let actualMonth = { id: "" };
let monthBefore = { id: "" };
populateDB(start, end, weekBefore);

async function populateDB(start, end, weekBefore) {
  let i = 1;
  for (var m = moment(start); m.isBefore(end); m.add(7, "days")) {
    monthBefore = await getMonth(m.format("MMMM"), m.format("YYYY"), m.clone());
    actualMonth = await getMonth(
      m.clone().add(6, "d").format("MMMM"),
      m.clone().add(6, "d").format("YYYY"),
      m.clone().add(6, "d")
    );
    weekBefore = await fillWeeks(
      m,
      weekBefore.id,
      monthBefore.results[0],
      actualMonth.results[0]
    );
    console.log("Filling week " + i + " of " + m.format("MMMM") + " ...");
    if (m.format("MMM") === m.clone().add(6, "d").format("MMM")) i++;
    else i = 1;
  }
}

async function fillWeeks(momentName, weekBefore, monthBefore, actualMonth) {
  let createWeekPage = {};
  createWeekPage.parent = {
    database_id: databaseId,
  };
  if (iconURL !== "") {
    createWeekPage.icon = {
      type: "external",
      external: {
        url: iconURL,
      },
    };
  } else if (emoji !== "") {
    createWeekPage.icon = {
      emoji: emoji,
    };
  }

  createWeekPage.properties = {
    Name: {
      title: [
        {
          text: {
            content:
              momentName.format("MMM") ===
              momentName.clone().add(6, "d").format("MMM")
                ? momentName.format("D") +
                  " - " +
                  momentName.clone().add(6, "d").format("D") +
                  " " +
                  momentName.clone().add(6, "d").format("MMM")
                : momentName.format("D") +
                  " " +
                  momentName.format("MMM") +
                  " - " +
                  momentName.clone().add(6, "d").format("D") +
                  " " +
                  momentName.clone().add(6, "d").format("MMM"),
          },
        },
      ],
    },
    [process.env.DATES_NAME]: {
      date: {
        start: momentName.toISOString(true),
        end: momentName.clone().add(6, "d").toISOString(true),
      },
    },
    [process.env.MONTH_NAME]: {
      relation: [
        {
          id: monthBefore.id,
        },
        {
          id: actualMonth.id,
        },
      ],
    },
  };

  if (process.env.WEEK_BEFORE_NAME !== "") {
    createWeekPage.properties[process.env.WEEK_BEFORE_NAME] = {
      relation: [
        {
          id: weekBefore,
        },
      ],
    };
  }

  return await notion.pages.create(createWeekPage);
}

async function getMonth(monthName, year, momentName) {
  const databaseIdM = databaseIdMonths;
  const databaseIdY = databaseIdYear;
  let month = await notion.databases.query({
    database_id: databaseIdM,
    filter: {
      property: "Name",
      text: {
        contains: monthName + " " + year,
      },
    },
  });
  let yearArray = await notion.databases.query({
    database_id: databaseIdY,
    filter: {
      property: "Name",
      text: {
        contains: year.toString(),
      },
    },
  });

  let objectMonth = {
    parent: {
      database_id: databaseIdMonths,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: monthName + " " + year,
            },
          },
        ],
      },
      [process.env.DATES_NAME]: {
        date: {
          start: momentName.startOf("month").toISOString(true),
          end: momentName.endOf("month").toISOString(true),
        },
      },
    },
  };
  if (process.env.YEAR_NAME !== "") {
    objectMonth.properties[process.env.YEAR_NAME] = {
      relation: [
        {
          id: yearArray.results[0].id,
        },
      ],
    };
  }

  if (month.results.length === 0) {
    month.results.push(await notion.pages.create(objectMonth));
  }

  return month;
}
