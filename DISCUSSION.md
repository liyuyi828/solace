# Discussion

## What I built

I took the basic advocates app and made several improvements to make it more functional and user-friendly.

## Changes Made

### 1. Fixed React hydration error
The table had an issue where `<th>` tags were directly inside `<thead>`. I wrapped them in a `<tr>` tag to fix the console error.

### 2. Added proper TypeScript types
- Created shared types in `src/types/advocate.ts`
- Added `AdvocateDB` for database operations and `Advocate` for UI components
- Made the API route and React components type-safe

### 3. Improved search functionality
- Moved search from client-side to server-side for better performance
- Added debouncing (600ms) so it doesn't hit the API on every keystroke
- Made search case-insensitive and handles extra spaces
- Search works across all fields: name, city, degree, specialties, experience

### 4. Better UI and data presentation
- Combined first/last name into one column to save space
- Format phone numbers as `(555)-123-4567`
- Show specialties as bullet points instead of plain text
- Made columns better sized (narrower experience column, wider phone column)
- Replaced inline styles with Tailwind CSS classes
- Added proper search input with placeholder text

### 5. Cleaner code structure
- Removed duplicate interfaces between API and component files
- Created reusable CSS classes for table styling
- Removed console.log statements
- Better error handling

## Technical decisions

**Why move search to server-side?** The original app loaded all advocates and filtered on the client. This works fine for small datasets but won't scale. Server-side search is more efficient and reduces memory usage.

**Why keep debouncing?** Even with server-side search, we don't want to hit the API on every character typed. 600ms gives a good balance between responsiveness and server load.

**Why create shared types?** Having the same interface defined in multiple places leads to bugs when things get out of sync. One source of truth is better.

## Result

The app now feels more responsive and professional. Search works smoothly, data is easier to read, and the code is more maintainable.

