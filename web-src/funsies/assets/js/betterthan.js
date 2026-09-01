const urlParams = new URLSearchParams(window.location.search);

// string .getCharAt for the comparisons !!

var betterThan = null
var xySum = 0
var x = urlParams.get("is") || ""
var y = urlParams.get("betterthan") || ""
x = x && x.trim()
y = y && y.trim()

var iframe_loaded = false;

function waitForMessage(type, origin, source) {
    return new Promise((resolve) => {
	const listener = (event) => {
	    if (event.origin !== origin) return;
	    if (event.data?.["message_type"] !== type) return;
	    if (event.data?.["message_source"] !== source) return;

	    window.removeEventListener("message", listener);
	    resolve(event.data);
	}
	window.addEventListener("message", listener);
    })
}

/**
 * 
 * @param {URLSearchParams} params 
 * @returns 
 */
async function getWikipediaData(params) { // modified from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch :P
    try {
	if (!iframe_loaded) {
	    await waitForMessage("iframe-loaded", "https://pacolayes.github.io", "wikipedia");
	    console.log("loaded!")
	    iframe_loaded = true;
	}

	const api_iframe = document.getElementById("wikipedia-api")
	api_iframe.contentWindow.postMessage(params, "*");

	return waitForMessage("wikipedia-response", "https://pacolayes.github.io", "wikipedia");
    } catch (error) {
	console.error(error.message);
    }
}

async function getRandomWikipediaArticles() {
    const wikipediaData = await getWikipediaData({
        action: "query",
        list: "random",
        rnnamespace: "0",
        rnlimit: "2",
        origin: "*"
    })

    return wikipediaData["query"]["random"]
}

async function getWikipediaImage(search) {
    try {
        let pageResult = await getWikipediaData({
            action: "query",
            list: "search",
            srnamespace: "0",
            srsearch: search,
            srlimit: "max",
            format: "json",
            origin: "*"
        })

        let pagesInfo = pageResult["query"]["search"]

        if (pagesInfo.length <= 0) { return }

        for (i = 0; i < pagesInfo.length; i++) {
            let pageInfo = pagesInfo[i]
            //action=query&titles=Mario&prop=pageprops&format=json
            let propsResult = await getWikipediaData({
                action: 'query',
                titles: pageInfo["title"],
                prop: 'pageprops',
                format: 'json',
                origin: "*"
            })
            
            let propsInfo = propsResult["query"]["pages"][pageInfo["pageid"]]["pageprops"]

            let imageResult = await getWikipediaData({
                action: "query",
                titles: `File:${(propsInfo["page_image"] || propsInfo["page_image_free"])}`,
                prop: "imageinfo",
                iiprop: "url",
                format: "json",
		iiurlheight: "128",
                origin: "*"
            })

            let imageInfo = imageResult["query"]["pages"]

            for (const key in imageInfo) {
                let value = imageInfo[key]
                if (value?.["imageinfo"]?.[0]?.["thumburl"]) {
                    return value["imageinfo"][0]["thumburl"]
                }
            }
        }
    } catch (error) {
        console.error(error.message)
    }
    
    return "../assets/img/imgnotfound.png"
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
        let coolX = x.toLowerCase().trim()
        let coolY = y.toLowerCase().trim()
        let xSum = coolX.split('').map(char => char.charCodeAt(0)).reduce((current, previous) => previous + current)
        let ySum = coolY.split('').map(char => char.charCodeAt(0)).reduce((current, previous) => previous + current)
        xySum = xSum - ySum
        if (xySum < 0) {
            xySum = -xySum + 1
        }

        if (xSum == ySum) {
            betterThan = "same"
        } else {
            if (xySum % 2 == 0) {
                betterThan = true
            } else {
                betterThan = false
            }
        }
    }
    document.title = `is ${x || "(X)"} better than ${y || "(Y)"}?`
}

var loadingNum = 0
async function handleLoading() {
    const computing = await getLanguageAttribute("betterthan-computing")
    const loading = document.getElementById("betterthan-loading")
    loading.innerText = computing + ".".repeat(loadingNum)

    if (loadingNum++ >= 3) {
        loadingNum = 0
    }
}

var betterthan_loaded = false

async function showResults(lang) {
    if (!betterthan_loaded) { return }

    const result1 = document.getElementById("betterthan-result")
    const result2 = document.getElementById("betterthan-resultp2")
    const result3 = document.getElementById("betterthan-resultp3")
    const responses = await getLanguageAttribute("betterthan-responses", lang)
    let response
    switch (betterThan) {
        case true:
            response = responses["yes"]

            result1.innerText = response[0][Math.trunc(Math.random() * response[0].length)]
            result2.innerText = response[1][xySum % response[1].length][0]
            result3.innerText = response[1][xySum % response[1].length][1]
            break
        case false:
            response = responses["no"]

            result1.innerText = response[0][Math.trunc(Math.random() * response[0].length)]
            result2.innerText = response[1][xySum % response[1].length][0]
            result3.innerText = response[1][xySum % response[1].length][1]
            break
        case "same":
            response = responses["same"]

            result1.innerText = response[0][Math.trunc(Math.random() * response[0].length)]
            result2.innerText = response[1][xySum % response[1].length][0]
            result3.innerText = response[1][xySum % response[1].length][1]
            break
    }

    if (result3.innerText && result3.innerText != "undefined") {
        result3.style.display = null
    }
}

async function betterthan_onLoad() {
    handleComparison()

    if (betterThan != null) {
        const loading = document.getElementById("betterthan-loading")
        loading.style.display = null

        await handleLoading()
        var loadingID = setInterval(handleLoading, 1000)
    }

    const inputX = document.getElementById("inputX")
    const inputY = document.getElementById("inputY")

    const placeholders = await getRandomWikipediaArticles()

    inputX.placeholder = placeholders[0]["title"]
    inputY.placeholder = placeholders[1]["title"]

    if (betterThan == null) { return }

    let imgXURL = await getWikipediaImage(x)
    let imgX = document.getElementById("betterthan-Ximg")
    imgX.src = imgXURL
    
    let imgYURL = await getWikipediaImage(y)
    let imgY = document.getElementById("betterthan-Yimg")
    imgY.src = imgYURL

    // artificial loading baybee
    betterthan_loaded = true
    setTimeout(async () => {
	await showResults()

	const resultDiv = document.getElementById("betterthan-resultDiv")
	resultDiv.style.display = null

	const loading = document.getElementById("betterthan-loading")
	loading.style.display = "none"
	
	window.clearInterval(loadingID)
    }, 2000)
}

document.addEventListener("DOMContentLoaded", betterthan_onLoad, false);
language_set_events.push(showResults)
