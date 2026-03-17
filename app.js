// app.js
export async function uploadFile() {
  // Get form values and trim whitespace
  const studentId = document.getElementById("studentId").value.trim();
  const fullName = document.getElementById("fullName").value.trim();
  const program = document.getElementById("program").value;
  const batch = document.getElementById("batch").value.trim();
  const pdfFile = document.getElementById("pdfFile").files[0];

  const statusEl = document.getElementById("status");

  // Validate form fields
  if (!studentId || !fullName || !program || !batch) {
    alert("Please fill in all required fields.");
    return;
  }

  if (!pdfFile) {
    alert("Please select a PDF file to upload.");
    return;
  }

  if (pdfFile.type !== "application/pdf") {
    alert("Only PDF files are allowed.");
    return;
  }

  // Show uploading status
  statusEl.innerText = "Uploading...";

  // Create FormData to send
  const formData = new FormData();
  formData.append("studentId", studentId);
  formData.append("fullName", fullName);
  formData.append("program", program);
  formData.append("batch", batch);
  formData.append("pdfFile", pdfFile); // Must match input name in HTML

  // Google Apps Script Web App URL
  const webAppURL = "https://script.google.com/macros/s/AKfycbzrj8HXHgazy3UUraYRAdQ-1MB9uGz2kpSjmexc7aj0riGQYt6BTwINQJz_f_90Fwe5/exec";

  try {
    const response = await fetch(webAppURL, {
      method: "POST",
      body: formData
    });

    const resultText = await response.text();
    statusEl.innerText = resultText;

    // Reset form if successful
    if (resultText.includes("Upload successful")) {
      document.getElementById("uploadForm").reset();
    }

  } catch (error) {
    console.error("Upload failed:", error);
    statusEl.innerText = "Upload failed: " + error.message;
  }
}