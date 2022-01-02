# PREFILL YOUR WEEK DATABASE 🗓️

Use this to create your week pages in your Notion database.


## Requirements
- [Node Js](https://nodejs.org/it/) installed in your computer.
- [Create a Notion Integration](https://www.notion.so/my-integrations)
- Create a .env file, or use the empty copy provided, customizing the following 
  - NOTION_DATABASE_WEEKS* : the id of your empty weeks database
  - NOTION_DATABASE_MONTHS* : the id of your months database
  - NOTION_KEY* : your notion secret
  - ICON : the url of the icon you want to use
  - LAST_WEEK_2021_ID : the last week of 2021
  - DATES_NAME* : the name of the dates property in your week database
  - WEEK_BEFORE_NAME : the name of the "week before" property in your week database
  - MONTH_NAME* : the name of the month property in your week database
- Months database with prefilled months in the format "Month name + year" (January 2022) - creating missing months coming soon!
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
