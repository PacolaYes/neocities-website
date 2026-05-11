
/*
	language stuff !!

	prettty janky,
	like REALLY janky
*/

var languages = {}
var language_names = ["english", "portuguese"]
var body_loaded = false
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
			window.localStorage.setItem("savedLang", "portuguese")
			setLanguage(
				getLocalStorageItem("savedLang", "english")
			)
			clearTimeout(lang_timeout)
		}
	})
	
	for (lang of language_names) {
		if (lang != cur_lang) {
			await loadLanguage(lang)
		}
	}
}

function setLanguage(lang) {
	if (!languages[lang]) {
		console.log(languages[lang])
		console.log(`Language ${lang} wasn't found.`)
		return
	}

	let language = languages[lang]
	for (element of document.querySelectorAll("[data-translationID]")) {
		let translationID = element.getAttribute("data-translationID")

		if (language[translationID] != null) {
			changeTextRecursive(element, language[translationID])
		}
	}
	document.documentElement.lang = language.lang || "en"

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

function switchLang() { // switch between english and portuguese, since thats the only languages :þ
	let savedLang = getLocalStorageItem("savedLang", "english")
	if (savedLang == "english") {
		setLanguage("portuguese")
	} else {
		setLanguage("english")
	}
}

document.addEventListener("DOMContentLoaded", () => (body_loaded = true), false);

loadLanguages()