/**
 * Footer Loader
 * Dynamically loads the footer component from components/footer.html
 * into pages that use it.
 */

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch the footer HTML
    const response = await fetch("components/footer.html");
    if (!response.ok) throw new Error(`Failed to load footer: ${response.statusText}`);
    
    const footerHtml = await response.text();
    
    // Create a placeholder element if it doesn't exist
    let footerContainer = document.getElementById("footer-container");
    if (!footerContainer) {
      footerContainer = document.createElement("div");
      footerContainer.id = "footer-container";
      
      // Insert footer before the back-to-top button or at the end of main
      const main = document.querySelector("main");
      const backToTop = document.getElementById("back-to-top");
      
      if (backToTop) {
        backToTop.parentElement.insertBefore(footerContainer, backToTop);
      } else if (main) {
        main.appendChild(footerContainer);
      } else {
        document.body.appendChild(footerContainer);
      }
    }
    
    // Insert the footer HTML
    footerContainer.innerHTML = footerHtml;
  } catch (error) {
    console.error("Error loading footer:", error);
  }
});
