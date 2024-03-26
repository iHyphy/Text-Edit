import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
};

// Initialize the editor
const initEditor = () => {
  const editor = new Editor();
  if (!editor) {
    loadSpinner();
  }
};

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Assuming your build process moves src-sw.js to the root of your 'dist' directory,
  // the path here is adjusted to reference 'service-worker.js' directly from the served root.
  const workboxSW = new Workbox('/service-worker.js');
  
  workboxSW.register().then(() => {
    console.log('Service worker registered successfully');
  }).catch((error) => {
    console.error('Service worker registration failed:', error);
  });
} else {
  console.error('Service workers are not supported in this browser.');
}

// Initialize the editor when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initEditor);
