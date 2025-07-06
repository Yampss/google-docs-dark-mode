// Google Docs Dark Mode - Debug Helper
console.log('Google Docs Dark Mode extension content script loaded');

// Simple debug function
window.debugDarkMode = function() {
    console.log('=== Dark Mode Debug ===');
    console.log('URL:', window.location.href);
    console.log('Title:', document.title);
    
    const elements = [
        'body',
        '.docs-titlebar',
        '.docs-toolbar',
        '.kix-page',
        '.docs-editor'
    ];
    
    elements.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
            const styles = getComputedStyle(el);
            console.log(`${selector}:`, {
                backgroundColor: styles.backgroundColor,
                color: styles.color,
                element: el
            });
        } else {
            console.log(`${selector}: not found`);
        }
    });
    
    console.log('=== End Debug ===');
};  