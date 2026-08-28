

function handleLastFMData(data) {
    const status = document.getElementById("lastfm-status")
    if (data?.["@attr"]?.["nowplaying"] == "true") 
	status.innerText = "Now Playing"
    else
	status.innerText = "Previously Playing"

    const cover = document.getElementById("lastfm-art")
    const cover_img = data?.["image"]?.[2]?.["#text"]
    if (cover_img)
	cover.src = cover_img
    else
	cover.style.display = "none"

    const title = document.getElementById("lastfm-music")
    title.innerText = data["name"] // if there's no fuckin' name then i'm exploding myself

    const album = document.getElementById("lastfm-album")
    const album_name = data?.["album"]?.["#text"]
    if (album_name)
        album.innerText = `from "${album_name}"`
    else
	album.style.display = "none"

    const author = document.getElementById("lastfm-author")
    const author_name = data?.["artist"]?.["#text"]
    if (author_name)
	author.innerText = `by ${author_name}`
    else
	author.style.display = "none"

    const widget = document.getElementById("lastfm-widget")
    widget.style.display = null;
}

function handleStatusCafeData(data) {
    const text = document.getElementById("statuscafe-text")
    text.innerText = `— ${data?.["face"]} ${data?.["content"]}`;

    const time = document.getElementById("statuscafe-time")
    time.innerText = `- ${data?.["timeAgo"]} - provided by `

    const widget = document.getElementById("statuscafe-widget");
    widget.style.display = null;
}

document.addEventListener("DOMContentLoaded", () => {
    // handle out events
    const lastfm_iframe = document.getElementById("lastfm-data")
    const statuscafe_iframe = document.getElementById("statuscafe-data")

    window.addEventListener("message", (event) => {
	switch (event.source) {
	    case lastfm_iframe.contentWindow:
		handleLastFMData(event.data);
		break;
	    case statuscafe_iframe.contentWindow:
		handleStatusCafeData(event.data);
		break;
	    default:
		break;
	}
    })
})
