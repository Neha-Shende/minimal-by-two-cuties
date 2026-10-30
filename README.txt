MINIMAL BY TWO CUTIES — ANDROID-READY WEBSITE

WHAT THIS IS
- A mobile-first product catalogue website for Android phones, tablets and desktop.
- Installable as a Progressive Web App (PWA) from Android Chrome after publishing over HTTPS.
- Includes the animated welcome intro, handcrafted product photos/videos, category filters,
  individual product selection, price ranges, sorting, and WhatsApp enquiry links.
- This is a website/PWA, not a native APK. Visitors can open the public GitHub Pages URL,
  and Android users can optionally install it to their home screen.

RUN LOCALLY
1. Extract all files and folders together.
2. Open index.html in Chrome to preview the website. Some PWA features only work after HTTPS hosting.

PUBLISH WITH GITHUB PAGES
1. Create a NEW public GitHub repository (example: minimal-by-two-cuties).
2. Extract this ZIP.
3. Upload the CONTENTS of this folder to the repository root, not the ZIP file itself.
   index.html must be visible at the top level beside style.css, script.js, sw.js,
   manifest.webmanifest, README.txt, and the assets/ and icons/ folders.
4. Open repository Settings → Pages.
5. Under Build and deployment choose Deploy from a branch.
6. Select branch main and folder /(root), then Save.
7. Wait for GitHub Pages to publish. Your public URL will look like:
   https://YOUR-USERNAME.github.io/REPOSITORY-NAME/
8. Open that URL on Android Chrome. Use the browser menu (⋮) → Install app or Add to Home screen.

UPDATE PRODUCT PRICES BEFORE SHARING
The visible starting prices are still example prices from the earlier mock-up:
- The Lily Love: ₹499 onwards
- Little Sunshine: ₹399 onwards
- Blue Daydream: ₹449 onwards
- Tiny Flower Keychains: ₹149 onwards
- Little Gift Hamper: ₹699 onwards

These are NOT confirmed business prices. In index.html, each product card has a data-price
attribute and a visible ₹ price in its .product-price element. Update BOTH to your actual
starting price so filters and displayed prices stay in sync. Update price-range options in
index.html/script.js if your actual prices need different ranges.

CONTACT DETAILS
WhatsApp/phone: +91 82698 20509
Instagram: @minimalbytwocuties

NOTES
- Product videos are lazy-loaded near the screen and are intentionally not cached offline
  to preserve smooth mobile video playback and avoid excessive phone storage use.
- Google Fonts requires internet. System serif/sans-serif fallbacks are included.
- WhatsApp buttons open a pre-filled chat. No payment gateway, cart database, inventory,
  or online checkout is connected.
