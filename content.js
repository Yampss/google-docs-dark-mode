
console.log('Google Docs Dark Mode content script loaded');

function injectStyles() {
    const editorIframe = document.querySelector('iframe.docs-editors-iframe');

    if (editorIframe && editorIframe.contentDocument) {
        console.log('Editor iframe found, injecting styles...');
        const styleElement = document.createElement('link');
        styleElement.rel = 'stylesheet';
        styleElement.type = 'text/css';
        styleElement.href = chrome.runtime.getURL('styles.css');
        editorIframe.contentDocument.head.appendChild(styleElement);
        console.log('Styles injected into iframe.');
    } else {
        console.log('Editor iframe not found, will retry...');
        setTimeout(injectStyles, 500);
    }
}
injectStyles();
