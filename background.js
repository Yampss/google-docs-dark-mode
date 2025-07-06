
// Google Docs Dark Mode Extension
console.log('Google Docs Dark Mode extension loaded');

let darkModeActive = {};

chrome.action.onClicked.addListener(async (tab) => {
  // Only work on Google Docs pages
  if (!tab.url || !tab.url.includes('docs.google.com')) {
    console.log('Not a Google Docs page');
    return;
  }

  const tabId = tab.id;
  
  try {
    if (!darkModeActive[tabId]) {
      // Enable dark mode
      await chrome.scripting.insertCSS({
        target: { tabId: tabId },
        files: ['styles.css']
      });
      
      darkModeActive[tabId] = true;
      
      // Show "ON" badge
      await chrome.action.setBadgeText({
        tabId: tabId,
        text: 'ON'
      });
      
      await chrome.action.setBadgeBackgroundColor({
        tabId: tabId,
        color: '#4CAF50'
      });
      
      console.log('Dark mode enabled');
      
    } else {
      // Disable dark mode
      await chrome.scripting.removeCSS({
        target: { tabId: tabId },
        files: ['styles.css']
      });
      
      darkModeActive[tabId] = false;
      
      // Clear badge
      await chrome.action.setBadgeText({
        tabId: tabId,
        text: ''
      });
      
      console.log('Dark mode disabled');
    }
  } catch (error) {
    console.error('Error toggling dark mode:', error);
  }
});

// Clean up when tab closes
chrome.tabs.onRemoved.addListener((tabId) => {
  delete darkModeActive[tabId];
});

// Reset state when navigating away from Google Docs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && !changeInfo.url.includes('docs.google.com')) {
    delete darkModeActive[tabId];
    chrome.action.setBadgeText({
      tabId: tabId,
      text: ''
    });
  }
});
