
/*
	language stuff !!

	prettty janky,
	like REALLY janky
*/

/* 
	[ "json file", "dropdown choice name" ]
*/
var language_names = [
	["english", "English"],
	["portuguese", "Português"]
]

// https://overflow.hostux.net/questions/14226803/wait-5-seconds-before-executing-next-line#47480429
const delay = ms => new Promise(res => setTimeout(res, ms));

var languages = {}
var body_loaded = false
var languages_loaded = false
var lang_timeout = 0

async function loadLanguage(name) {
	await fetch(`${rootPath}assets/lang/${name}.json`).then(async (response) => {
		if (!response.ok) {
			throw new Error(`Unable to get ${name} due to HTTP error ${response.status}`)
		}

		let json = await response.json()
		languages = {...languages, ...json}
	})
}

async function loadLanguages() {
	let cur_lang = getLocalStorageItem("savedLang", "english")

	await loadLanguage(cur_lang)

	lang_timeout = setTimeout(() => {
		if (body_loaded) {
			setLanguage(
				getLocalStorageItem("savedLang", "english")
			)
			clearTimeout(lang_timeout)
		}
	})
	
	for (lang_list of language_names) {
		if (lang_list[0] != cur_lang) {
			await loadLanguage(lang_list[0])
		}
	}
	languages_loaded = true
}

/**
 * 
 * @param {string} attr 
 * @param {string?} lang
 */
async function getLanguageAttribute(attr, lang) {
	while (!languages_loaded)
		await delay()

	if (!lang)
		lang = getLocalStorageItem("savedLang", "english")
	
	return languages[lang][attr]
}

let language_set_events = []
async function setLanguage(lang) {
	if (!languages[lang]) {
		let found = false
		for (lang_list of language_names) {
			if (lang_list[0] == lang) {
				found = true
				while (!languages[lang]) {
					await delay()
				}
				break
			}
		}

		if (!found) {
			console.log(`Language ${lang} wasn't found and isn't real.`)
			return
		}
	}

	let language = languages[lang]
	for (element of document.querySelectorAll("[data-translationID]")) {
		let translationID = element.getAttribute("data-translationID")

		if (language[translationID] != null) {
			changeTextRecursive(element, language[translationID])
		}
	}
	document.documentElement.lang = language.lang || "en"

	for (func of language_set_events) {
		func(lang)
	}

	window.localStorage.setItem("savedLang", lang)
}

/**
 * 
 * @param {Node} node 
 * @param {*} values 
 * @param {number} recurse 
 */
function changeTextRecursive(node, values, debug) {
	if (typeof values != "object") {
		values = [values]
	}

	if (node.childNodes.length <= 0) { return 0 }

	let recurse = 0
	for (child_node of node.childNodes) {
		let value = values[Math.min(recurse, values.length-1)]
		let add_recurse = false

		if (debug) {
			debugger;
		}

		switch (child_node.nodeType) {
			case Node.ELEMENT_NODE:
				if (Boolean(child_node.getAttribute("data-ignoreTranslation"))) {
					continue
				}

				switch (child_node.nodeName) {
					case "IMG":
						child_node.alt = value
						add_recurse = true
						break
					case "BR": break
					default:
						if (child_node.nodeType) {
							changeTextRecursive(child_node, value, debug)
							add_recurse = true
						}
						break
				}
				break
			case Node.TEXT_NODE:
				if (child_node.nodeValue.trim() != "") {
					add_recurse = true
					child_node.nodeValue = value
				}
				break
		}

		if (add_recurse) {
			recurse += 1;
		}
		if (debug) {
			console.log(`add_recurse ${recurse}`)
		}
	}
	if (debug)
		console.log(`end value ${recurse}`)
	return recurse
}

document.addEventListener("DOMContentLoaded", () => {
	body_loaded = true

	var language_selector = document.getElementById("language-selector")
	let index = 0
	for (lang_list of language_names) {
		let option = document.createElement("option")
		option.value = lang_list[0]
		option.appendChild(document.createTextNode(lang_list[1]))

		language_selector.add(option)
		if (getLocalStorageItem("savedLang", "english") == lang_list[0])
			language_selector.value = lang_list[0]
		
	}
	language_selector.addEventListener("change", (event) => setLanguage(event.target.value))
}, false);

loadLanguages()