// app.js
export async function uploadFile() {
  const studentId = document.getElementById("studentId").value.trim();
  const fullName = document.getElementById("fullName").value.trim();
  const program = document.getElementById("program").value;
  const batch = document.getElementById("batch").value.trim();
  const pdfFile = document.getElementById("pdfFile").files[0];
  const statusEl = document.getElementById("status");

  if (!studentId || !fullName || !program || !batch) { alert("Fill all fields."); return; }
  if (!pdfFile) { alert("Select a PDF file."); return; }
  if (pdfFile.type !== "application/pdf") { alert("Only PDF allowed."); return; }

  statusEl.innerText = "Uploading...";

  const reader = new FileReader();
  reader.readAsDataURL(pdfFile);
  reader.onload = async () => {
    const base64 = reader.result.split(',')[1]; // remove prefix
    const payload = {
      studentId, fullName, program, batch,
      pdfBase64: base64,
      fileName: pdfFile.name
    };

    const webAppURL = "https://script.google.com/macros/s/AKfycbytcQ-GwiR0oN5piQqZSsieMleuG_0K7qREiKU5AgTufmAsnoip8UFHTNkqlTzDeIq1/exec";

    try {
      const response = await fetch(webAppURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const resultText = await response.text();
      statusEl.innerText = resultText;
      if (resultText.includes("Upload successful")) { document.getElementById("uploadForm").reset(); }
    } catch(err) {
      console.error(err);
      statusEl.innerText = "Upload failed: " + err.message;
    }
  };
}