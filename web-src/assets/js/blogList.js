
/*
    related to getting blogs
    on blogging
    (just showing all available blogs :P)
*/

let blogSelf = document.getElementById("blogScript")
let blogPath = blogSelf.getAttribute("data-blogPath") || "";
let blogs = []

// you'd never guess from where i copied this from
// base.js
function addBlogs() {
  let linkDiv = document.getElementById("blogLinks");
  let linksAdded = 0;
  for (let i = 0; i < blogs.length; i++) {
    let link = blogs[i]
    let linkNode = document.createElement('a'); // is node even a good name for this??
    let name = document.createTextNode(link[0]);

    linkNode.appendChild(name);
    linkNode.href = blogPath + link[1]; // lonk
    linkDiv.appendChild(linkNode);
    linksAdded++;
  }

  if (linksAdded == 0) { // yes, i know i don't need this. no, i'm not removing it
    let noblogs = document.createElement("p")
    noblogs.innerText = "No blogs have been added yet!"

    linkDiv.appendChild(noblogs);
  }
}

document.addEventListener("DOMContentLoaded", addBlogs, false);