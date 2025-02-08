const imageUrl = "https://imgs.search.brave.com/I0JcLaS50-uUHl9fe_PY06kgnUk9HvXVd0KOxHHNcc8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmt5/bS1jZG4uY29tL2Vu/dHJpZXMvaWNvbnMv/bWVkaXVtLzAwMC8w/NDgvMjUzL251Zy5q/cGc"; // URL de la imagen

function replaceAllImages() {
  chrome.storage.local.get("enabled", (data) => {
    if (!data.enabled) return; // deactivated =nothing

    // Replace (<img>)
    document.querySelectorAll("img").forEach(img => {
      img.src = imageUrl;
      img.srcset = imageUrl;
      img.style.objectFit = "cover";
    });

    // Replace (<video>)
    document.querySelectorAll("video").forEach(video => {
      video.poster = imageUrl;
      video.style.backgroundImage = `url(${imageUrl})`;
      video.style.backgroundSize = "cover";
      video.pause(); // Pause auto play
    });

    // Replace <picture>
    document.querySelectorAll("picture source").forEach(source => {
      source.srcset = imageUrl;
    });

    // Replace SVG
    document.querySelectorAll("svg image").forEach(svgImage => {
      svgImage.setAttribute("href", imageUrl);
    });

    // Replace CSS
    document.querySelectorAll("*").forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.backgroundImage.includes("url")) {
        element.style.backgroundImage = `url(${imageUrl})`;
        element.style.backgroundSize = "cover";
      }
    });

    // Replace metadata (OpenGraph, Twitter Cards)
    document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(meta => {
      meta.setAttribute("content", imageUrl);
    });

    // Replace iframes (YouTube, Twitter, etc.)
    document.querySelectorAll("iframe").forEach(iframe => {
      if (iframe.src.includes("youtube") || iframe.src.includes("twitter") || iframe.src.includes("tiktok")) {
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
  });
}

// detect changes
const observer = new MutationObserver(() => {
  replaceAllImages();
});
observer.observe(document.body, { childList: true, subtree: true });

// do it
replaceAllImages();
