const urlParams = new URLSearchParams(window.location.search);

var x = urlParams.get("is") || ""
var y = urlParams.get("betterthan") || ""
x = x && x.trim()
y = y && y.trim()

/**
 * 
 * @param {URLSearchParams} params 
 * @returns 
 */
async function getWikipediaData(params) { // modified from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch :P
  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?format=json&${params}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result
  } catch (error) {
    console.error(error.message);
  }
}

async function getWikipediaImage(search) {
    try {
        let pageResult = await getWikipediaData(new URLSearchParams({
            action: "query",
            list: "search",
            srnamespace: "0",
            srsearch: search,
            srlimit: "max",
            format: "json",
            origin: "*"
        }))

        let pagesInfo = pageResult["query"]["search"]

        if (pagesInfo.length <= 0) { return }

        for (i = 0; i < pagesInfo.length; i++) {
            let pageInfo = pagesInfo[i]
            //action=query&titles=Mario&prop=pageprops&format=json
            let propsResult = await getWikipediaData(new URLSearchParams({
                action: 'query',
                titles: pageInfo["title"],
                prop: 'pageprops',
                format: 'json',
                origin: "*"
            }))
            
            let propsInfo = propsResult["query"]["pages"][pageInfo["pageid"]]["pageprops"]

            let imageResult = await getWikipediaData(new URLSearchParams({
                action: "query",
                titles: `File:${(propsInfo["page_image"] || propsInfo["page_image_free"])}`,
                prop: "imageinfo",
                iiprop: "url",
                format: "json",
                origin: "*"
            }))

            let imageInfo = imageResult["query"]["pages"]

            for (const key in imageInfo) {
                let value = imageInfo[key]
                console.log(value)
                if (value["imageinfo"] && value["imageinfo"][0]["url"]) {
                    return value["imageinfo"][0]["url"]
                }
            }
        }
    } catch (error) {
        console.error(error.message)
    }
}

function handleComparison() {
    if (x) {
        const titleX = document.getElementById("titleX")
        const inputX = document.getElementById("inputX")

        titleX.innerText = x
        inputX.value = x
    }

    if (y) {
        const titleY = document.getElementById("titleY")
        const inputY = document.getElementById("inputY")

        titleY.innerText = y
        inputY.value = y
    }
    
    if (x && y) {
        alert("TODO: handle out comparision :PP")
    }
}

async function betterthan_onLoad() {
    handleComparison()

    const inputX = document.getElementById("inputX")
    const inputY = document.getElementById("inputY")

    const placeholders = await getWikipediaData(new URLSearchParams({
        action: "query",
        list: "random",
        rnnamespace: "0",
        rnlimit: "2",
        origin: "*"
    }))

    inputX.placeholder = placeholders["query"]["random"][0]["title"]
    inputY.placeholder = placeholders["query"]["random"][1]["title"]

    if (x) {
        let imgURL = await getWikipediaImage(x)
        let imgX = document.getElementById("betterthan-Ximg")
        imgX.src = imgURL
    }

    if (y) {
        let imgURL = await getWikipediaImage(y)
        let imgY = document.getElementById("betterthan-Yimg")
        imgY.src = imgURL
    }
}

document.addEventListener("DOMContentLoaded", betterthan_onLoad, false);