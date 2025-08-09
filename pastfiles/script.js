const pdfList = document.getElementById('pdfList');

function uploadPDF() {
  // Create a file input element
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.pdf';
  fileInput.multiple = true;
  
  fileInput.onchange = function(event) {
    const files = event.target.files;
    
    for (let file of files) {
      if (file.type === 'application/pdf') {
        // Add to workspace
        addPDFToWorkspace(file);
        
        // Add to sidebar downloaded PDFs
        addPDFToSidebar(file);
      } else {
        alert('Please select only PDF files.');
      }
    }
  };
  
  fileInput.click();
}

function addPDFToWorkspace(file) {
  const item = document.createElement('div');
  item.className = 'pdf-item';
  
  // Format file size
  const fileSize = formatFileSize(file.size);
  
  item.innerHTML = `
    <div class="pdf-info">
      <strong>${file.name}</strong>
      <span class="file-size">${fileSize}</span>
    </div>
    <div class="pdf-actions">
      <button class="view-pdf" onclick="viewPDF('${file.name}')" title="View PDF">👁</button>
      <button class="download-pdf" onclick="downloadWorkspacePDF('${file.name}', this)" title="Download">⬇</button>
      <button class="remove-pdf" onclick="removePDF(this)" title="Remove">×</button>
    </div>
  `;
  
  // Store file data
  item.setAttribute('data-file', JSON.stringify({
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified
  }));
  
  pdfList.appendChild(item);
}

function addPDFToSidebar(file) {
  const fileSize = formatFileSize(file.size);
  const date = formatDate(file.lastModified);
  
  // Add to sidebar downloaded PDFs
  if (typeof addDownloadedPDF === 'function') {
    addDownloadedPDF(file.name, fileSize, date, {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    });
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Today';
  if (diffDays === 2) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays - 1} days ago`;
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  
  return date.toLocaleDateString();
}

function viewPDF(filename) {
  alert(`Viewing PDF: ${filename}\n(Preview functionality to be implemented)`);
}

function downloadWorkspacePDF(filename, button) {
  const pdfItem = button.closest('.pdf-item');
  const fileData = pdfItem.getAttribute('data-file');
  
  if (fileData) {
    const data = JSON.parse(fileData);
    // For demo purposes, create a sample PDF
    createSamplePDF(filename);
  } else {
    alert('File data not found');
  }
}

function removePDF(button) {
  const pdfItem = button.closest('.pdf-item');
  const filename = pdfItem.querySelector('strong').textContent;
  
  // Remove from workspace
  pdfItem.remove();
  
  // Remove from sidebar if it exists
  if (typeof removeDownloadedPDF === 'function') {
    // Find and remove from sidebar
    const sidebarPdfs = document.querySelectorAll('.sidebar-pdf-item');
    sidebarPdfs.forEach(item => {
      const pdfName = item.querySelector('.pdf-name').textContent;
      if (pdfName === filename) {
        item.remove();
        
        // Check if sidebar is empty and show message
        const downloadedPdfs = document.getElementById('downloadedPdfs');
        if (downloadedPdfs && downloadedPdfs.children.length === 0) {
          const noPdfsMessage = document.createElement('div');
          noPdfsMessage.className = 'no-pdfs-message';
          noPdfsMessage.textContent = 'No downloaded PDFs yet';
          downloadedPdfs.appendChild(noPdfsMessage);
        }
      }
    });
  }
}

function startEditing() {
  const pdfItems = document.querySelectorAll('.pdf-item');
  if (pdfItems.length === 0) {
    alert('Please upload some PDFs first before starting editing.');
    return;
  }
  
  alert(`Editing started with ${pdfItems.length} PDF(s).\n(Advanced editing functionality to be implemented)`);
}