document.addEventListener('DOMContentLoaded', () => {
    const linkInput = document.getElementById('linkInput');
    const addLinkButton = document.getElementById('addLinkButton');
    const linkList = document.getElementById('linkList');

    function saveLinks(links) {
        chrome.storage.local.set({ savedLinks: links });
    }

    function loadLinks() {
    chrome.storage.local.get('savedLinks', (result) => {
        const links = result.savedLinks || [];
        linkList.innerHTML = '';
        links.forEach((link, index) => {
            const listItem = document.createElement('li');

            const linkText = document.createElement('span');
            linkText.textContent = link;
            listItem.appendChild(linkText);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제';
            deleteButton.addEventListener('click', () => {
                links.splice(index, 1);
                saveLinks(links);
                loadLinks();
            });

            listItem.appendChild(deleteButton);
            linkList.appendChild(listItem);
        });
    });
}


    addLinkButton.addEventListener('click', () => {
        const link = linkInput.value.trim();
        if (link) {
            chrome.storage.local.get('savedLinks', (result) => {
                const links = result.savedLinks || [];
                links.push(link);
                saveLinks(links);
                loadLinks();
                linkInput.value = '';
            });
        }
    });

    loadLinks();
});