let captchaText = "";

// Generate captcha
function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  captchaText = "";

  for (let i = 0; i < 5; i++) {
    captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const canvas = document.getElementById("captchaCanvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "30px Poppins";
  ctx.textBaseline = "middle";

  for (let i = 0; i < captchaText.length; i++) {
    let x = 25 * i + 15;
    let y = canvas.height / 2;
    let angle = (Math.random() - 0.5) * 0.6;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = "#" + Math.floor(Math.random() * 16777215).toString(16);
    ctx.fillText(captchaText[i], 0, 0);
    ctx.restore();
  }

  // noise lines
  for (let i = 0; i < 6; i++) {
    ctx.strokeStyle = "#aaa";
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }
}

// Generate captcha on page load
document.addEventListener("DOMContentLoaded", function () {
  generateCaptcha();
});

// Form validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  const userInput = document.getElementById("captchaInput").value.trim();
  const error = document.getElementById("captchaError");
  const success = document.getElementById("successMessage");

  if (userInput !== captchaText) {
    e.preventDefault();
    error.classList.remove("d-none");
    if (success) success.classList.add("d-none");
    generateCaptcha();
  } else {
    // Captcha correct
    e.preventDefault();
    error.classList.add("d-none");
    if (success) success.classList.remove("d-none");

    // Extract form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subjectLine = document.getElementById("subject").value || "Contact Form Submission";
    const message = document.getElementById("message").value;

    // Construct email
    const recipient = "contact@emsyne.com";
    const mailSubject = encodeURIComponent(subjectLine);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    // Redirect to email client
    window.location.href = `mailto:${recipient}?subject=${mailSubject}&body=${body}`;

    // Optional: Reset form and captcha after a short delay
    setTimeout(() => {
      this.reset();
      generateCaptcha();
      if (success) success.classList.add("d-none");
    }, 2000);
  }
});