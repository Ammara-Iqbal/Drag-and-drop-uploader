const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const previewArea = document.getElementById('preview-area');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const errorMsg = document.getElementById('error-msg');
const clearBtn = document.getElementById('clear-btn'); // Clear button

// Allowed file types
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

// Load saved image from localStorage on page load
window.onload = function () {
  const savedImage = localStorage.getItem('uploadedImage');
  if (savedImage) {
    displayImage(savedImage);
  }
};

// Handle file input click
dropArea.addEventListener('click', () => fileInput.click());

// Handle drag over
dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.classList.add('drag-over');
});

// Handle drag leave
dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('drag-over');
});

// Handle drop
dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  handleFile(file);
});

// Handle file input change
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  handleFile(file);
});

// Main function to handle the uploaded file
function handleFile(file) {
  errorMsg.textContent = '';
  if (file && allowedTypes.includes(file.type)) {
    simulateUpload(() => previewImage(file));
  } else {
    errorMsg.textContent = '❌ Only JPG, PNG, or GIF images are allowed!';
  }
}

// Simulate upload progress bar
function simulateUpload(callback) {
  progressContainer.style.display = 'block';
  progressBar.style.width = '0%';

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      progressContainer.style.display = 'none';
      callback();
    }
  }, 100);
}

// Show image preview and save in localStorage
function previewImage(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const imageUrl = e.target.result;
    displayImage(imageUrl);
    localStorage.setItem('uploadedImage', imageUrl);
  };
  reader.readAsDataURL(file);
}

// Display image and show clear button
function displayImage(src) {
  previewArea.innerHTML = `<img src="${src}" alt="Uploaded Image">`;
  clearBtn.style.display = 'inline-block'; // Show clear button
}

// Handle Clear Button click
clearBtn.addEventListener('click', () => {
  localStorage.removeItem('uploadedImage');
  previewArea.innerHTML = '';
  clearBtn.style.display = 'none';
});
