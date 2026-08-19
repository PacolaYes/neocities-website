
function handleLastFMData(data) {
    console.log(data)
}

document.addEventListener("DOMContentLoaded", () => {
    const lastfm_iframe = document.getElementById("lastfm-data")

    window.addEventListener("message", (event) => {
	switch (event.source) {
	    case lastfm_iframe.contentWindow:
		handleLastFMData(event.data);
		break;
	    default:
		break;
	}
    })
})
