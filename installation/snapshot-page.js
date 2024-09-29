const iframeContainer = document.getElementById('iframeContainer');
const slideshowContainer = document.getElementById('slideshowContainer');
const bannerFrame = document.getElementById('bannerFrame');

const NON_INTERACTIVE_DURATION_MS = 3 * 60 * 1000; // 3 minutes

let currentBannerPath = '';

function updateBanner() {
  const storedBanner = localStorage.getItem('currentBanner');
  const lastClick = localStorage.getItem('lastClick');

  if (storedBanner) {
    const bannerData = JSON.parse(storedBanner);
    const htmlPath = bannerData.html_path;
    const htmlPathWithID = htmlPath + '#bd-2k-banner';

    if (htmlPathWithID !== currentBannerPath) {
      bannerFrame.src = htmlPathWithID;
      currentBannerPath = htmlPathWithID;
    }

    const timeSinceLastClick = Date.now() - parseInt(lastClick);
    if (timeSinceLastClick > NON_INTERACTIVE_DURATION_MS) {
      iframeContainer.style.opacity = '0';
      slideshowContainer.style.opacity = '1';
    } else {
      iframeContainer.style.opacity = '1';
      slideshowContainer.style.opacity = '0';
    }
  }
}

// Initial update
updateBanner();

setInterval(updateBanner, 100);
