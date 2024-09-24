const iframeContainer = document.getElementById('iframeContainer');
const bannerFrame = document.getElementById('bannerFrame');

const NON_INTERACTIVE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

let currentBannerPath = '';

function updateBanner() {
  const storedBanner = localStorage.getItem('currentBanner');
  const lastClick = localStorage.getItem('lastClick');

  if (storedBanner) {
    const bannerData = JSON.parse(storedBanner);
    const htmlPath = bannerData.html_path;

    if (htmlPath !== currentBannerPath) {
      bannerFrame.src = htmlPath;
      currentBannerPath = htmlPath;
    }

    const timeSinceLastClick = Date.now() - parseInt(lastClick);
    if (timeSinceLastClick > NON_INTERACTIVE_DURATION_MS) {
      iframeContainer.style.opacity = '0';
    } else {
      iframeContainer.style.opacity = '1';
    }
  }
}

// Initial update
updateBanner();

setInterval(updateBanner, 100);
