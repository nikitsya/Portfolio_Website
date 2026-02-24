# Portfolio Starter

Simple portfolio starter with a soft pastel style, project cards, and an editable timetable page.

## Run locally

1. Open `/Users/nikitsya/Desktop/Nikitsya/index.html` in your browser.
2. Or run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Structure

- `index.html`: home, project cards, selected project details, and contact.
- `timetable.html`: separate editable timetable page.
- `opticube.html`: OptiCube case study page.
- `projects/opticube-games-website.md`: reusable OptiCube copy in Markdown.
- `script.js`: project card interaction.
- `timetable.js`: timetable rendering and editing logic.
- Hourly timetable slots from 09:00 to 18:00.

## Timetable editing

- Open `/Users/nikitsya/Desktop/Nikitsya/timetable.html`.
- Click any slot in the table.
- Update fields and click `Save slot`.
- `Clear slot` removes content for the selected slot.
- `Reset all` restores the default timetable.
- Data is saved in browser `localStorage` (`nika_timetable_v1`).

## Do you need a database?

No database is required for local editing in one browser.

Use a database only if you need:
- sync across multiple devices/accounts;
- shared editing by multiple users;
- secure server-side storage and backups.

## Customize quickly

1. Replace project names and types in `index.html`.
2. Edit project details in `script.js` (`projectData`).
3. Edit default timetable data in `timetable.js` (`defaultSchedule`).
4. Change color variables in `styles.css` (`:root`).
5. Add real links and domain email in `index.html`.
