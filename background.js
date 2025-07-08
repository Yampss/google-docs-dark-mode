
console.log('Google Docs Dark Mode extension loaded');

chrome.action.onClicked.addListener((tab) => {

  if (tab && tab.url && tab.url.includes('docs.google.com/document')) {
    chrome.storage.local.get('darkMode', ({ darkMode }) => {
      const newMode = !darkMode;
      chrome.storage.local.set({ darkMode: newMode }, () => {
        if (newMode) {
          enableDarkMode(tab.id);
        } else {
          disableDarkMode(tab.id);
        }
      });
    });
  }
});

function enableDarkMode(tabId) {
  chrome.scripting.insertCSS(
    {
      target: { tabId: tabId, allFrames: true },
      files: ['styles.css'],
    },
    () => console.log('CSS injected into all frames.')
  );
  chrome.action.setBadgeText({ text: 'ON', tabId: tabId });
  chrome.action.setBadgeBackgroundColor({ color: '#4caf50', tabId: tabId });
}

function disableDarkMode(tabId) {
  chrome.scripting.removeCSS(
    {
      target: { tabId: tabId, allFrames: true },
      files: ['styles.css'],
    },
    () => console.log('CSS removed from all frames.')
  );
  chrome.action.setBadgeText({ text: '', tabId: tabId });
}
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = changeInfo.url || (tab && tab.url);
  if (
    changeInfo.status === 'complete' &&
    url &&
    url.includes('docs.google.com/document')
  ) {
    chrome.storage.local.get('darkMode', ({ darkMode }) => {
      if (darkMode) {
        enableDarkMode(tabId);
      } else {
        disableDarkMode(tabId);
      }
    });
  }
});
