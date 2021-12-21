# PREFILL YOUR WEEK DATABASE 🗓️

Use this to create your week pages in your Notion database.

## Requirements
- [Node Js](https://nodejs.org/it/) installed in your computer.
- [Create a Notion Integration](https://www.notion.so/my-integrations)
- Create a .env file, or use the empty copy provided, customizing the following 
  - NOTION_DATABASE_WEEKS
  - NOTION_DATABASE_MONTHS
  - NOTION_KEY
  - ICON
  - LAST_WEEK_2021_ID
  - DATES_NAME
  - WEEK_BEFORE_NAME
  - MONTH_NAME
- Months database with prefilled months in the format "Month name + year" (January 2022) - creating missing months coming soon!
- Weeks database with the following properties:
  - `dates` with the type date
  - `month` as a relationship to your month database
  - `week before` as a relationship to the week database itself

## Usage
- open terminal on macOS or power-shell on Windows.
- `npm install`
- `npm start` will work if everything is setup correctly. You'll start to see the weeks popup! ✨
