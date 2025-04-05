### Notable Changes

- Update the UI to use bootstrap.
- Updated the GET API to support filtering (optional).
- Added a POST API request to insert new advocates (admin's only!).
- Created a better table/grid interaction for the end-user which includes live query filtering, and a result counter.
- Added a modal with detailed information about the advocate to help break away - from the clutter of having all the data displayed on the table.
- Added live video conferencing with advocates.
- Cleaned up some of the general code.

### Additional Desirable Changes

- Wish I could have added a DELETE/PATCH API.
- Clean up of the file/folder structure. I would have placed the Modal and Table in their own respective components with better coding structure and types (type safety).
- General code clean-up.
- Fix tons of bugs that i'm aware of (some related to the "isAdmin" logic for the "Details" button and so on)
- More UI things like a mock navbar would have been nice, data highlighting on the grid.
- Some formating options on the table would have cool (think, phone number formatting, toast/tooltip for specilties instead of tucking them away in the modal details).
