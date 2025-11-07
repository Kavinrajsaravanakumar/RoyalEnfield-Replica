document.addEventListener("DOMContentLoaded", async () => {
  // Get bike ID from URL
  const params = new URLSearchParams(window.location.search);
  const bikeId = params.get("id") || "classic350"; // fallback for testing

  try {
    const response = await fetch("data/bike.json");
    const bikes = await response.json();
    const bike = bikes.find((b) => b.id === bikeId);

    if (!bike) {
      document.querySelector("main").innerHTML = "<h2>Bike not found.</h2>";
      return;
    }

    // --- Set basic info ---
    document.querySelector(".name h1").textContent = bike.name;
    document.querySelector(".name p").textContent = bike.description;

    // --- Main image setup ---
    const mainImg = document.querySelector(".main-img img");
    mainImg.src = bike.mainImage;

// --- Extra image gallery (if available) ---
if (bike.moreImages && Array.isArray(bike.moreImages)) {
  const thumbsContainer = document.createElement("div");
  thumbsContainer.classList.add("thumbs");
  thumbsContainer.style.flexDirection = "row"; // make thumbnails horizontal
  thumbsContainer.style.marginTop = "10px";

  bike.moreImages.forEach((imgUrl) => {
    const thumb = document.createElement("img");
    thumb.src = imgUrl;
    thumb.alt = "Bike thumbnail";
    thumb.style.width = "100px";
    thumb.style.height = "70px";
    thumb.style.objectFit = "cover";
    thumb.style.borderRadius = "6px";
    thumb.style.cursor = "pointer";
    thumb.style.transition = "transform 0.2s ease, border 0.2s";
    thumb.style.border = "2px solid transparent";
    thumb.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    thumb.addEventListener("mouseover", () => (thumb.style.borderColor = "#c8102e"));
    thumb.addEventListener("mouseout", () => (thumb.style.borderColor = "transparent"));

    thumb.addEventListener("click", () => {
      mainImg.src = imgUrl; // switch main image
    });

    thumbsContainer.appendChild(thumb);
  });

  // place the thumbnails BELOW the main image
  document.querySelector(".images").appendChild(thumbsContainer);
}



    // --- Render specs dynamically ---
    const container = document.getElementById("specifications");
    Object.entries(bike.sections).forEach(([title, specs]) => {
      const section = document.createElement("div");
      section.classList.add("spec-section");

      section.innerHTML = `
        <h2>${title}</h2>
        <table class="spec-table">
          ${Object.entries(specs)
            .map(
              ([key, value]) => `
            <tr>
              <td class="spec-key">${key}</td>
              <td class="spec-value">${value}</td>
            </tr>`
            )
            .join("")}
        </table>
        <div class="feedback"></div>
      `;
      container.appendChild(section);
    });

  } catch (error) {
    console.error("Error loading data:", error);
  }
});
