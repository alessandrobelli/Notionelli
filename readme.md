# PREFILL YOUR WEEK DATABASE 🗓️

Use this to create your week pages in your Notion database.

## Requirements
- Node JS installed in your computer.
- Create a Notion Extension
- Create a .env file with the following 
  - NOTION_DATABASE_WEEKS
  - NOTION_DATABASE_MONTHS
  - NOTION_KEY
  - ICON
  - LAST_WEEK_2021_ID
  - DATES_NAME
  - WEEK_BEFORE_NAME
  - MONTH_NAME
- Month database with prefilled months in the format "Month name + year" (January 2022)
- Week database with the following properties:
  - dates with the type date
  - month as a relationship to your month database
  - week before as a relationship to the week database itself
