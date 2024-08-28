chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.storage.local.get('savedLinks', (result) => {
            const links = result.savedLinks || [];
            const currentUrl = tab.url;

            links.forEach(link => {
                if (currentUrl.includes(link)) {
                    // script inject ./content.js
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        files: ['content.js']
                    });
                }
            });
        });
    }
});

chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        chrome.storage.local.get('savedLinks', (result) => {
            const links = result.savedLinks || [];
            const currentUrl = tab.url;

            links.forEach(link => {
                if (currentUrl.includes(link)) {
                    // script inject ./content.js
                    chrome.scripting.executeScript({
                        target: { tabId: activeInfo.tabId },
                        files: ['content.js']
                    });
                }
            });
        });
    });
});
