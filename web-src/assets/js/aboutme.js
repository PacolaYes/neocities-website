

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

    console.log(data)
}

document.addEventListener("DOMContentLoaded", () => {
    // handle out events
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

    // handle out resizing the last.fm cover
    /*const cover = document.getElementById("lastfm-art")
    const widget_text = document.getElementById("lastfm-widget-text")

    const resize_observer = new ResizeObserver(() => {
	cover.style.height = "0"
	
	let current_height = widget_text.offsetHeight
	while (Math.abs(current_height - widget_text.offsetHeight) > 1)
	    current_height += (widget_text.offsetHeight - current_height) / 2
	
	cover.style.height = `${current_height}px`
    })

    resize_observer.observe(document.getElementById("lastfm-widget"))*/
})
