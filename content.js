// Google Docs Dark Mode - Content Script
console.log('Google Docs Dark Mode content script loaded');

function injectStyles() {
    // Find the iframe that contains the document editor
    const editorIframe = document.querySelector('iframe.docs-editors-iframe');

    if (editorIframe && editorIframe.contentDocument) {
        console.log('Editor iframe found, injecting styles...');
        const styleElement = document.createElement('link');
        styleElement.rel = 'stylesheet';
        styleElement.type = 'text/css';
        styleElement.href = chrome.runtime.getURL('styles.css');
        
        // Inject the link element into the iframe's head
        editorIframe.contentDocument.head.appendChild(styleElement);
        console.log('Styles injected into iframe.');
    } else {
        // If the iframe isn't ready yet, wait and try again.
        // Google Docs loads content dynamically.
        console.log('Editor iframe not found, will retry...');
        setTimeout(injectStyles, 500);
    }
}

// Start the injection process
injectStyles();