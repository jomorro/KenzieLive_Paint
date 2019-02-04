
const updateUrl = window.location.href + 'updates';
let continuePolling = true;
let lastUpdateIndex = 0;

const poll = () => setTimeout(() => {
    let body;
    if (recentlyUpdatedPixelsArray.length > 0) {
        body = JSON.stringify({lastUpdateIndex, clientupdates: recentlyUpdatedPixelsArray});
        recentlyUpdatedPixelsArray = [];
    } else {
        body = JSON.stringify({lastUpdateIndex});
    }
    fetch(`${updateUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    }).then(res => res.json())
    .then(hydratedBody => {
        lastUpdateIndex = hydratedBody.updateIndex;
        hydratedBody.updatesArray.forEach(pixelAndColor => bitmap.setColorFromServer(...pixelAndColor));
    });
    if (continuePolling) poll();
}, 1000);

poll();