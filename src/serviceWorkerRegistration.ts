export const registerServiceWorker = (): void => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

    navigator.serviceWorker
      .register(swUrl)
      .catch((error) =>
        console.error("Service Worker registration failed:", error),
      );
  });
};
