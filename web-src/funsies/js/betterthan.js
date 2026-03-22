const urlParams = new URLSearchParams(window.location.search);

// string .getCharAt for the comparisons !!

var betterThan = null
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
                if (value["imageinfo"] && value["imageinfo"][0]["url"]) {
                    return value["imageinfo"][0]["url"]
                }
            }
        }
    } catch (error) {
        console.error(error.message)
    }

    return "/assets/img/imgnotfound.png"
}

function handleComparison() {
    if (x) {
        const titleX = document.getElementById("titleX")
        const inputX = document.getElementById("inputX")
        const descX = document.getElementById("betterthan-Xdesc")

        titleX.innerText = x
        inputX.value = x
        descX.innerText = x
    }

    if (y) {
        const titleY = document.getElementById("titleY")
        const inputY = document.getElementById("inputY")
        const descY = document.getElementById("betterthan-Ydesc")

        titleY.innerText = y
        inputY.value = y
        descY.innerText = y
    }
    
    if (x && y) {
        // https://ao.bloat.cat/questions/94037/convert-character-to-ascii-code-in-javascript#30887763
        // (insert og stack overflow thingie here)
        let xSum = x.toLowerCase().split('').map(char => char.charCodeAt(0)).reduce((current, previous) => previous + current)
        let ySum = y.toLowerCase().split('').map(char => char.charCodeAt(0)).reduce((current, previous) => previous + current)
        let sum = xSum + ySum

        if (xSum == ySum) {
            betterThan = "same"
        } else {
            if (sum % 2 == 0) {
                betterThan = true
            } else {
                betterThan = false
            }
        }
    }
}

var loadingNum = 0
function handleLoading() {
    const loading = document.getElementById("betterthan-loading")
    loading.innerText = "Computing" + ".".repeat(loadingNum)

    if (loadingNum++ >= 3) {
        loadingNum = 0
    }
}

async function betterthan_onLoad() {
    handleComparison()

    if (betterThan != null) {
        const loading = document.getElementById("betterthan-loading")
        loading.style.display = null

        handleLoading()
        var loadingID = setInterval(handleLoading, 1000)
    }

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

    if (betterThan == null) { return }

    let imgXURL = await getWikipediaImage(x)
    let imgX = document.getElementById("betterthan-Ximg")
    imgX.src = imgXURL
    
    let imgYURL = await getWikipediaImage(y)
    let imgY = document.getElementById("betterthan-Yimg")
    imgY.src = imgYURL

    // artificial loading baybee
    setTimeout(() => {
        const result1 = document.getElementById("betterthan-result")
        const result2 = document.getElementById("betterthan-resultp2")
        switch (betterThan) {
            case true:
                result1.innerText = "Yes!"
                result2.innerText = "IS better than"
                break
            case false:
                result1.innerText = "No."
                result2.innerText = "IS NOT better than"
                break
            case "same":
                result1.innerText = "Of course not, as"
                result2.innerText = "is the same as"
                break
        }

        const resultDiv = document.getElementById("betterthan-resultDiv")
        resultDiv.style.display = null

        const loading = document.getElementById("betterthan-loading")
        loading.style.display = "none"
        
        window.clearInterval(loadingID)
    }, 4000)
}

document.addEventListener("DOMContentLoaded", betterthan_onLoad, false);