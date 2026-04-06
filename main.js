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

const allIframes = document.querySelectorAll('iframe');

function disableIframePointerEvents() {
  allIframes.forEach(f => f.style.pointerEvents = 'none');
}
function enableIframePointerEvents() {
  allIframes.forEach(f => f.style.pointerEvents = '');
}

document.querySelectorAll('.win95-window').forEach(makeWindowInteractive);

function makeWindowInteractive(win) {
  const titlebar = win.querySelector('.win95-titlebar');
  const resizer = win.querySelector('.win95-resizer');
  let startX, startY, startLeft, startTop, startW, startH;
  let pendingX, pendingY, rafId;

  titlebar.addEventListener('mousedown', initDrag);
  resizer.addEventListener('mousedown', initResize);

  function initDrag(e) {
    startX = e.clientX; startY = e.clientY;
    startLeft = win.offsetLeft; startTop = win.offsetTop;
    win.classList.add('dragging');
    disableIframePointerEvents();
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
    win.style.transform = '';
    win.classList.remove('dragging');
    enableIframePointerEvents();
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  }

  function initResize(e) {
    startX = e.clientX; startY = e.clientY;
    const rect = win.getBoundingClientRect();
    startW = rect.width; startH = rect.height;
    win.classList.add('dragging');
    disableIframePointerEvents();
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
    enableIframePointerEvents();
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
  }
}
