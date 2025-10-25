// Global browser detection fix for production
if (typeof window !== 'undefined' && typeof browser === 'undefined') {
  window.browser = {
    runtime: {
      getURL: (path) => path,
      sendMessage: () => Promise.resolve(),
      onMessage: {
        addListener: () => { },
        removeListener: () => { }
      }
    }
  };
}
