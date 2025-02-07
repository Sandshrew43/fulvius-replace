const imageUrl = "https://imgs.search.brave.com/I0JcLaS50-uUHl9fe_PY06kgnUk9HvXVd0KOxHHNcc8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmt5/bS1jZG4uY29tL2Vu/dHJpZXMvaWNvbnMv/bWVkaXVtLzAwMC8w/NDgvMjUzL251Zy5q/cGc"; // URL de la imagen

function replaceMedia() {
  // Reemplazar imágenes
  document.querySelectorAll("img").forEach(img => {
    img.src = imageUrl;
    img.srcset = imageUrl;
    img.style.objectFit = "cover";
    img.style.width = img.width + "px";
    img.style.height = img.height + "px";
  });

  // Reemplazar miniaturas de videos
  document.querySelectorAll("video").forEach(video => {
    video.poster = imageUrl;
    video.style.backgroundImage = `url(${imageUrl})`;
    video.style.backgroundSize = "cover";
    video.style.backgroundPosition = "center";
    video.pause(); // Pausar reproducción automática
  });

  // Reemplazar iframes (con una imagen encima)
  document.querySelectorAll("iframe").forEach(iframe => {
    if (iframe.src.includes("youtube") || iframe.src.includes("tiktok")) {
      const placeholder = document.createElement("div");
      placeholder.style.width = iframe.width || "100%";
      placeholder.style.height = iframe.height || "100%";
      placeholder.style.background = `url(${imageUrl}) center/cover no-repeat`;
      placeholder.style.position = "absolute";
      placeholder.style.top = iframe.offsetTop + "px";
      placeholder.style.left = iframe.offsetLeft + "px";
      placeholder.style.zIndex = "9999";
      iframe.style.visibility = "hidden";
      iframe.parentNode.insertBefore(placeholder, iframe);
    }
  });
}

// Detectar cambios en la página (para elementos dinámicos)
const observer = new MutationObserver(() => {
  replaceMedia();
});
observer.observe(document.body, { childList: true, subtree: true });

// Ejecutar la función al cargar la página
replaceMedia();
