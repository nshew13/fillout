# Fillout take-home assignment

## Demo

### On Vercel

Project deployed to https://fillout-iota.vercel.app/

### Local server

To run the development server:

```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes on implementation
- It was unclear what "Copy" does without paste. For now, it is the same as "Duplicate".
- The dashed spacer before "Add page" was removed so it did not look like a place a page could be dropped.
- The "Info" and "Ending" pages are configured as non-editable, meaning they can't be moved and don't display a context menu.

## Further enhancements
If continuing this project, I would first add basic validation of pages, including checks for unique IDs and names, to the `updatePages` method.

## Main libraries used
- React
- Next.js
- MUI
- TailwindCSS
- Material Icons
- dnd kit
