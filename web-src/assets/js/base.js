
/*
    js file for some base functionality,
    includes stuff like:
      * adding the links to the links part (i think its easier to automate it than to update all pages :D)
      * dark & light mode handling
*/

/*
  links in the links part
*/

/*
  link template:
  [
    text; string; Text to be displayed in the page;
    link; string; Link to the page to be redirected to;
    translationID; string; ID used for translations.
  ]
*/

var links = [
  ["home!", "index.html", "home"],
  ["about me!", "aboutme.html", "about-me"],
  ["find me", "findme.html", "find-me"],
  ["my projects", "projects.html", "projects"],
  ["blog thingie", "blogposts/blog-home.html", "blog-home"]
]

let self = document.currentScript
const rootPath = self && (self.getAttribute("data-root") || "./") || "/" // so people just using file:// can also access stuff (and github pages)

function addLinks() {
  let linkDiv = document.getElementById("coolLinks");
  for (let i = 0; i < links.length; i++) {
    let link = links[i]
    let linkNode = document.createElement('a'); // is node even a good name for this??
    let name = document.createTextNode(link[0]);

    linkNode.appendChild(name);
    linkNode.href = rootPath + link[1]; // lonk
    linkNode.setAttribute("data-translationID", link[2]);
    linkDiv.appendChild(linkNode);
  }
}

function getLocalStorageItem(item, defaultval=null) {
  let founditem = window.localStorage.getItem(item)
  
  if (!founditem && defaultval != null) {
    window.localStorage.setItem(item, defaultval)
    return
  }
  return founditem || defaultval
}

/*
  dark and light mode!!
  also has cookies for them
  i like cookies
  they're yummy

  UPDATE: there's no more cookies
  i ate all of them
  no, i'm not deleting the mentions
*/

function switchTheme() {
  let html = document.documentElement;
  let classes = html.classList

  classes.toggle("dark");
  classes.toggle("light");

  window.localStorage.setItem("savedTheme", classes[0])
}

function loadSavedTheme() {
  let savedTheme = getLocalStorageItem("savedTheme", "light")
  
  if (savedTheme == "dark") {
    switchTheme();
  }
}

/*
  function when body loads :P
*/

function bodyLoad() {
  addLinks();
  loadSavedTheme();
}

document.addEventListener("DOMContentLoaded", bodyLoad, false);