chrome.storage.local.get('savedLinks', (result) => {
    const links = result.savedLinks || [];
    const currentUrl = window.location.href;

    links.forEach(link => {
        if (currentUrl.includes(link)) {
            alert('경고: 이 사이트는 명단에 있는 링크를 포함하고 있습니다.');

            // 사이트의 모든 이미지를 지정된 이미지로 바꾸기
            const images = document.getElementsByTagName('img');
            for (let img of images) {
                img.src = chrome.runtime.getURL('images/annoy.jpg');
            }
        }
    });
});
