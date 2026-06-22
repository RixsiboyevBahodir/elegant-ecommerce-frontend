# Product Comparison
 
A responsive React + TypeScript app built with Vite and Tailwind CSS for comparing phone specifications.
 
## Features
 
- Compare selected products side by side
- Save selections in `localStorage`
- Responsive mobile-first layout with card view on small screens
- Highlight different values across compared products
- Easy add/remove product interactions
 
## Tech stack
 
- React 19
- TypeScript
- Vite
- Tailwind CSS
 
## Project structure
 
- `src/App.tsx` � main app shell and layout
- `src/components/ProductCard.tsx` � product selection card
- `src/components/ComparisonTable.tsx` � comparison table and responsive card view
- `src/data/products.ts` � product dataset and types
 
## Run locally
 
```bash
npm install
npm run dev
```
 
Open the app at the address shown in the terminal.
 
## Build
 
```bash
npm run build
```
 
## Notes
 
- Product selections are stored in browser `localStorage`.
- The comparison table switches to a compact card layout on small screens.
- The comparison highlights differences for `price`, `color`, `ssd`, and `ram`.
- `Product` data uses numeric `ram` and `ssd` values for easier comparison logic.
