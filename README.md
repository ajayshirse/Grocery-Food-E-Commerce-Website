# FreshMart – Grocery E-commerce (customer side)
Open `index.html` in a browser (internet needed for Tailwind CDN + fonts).
Demo login: demo@freshmart.in / demo123

## Images
Each image loads in this order: 1) your local file in `assets/images/…`, 2) an online keyword photo (loremflickr, may not match exactly), 3) a neutral text tile.
**No photos are bundled yet.** To download real, unique, royalty-free photos into the right folders:
`python3 tools/fetch_images.py YOUR_PEXELS_API_KEY` (free key at pexels.com/api). Pexels licence: free to use; credit appreciated.


**Real photos (no Python needed):** open `tools/download-images.html` in Chrome, paste a free Pexels API key, click Start, then extract the downloaded `freshmart-images.zip` into this project's `assets/` folder.
