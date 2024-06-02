
document.addEventListener("DOMContentLoaded", function() {
  
  var scroll = new SmoothScroll('a[href*="#"]');
  var lang = window.location.pathname.includes("index.html") || window.location.pathname === "/" ? "English" : "Deutsch";
  //document.getElementById("selectedLanguage").textContent = lang;

  const form = document.getElementById("contact-form");
form.addEventListener("submit", async function(event) {
event.preventDefault();
const formData = new FormData(form);
const response = await fetch(form.action, {
    method: form.method,
    body: formData,
    headers: { 'Accept': 'application/json' }
});
if (response.ok) {
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";
    form.reset();
    
    // Hide the success message after 5 seconds (5000 milliseconds)
    setTimeout(() => {
        successMessage.style.display = "none";
    }, 5000);
} else {
    alert("Oops! There was a problem submitting your form");
}
});

  document.getElementById("download-link").addEventListener("click", function(event) {
    event.preventDefault();
    const pdfUrl = "pdfs/schedule.pdf";
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'schedule.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
