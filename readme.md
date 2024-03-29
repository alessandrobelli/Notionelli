# PREFILL YOUR WEEK DATABASE 🗓️

Use this to create your week and months pages in your Notion database.
This is meant to fill the calendar for you to just create the daily pages.


## Requirements
- [Node Js](https://nodejs.org/it/) installed in your computer.
- [Create a Notion Integration](https://www.notion.so/my-integrations)
- Your Year database *must* have next year already created.
- You don't need to have the months created in advance, the script will create them for you.
- Create a .env file, or use the empty copy provided, customizing the following 
  - NOTION_DATABASE_WEEKS* : the id of your empty weeks database
  - NOTION_DATABASE_MONTHS* : the id of your months database
  - NOTION_KEY* : your notion secret
  - ICON : the url of the icon you want to use
  - LAST_WEEK_2021_ID : the last week of 2021
  - DATES_NAME* : the name of the dates property in your week and month database
  - WEEK_BEFORE_NAME : the name of the "week before" property in your week database - not mondatory
  - MONTH_NAME* : the name of the month property in your week database
  - EMOJI : the emoji you want to use in the week database. ICON must be empty for this to work.
  - YEAR_NAME: the name of the year property in your month database
  - DATABASE_YEARS_ID: the id of your years database
- Months database with prefilled months in the format "Month name + year" (January 2023). The script tries to create missing months and attached it to the next year. You need to create the year in advance.
- Weeks database with the following properties:
  - `dates` with the type date
  - `month` as a relationship to your month database
  - `week before` as a relationship to the week database itself

\* MANDATORY

## Usage
- open terminal on macOS or power-shell on Windows.
- `npm install`
- `npm start` will work if everything is setup correctly. You'll start to see the weeks popup! ✨

## Security

If you discover any security related issues, please email alessandrobelli90@gmail.com instead of using the issue tracker.

## Credits

- [Alessandro Belli](https://github.com/AlessandroBelli)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
