const homepage = document.getElementById('homepage');
const editorContainer = document.getElementById('editor-container');
const editor = document.getElementById('editor');
const fileListDiv = document.getElementById('fileList');
const backButton = document.getElementById('backButton');
let activeFile;

function createNewFile() {
  const fileName = prompt('Enter the new file name:');
  if (fileName) {
    const fileLink = document.createElement('a');
    fileLink.href = '#';
    fileLink.className = 'file-link';
    fileLink.textContent = fileName;
    fileLink.onclick = function() {
      openFile(fileName);
      return false; // Prevent the default link behavior
    };
    fileListDiv.appendChild(fileLink);
  }
}

function openFile(fileName) {
  homepage.style.display = 'none';
  editorContainer.style.display = 'block';

  // Store the active file
  activeFile = fileName;

  // Remove previous event listener (if any)
  editor.removeEventListener('input', saveContent);

  // Load file content (assuming you have a mechanism to save content for each file)
  const fileContent = localStorage.getItem(fileName) || '';
  editor.innerText = fileContent;

  // Save content on input
  editor.addEventListener('input', saveContent);

  backButton.onclick = function() {
    goBackToHomepage();
  };
}

function saveContent() {
  // Save content to local storage or a server
  localStorage.setItem(activeFile, editor.innerText);
}

function goBackToHomepage() {
  homepage.style.display = 'block';
  editorContainer.style.display = 'none';

  // Restore the content of the active file when going back to the homepage
  const activeFileContent = localStorage.getItem(activeFile) || '';
  editor.innerText = activeFileContent;
}
