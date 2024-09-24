// console.log('FART');
// console.log('SHIT');

// function createFullScreenOverlay() {
//   // Use document.body instead of querying for it
//   const body = document.body;

//   // If body is not available yet, wait for it
//   if (!body) {
//     window.addEventListener('DOMContentLoaded', createFullScreenOverlay);
//     return;
//   }

//   const div = document.createElement('div');

//   div.style.position = 'fixed';
//   div.style.top = '0';
//   div.style.left = '0';
//   div.style.width = '100vw';
//   div.style.height = '100vh';
//   div.style.backgroundColor = 'black';
//   div.style.zIndex = '99998';
//   div.style.opacity = '1';
//   div.id = 'fullScreenDiv';

//   // Add transition for smooth fade-out
//   div.style.transition = 'opacity 10s ease-out';

//   body.appendChild(div);

//   // Trigger fade-out after a short delay
//   setTimeout(() => {
//     div.style.opacity = '0';
//   }, 100);

//   // Remove the div from the DOM after the fade-out is complete
//   div.addEventListener('transitionend', () => {
//     body.removeChild(div);
//   });
// }

// // Try to run immediately, but if it's too early, it will set up a listener
// createFullScreenOverlay();
