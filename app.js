// app.js
export async function uploadFile() {
  const studentId = document.getElementById("studentId").value.trim();
  const fullName = document.getElementById("fullName").value.trim();
  const program = document.getElementById("program").value;
  const batch = document.getElementById("batch").value.trim();
  const pdfFile = document.getElementById("pdfFile").files[0];

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

  const formData = new FormData();
  formData.append("studentId", studentId);
  formData.append("fullName", fullName);
  formData.append("program", program);
  formData.append("batch", batch);
  formData.append("pdfFile", pdfFile);

  // <-- This is your actual Web App URL -->
  const webAppURL = "https://script.google.com/macros/s/AKfycbzrj8HXHgazy3UUraYRAdQ-1MB9uGz2kpSjmexc7aj0riGQYt6BTwINQJz_f_90Fwe5/exec";

  try {
    const response = await fetch(webAppURL, {
      method: "POST",
      body: formData
    });

    const resultText = await response.text();
    document.getElementById("status").innerText = resultText;

    if (resultText.includes("Upload successful")) {
      document.getElementById("uploadForm").reset();
    }

  } catch (error) {
    console.error(error);
    document.getElementById("status").innerText = "Upload failed: " + error.message;
  }
}