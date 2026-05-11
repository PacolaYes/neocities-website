
/*
	language stuff !!

	prettty janky,
	like REALLY janky
*/
/*
var languages = { // since i couldnt figure out how to load external jsons :(
	"portuguese": {
		"index": {
			"mainWindow": {
				"title": "página principal",
				"content": [
					"opa! bem-vindo ao meu site!!",
					'sonic indo tipo "oii pessoa :D"',
					"aqui, neste cantinho da internet",
					"você pode encontrar coisas que eu faço, e coisas que eu escrevo",
					"mas eu ainda to trabalhando nele (as vezes) :P",
					"e se certifique de ver as outras páginas!!",
					"se você quiser, pelo menos",
					"CUIDADO DISPOSITIVOS MÓVEIS!!",
					"o site pode acabar te mordeno D:",
					"pelo menos foi o que me falaram!",
					'aé, aqui está o meu <a href="https://pacola.atabook.org/" target="_blank" rel="noopener noreferrer">guestbook</a>!!'
				],
			},

			"statuscafe": {
				"title": "trequinho do status cafe"
			},

			"characterWindow": {
				"title": "meu personagem",
				"content": [
					"insira personagem aqui :)"
				]
			},

			"pacThing": {
				"title": "coisa da pac do tempo",
				"content": [
					"sonic blast é um jogo",
          "legal, em minha opinião"
				]
			}
		},

		"aboutme": {
			"mainWindow": {
				"title": "sobre mim :D",
				"content": [
					"eu sou a pacola, mas tu pode me chamar só de pac também!",
          "eu vou por ela/dela (transfem!), gosto de sonic, programação, eu acho",
          "não sei muito o que dizer sobre mim, pra falar a verdade",
          "o que eu faço da minha vida?",
          "nada!! ...que é muito útil",
          "tirando isso, eu já:",
          "... já mencionei que eu gosto de sonic???"
				]
			},
			"aboutmeList": {
				"content": [
					"fiz alguns modzinhos estúpidos de srb2, tu podés encontrár algum deles na página de projetos!",
					'consegui dois 2 récordes mundiais de <a href="https://www.speedrun.com/sonicblast" target="_blank" rel="noopener noreferrer">Sonic Blast</a> (ambas categorias de sonic!), no qual eu estou muito orgulhosa :D',
					"um pouco de arte, nada chique",
					"um pouco de código, as vezes, nunca disse que era bom",
					"procastinei um monte"
				]
			}
		},

		"projects": {
			"glassMain2TheSequel": {
				"title": "os projetos (do srb2)",
				"content": [
					'alguns outros mods podem ser encontrados no meu <a href="https://github.com/PacolaYes" target="_blank" rel="noopener noreferrer">github</a> também, mas eles podem estar ou abandonados ou só inacabados :P'
				]
			},

			"blastHUDIMG": {
				"content": [
					"gif demonstrando o title card do Sonic Blast no SRB2"
				]
			},
			"blastHUDContent": {
				"content": [
					"<h2>Sonic Blast HUD</h2>",
					"Um mod de aparência simples, substitui o hud do SRB2 com aquele visto em Sonic Blast."
				]
			},

			"sunkyIMG": {
				"content": [
					"gif demonstrando o Sunky caindo de uma platafoma na Greenflower Zone act 1"
				]
			},
			"sunkyContent": {
				"content": [
					"<h2>Sunky</h2>",
					"adiciona o Sunky, versão atual é pra ser o mais perto que eu consegui do Sunky the Game, talvez ganhe uma atualização um dia, ou então eu espero!"
				]
			},

			"smwLuigiIMG": {
				"content": [
					"gif demonstrando o SMW Luigi fazendo dando pirueta, correndo e dislizano"
				]
			},
			"smwLuigiContent": {
				"content": [
					"<h2>SMW Luigi</h2>",
					"tenta adicionar o Luigi e algumas outras coisas do Super Mario World.",
          "Ainda sendo feito, as vezes. Mas você pode pegar algumas builds, as vezes também."
				]
			}
		},

		"blog-home": {
			"mainWindow": {
				"title": "blogs!!",
				"content": [
					"aqui é onde eu faço as coisas de \"blog\"",
          "não tenho certeza se é mesmo um blog, eu chamaria ele algo como:",
          '"lugar onde eu posso ou não as vezes escrever algo mas na maioria das vezes vai provavelmente ser um talvez não já que eu provavelmente não irei escrevê-lo mas pode talvez acontecer ou não"',
          "não tenho certeza do que mais escrever aqui, veja o treco da direita pros blogs",
          "se tiver algum :P"
				]
			},
			"blogList": {
				"title": "blogs listados"
			}
		},

		"global": {
			"thelinknames": [
				"página principal!",
				"sobre mim!",
				"meus projetos",
				"treco do blog"
			]
		}
	}
}
*/
var languages = {}
var language_names = ["english"]
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
	for (lang of language_names) {
		if (lang != cur_lang) {
			await loadLanguage(lang)
		}
	}
}

function setLanguage(lang) {
	if (!languages[lang]) {
		console.alert(`Language ${lang} wasn't found.`)
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

loadLanguages().then(() => {
	lang_timeout = setTimeout(() => {
		if (body_loaded) {
			setLanguage(
				getLocalStorageItem("savedLang", "english")
			)
			clearTimeout(lang_timeout)
		}
	})
})