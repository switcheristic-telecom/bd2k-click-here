/*
  Banner Data JSON Structure:
  [
    {
      "md5": "md5_hash",
      "language": "en",
      "image_path": "./data/en/image.gif",
      "ocr_result": {
        "image_width": 468,
        "image_height": 60,
        "x1": 100, "y1": 10,
        "x2": 200, "y2": 40
      },
      "html_path": "./data/html_en/hash.html"
    }
  ]
*/

let bannerData = [];
let currentLanguage = null;

// Elements
const langButtons = document.querySelectorAll('.lang-btn');
const bannerImage = document.getElementById('banner-image');
const bannerContainer = document.getElementById('banner-container');
const ocrHighlight = document.getElementById('ocr-highlight');
const ocrClickTarget = document.getElementById('ocr-click-target');
const sourcePanel = document.getElementById('source-panel');
const sourceFrame = document.getElementById('source-frame');
const bannerSection = document.getElementById('banner-section');

// Language button click handlers
langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    setLanguage(lang);
  });
});

// Click the highlighted "click here" to cycle to next banner
ocrClickTarget.addEventListener('click', handleClick);

// Click anywhere else to blink the highlight (hint to user)
bannerSection.addEventListener('click', (e) => {
  if (e.target === ocrClickTarget || e.target === ocrHighlight) return;
  if (e.target.closest('#language-nav') || e.target.closest('#scroll-hint') || e.target.closest('#source-panel')) return;
  ocrHighlight.style.animation = 'none';
  void ocrHighlight.offsetWidth;
  ocrHighlight.style.animation = 'blink 1.5s 1';
});

// Load banner data
fetch('banner_data.json')
  .then(r => r.json())
  .then(data => {
    bannerData = data;
    setLanguage('en');
  })
  .catch(err => console.error('Error loading banner data:', err));

// Model viewer loading progress
const modelViewer = document.querySelector('model-viewer');
const progressBar = document.getElementById('model-progress-bar');
const progressContainer = document.getElementById('model-progress');

if (modelViewer) {
  modelViewer.addEventListener('progress', (e) => {
    const pct = e.detail.totalProgress * 100;
    progressBar.style.width = pct + '%';
    if (pct >= 100) {
      setTimeout(() => { progressContainer.style.opacity = '0'; }, 500);
    }
  });
}

// --- Win95 window drag/resize ---

(function() {
  const win = sourcePanel;
  const titlebar = document.getElementById('source-titlebar');
  const resizer = win.querySelector('.win95-resizer');
  const iframes = document.querySelectorAll('iframe');
  let startX, startY, startLeft, startTop, startW, startH;
  let pendingX, pendingY, rafId;

  function disableIframes() { iframes.forEach(f => f.style.pointerEvents = 'none'); }
  function enableIframes() { iframes.forEach(f => f.style.pointerEvents = ''); }

  titlebar.addEventListener('mousedown', initDrag);
  resizer.addEventListener('mousedown', initResize);

  function initDrag(e) {
    startX = e.clientX; startY = e.clientY;
    startLeft = win.offsetLeft; startTop = win.offsetTop;
    win.classList.add('dragging');
    disableIframes();
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  }

  function drag(e) {
    pendingX = e.clientX; pendingY = e.clientY;
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        win.style.transform = 'translate(' + (pendingX - startX) + 'px,' + (pendingY - startY) + 'px)';
        rafId = null;
      });
    }
  }

  function stopDrag() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    win.style.left = startLeft + ((pendingX || startX) - startX) + 'px';
    win.style.top = startTop + ((pendingY || startY) - startY) + 'px';
    // Switch from bottom/right to left/top positioning
    win.style.bottom = 'auto';
    win.style.right = 'auto';
    win.style.transform = '';
    win.classList.remove('dragging');
    enableIframes();
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  }

  function initResize(e) {
    startX = e.clientX; startY = e.clientY;
    const rect = win.getBoundingClientRect();
    startW = rect.width; startH = rect.height;
    win.classList.add('dragging');
    disableIframes();
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
  }

  function resize(e) {
    pendingX = e.clientX; pendingY = e.clientY;
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        win.style.width = (startW + pendingX - startX) + 'px';
        win.style.height = (startH + pendingY - startY) + 'px';
        rafId = null;
      });
    }
  }

  function stopResize() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    win.classList.remove('dragging');
    enableIframes();
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
  }
})();

// --- Functions ---

function setLanguage(language) {
  if (language === currentLanguage) return;
  currentLanguage = language;

  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === language);
  });

  const datum = selectRandomBanner(language);
  if (datum) setCurrentBanner(datum);
}

function selectRandomBanner(language) {
  const filtered = bannerData.filter(d => d.language === language);
  if (filtered.length === 0) return null;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function handleClick() {
  const datum = selectRandomBanner(currentLanguage);
  if (datum) setCurrentBanner(datum);
}

function setCurrentBanner(datum) {
  const ocr = datum.ocr_result;
  const imageWidth = ocr.image_width;
  const imageHeight = ocr.image_height;

  // Set banner image
  bannerImage.src = datum.image_path;

  // Position OCR overlays
  const centerX = (ocr.x1 + ocr.x2) / 2;
  const centerY = (ocr.y1 + ocr.y2) / 2;
  const ocrWidth = ocr.x2 - ocr.x1;
  const ocrHeight = ocr.y2 - ocr.y1;

  const leftPct = (centerX / imageWidth) * 100 + '%';
  const topPct = (centerY / imageHeight) * 100 + '%';

  ocrHighlight.style.left = leftPct;
  ocrHighlight.style.top = topPct;
  ocrHighlight.style.width = ocrWidth + 'px';
  ocrHighlight.style.height = ocrHeight + 'px';

  ocrClickTarget.style.left = leftPct;
  ocrClickTarget.style.top = topPct;
  ocrClickTarget.style.width = ocrWidth + 'px';
  ocrClickTarget.style.height = ocrHeight + 'px';

  // Fit container to image aspect ratio
  bannerContainer.style.width = imageWidth + 'px';
  bannerContainer.style.height = imageHeight + 'px';

  // Center the banner so the OCR region is in the middle of the viewport
  const translateX = (imageWidth - (ocr.x1 + ocr.x2)) / 2;
  const translateY = (imageHeight - (ocr.y1 + ocr.y2)) / 2;
  bannerContainer.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px)';

  // Show source webpage
  if (datum.html_path) {
    sourceFrame.src = datum.html_path;
    sourcePanel.classList.add('visible');
  }
}
