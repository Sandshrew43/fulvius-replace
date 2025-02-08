chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: true }); // Activado por defecto
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get("enabled", (data) => {
    const newState = !data.enabled;
    chrome.storage.local.set({ enabled: newState }, () => {
      chrome.action.setIcon({
        path: newState ? "icon.png" : "icon-disabled.png"
      });
      chrome.tabs.reload(tab.id); // Recargar la pestaña para aplicar cambios
    });
  });
});
