# Click Here...

An interactive installation that showcases an archive of early web banner ads featuring "click here" in multiple languages (English, Spanish, Japanese, Chinese), curated from the Wayback Machine.

Exhibited at [SPAM New Media Festival](https://spamnewmediafestival.com/), September 27--29, 2024, Georgetown Steam Plant, Seattle, WA.

By [Richard L. Huang](https://lewei.me) and [Yufeng Zhao](https://yufengzhao.com) as [Switcheristic Telecommunications](https://swtch.tel). Powered by [Banner Depot 2000](https://banner-depot-2000.net).

**Live:** [click-here.banner-depot-2000.net](https://click-here.banner-depot-2000.net)

## How It Works

The physical installation consists of a CRT monitor, a mouse, and a wall projection. Clicking the mouse cycles through banner ad frames on the monitor, centered on the phrase "click here." The wall projection displays the original webpage where each banner appeared.

The two screens communicate via `localStorage`: the banner page writes the current selection, and the snapshot page polls for changes every 100ms. This works across separate browser windows on the same origin.

## File Structure

```
.
├── index.html                  # Landing page — Win95 desktop with two iframe windows
├── style.css                   # Landing page styles
├── main.js                     # Window drag/resize logic, model-viewer progress
│
├── banner_data.json            # Banner catalog (shared by landing page & installation)
├── data/                       # Shared assets
│   ├── {en,es,ja,zh}/          #   Banner frame GIFs + OCR metadata JSON per language
│   ├── html_{en,es,ja,zh}/     #   Archived source webpages (HTML snapshots)
│   └── *.ipynb                 #   Data gathering/processing notebooks
├── fonts/                      # Pixel & bitmap fonts (Ark Pixel, WenQuanYi, Terminus)
├── assets/
│   ├── SPAM-draco.glb          #   Draco-compressed 3D scan of the installation
│   └── banner-depot-2000-slim.svg
│
└── installation/               # Pages loaded inside the landing page iframes
    ├── banner-page.html/js     #   Interactive banner viewer (language switcher, OCR overlay)
    ├── snapshot-page.html/js   #   Source webpage viewer (reads selection from localStorage)
    ├── background.mp4          #   Idle-state video (plays after 3 min of no interaction)
    └── lib/qrcode.min.js       #   QR code generation
```

## Running Locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

No build step, no dependencies. Plain HTML/CSS/JS.
