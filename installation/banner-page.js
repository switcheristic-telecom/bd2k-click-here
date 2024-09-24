/* 
  Banner Data JSON Structure:
  [
    { 
    "md5": "md5_hash",
    "language": "en",
    "image_path": "path/to/image.jpg",
    "ocr_result": {
      "image_width": 1920,
      "image_height": 1080,
      "x1": 100,
      "y1": 100,
      "x2": 200,
      "y2": 200
    }
      ,html_path: "path/to/html"
    }
      ...
  ]
*/
let bannerData = [];
let currentLanguage = null;

/**
 * GET ELEMENTS
 */

// Language buttons
const esButton = document.getElementById('es-button');
const enButton = document.getElementById('en-button');
const jaButton = document.getElementById('ja-button');
const zhButton = document.getElementById('zh-button');
const ALL_BUTTONS = [esButton, enButton, jaButton, zhButton];

// Banner stuff
const container = document.getElementById('imageContainer');
const bannerImage = document.getElementById('bannerImage');
const ocrDiv = document.getElementById('ocrResult');

esButton.addEventListener('click', () => setLanguage('es'));
enButton.addEventListener('click', () => setLanguage('en'));
jaButton.addEventListener('click', () => setLanguage('ja'));
zhButton.addEventListener('click', () => setLanguage('zh'));

ocrDiv.addEventListener('click', handleClick);

// Load the banner data from the JSON file
fetch('banner_data.json')
  .then((response) => response.json())
  .then((data) => {
    bannerData = data;
    setLanguage('en');
  })
  .catch((error) => console.error('Error loading JSON:', error));

/**
 * HELPER FUNCTIONS
 */

function setLanguage(language) {
  if (language === currentLanguage) {
    return;
  }
  currentLanguage = language;

  // set the selected button style to underline
  const button = document.getElementById(`${language}-button`);
  ALL_BUTTONS.forEach((button) => {
    // untoggle active
    button.classList.remove('active');
  });
  button.classList.add('active');

  const bannerDatum = selectBannerDatum(currentLanguage);
  setCurrentBanner(bannerDatum);
}

function selectBannerDatum(language) {
  // find a random banner datum that has the specified language
  const filteredData = bannerData.filter(
    (datum) => datum['language'] === language
  );
  // print all language data from the JSON file
  const randomIndex = Math.floor(Math.random() * filteredData.length);
  return filteredData[randomIndex];
}

function handleClick() {
  const bannerDatum = selectBannerDatum(currentLanguage);
  setCurrentBanner(bannerDatum);

  // save the current banner to local storage
  localStorage.setItem('currentBanner', JSON.stringify(bannerDatum));
  // save the timestamp of the last click
  localStorage.setItem('lastClick', Date.now());
}

function setCurrentBanner(datum) {
  const item = datum;
  const imagePath = item.image_path;
  const ocrResult = item.ocr_result;
  const imageWidth = ocrResult.image_width;
  const imageHeight = ocrResult.image_height;

  // Set the image source
  bannerImage.src = imagePath;

  // Position the OCR result
  const ocrDiv = document.getElementById('ocrResult');
  const centerX = (ocrResult.x1 + ocrResult.x2) / 2;
  const centerY = (ocrResult.y1 + ocrResult.y2) / 2;
  const ocrWidth = ocrResult.x2 - ocrResult.x1;
  const ocrHeight = ocrResult.y2 - ocrResult.y1;

  ocrDiv.style.left = `${(centerX / imageWidth) * 100}%`;
  ocrDiv.style.top = `${(centerY / imageHeight) * 100}%`;
  ocrDiv.style.height = `${ocrHeight}px`;
  ocrDiv.style.width = `${ocrWidth}px`;

  // Adjust container size to match image dimensions
  container.style.width = `${imageWidth}px`;
  container.style.height = `${imageHeight}px`;

  // Translate the container to center the OCR result
  const translateX = (imageWidth - (ocrResult.x1 + ocrResult.x2)) / 2;
  const translateY = (imageHeight - (ocrResult.y1 + ocrResult.y2)) / 2;
  container.style.transform = `translate(${translateX}px, ${translateY}px)`;
}
