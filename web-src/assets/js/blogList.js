
/*
    related to getting blogs
    on blogging
    (just showing all available blogs :P)
*/

const blogSelf = document.getElementById("blogScript")
const blogPath = blogSelf.getAttribute("data-blogPath") || "";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const blogs = []
const linkDiv = document.getElementById("blogLinks");

// you'd never guess from where i copied this from
// base.js
function addBlogs() {
  let links = [];
  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i]

    if (blog.name == null) { continue }

    let linkNode = document.createElement('a'); // is node even a good name for this??
    let name = document.createTextNode(blog.name);

    linkNode.appendChild(name);
    linkNode.href = blogPath + blog.file; // lonk
    linkNode.setAttribute("data-blogIndex", i)
    links.push({
      "node": linkNode,
      "item": blog
    })
    linksAdded++;
  }

  if (links.length == 0) { // yes, i know i don't need this. no, i'm not removing it
    let noblogs = document.createElement("p")
    noblogs.innerText = "No blogs have been added yet!"

    linkDiv.appendChild(noblogs);
  } else {
    links.sort(function(e1, e2) {
      var date1 = Date.parse(e1.item.date), date2 = Date.parse(e2.item.date)
      return date1 < date2 ? 1 : (date1 > date2 ? -1 : 0);
    })

    for (const i = 0; i < links.length; i++) {
      linkDiv.appendChild(links[i].node)
    }
  }
}

function sortByDate() {
  let links = []
  for (let i = 0; i < linkDiv.children.length; i++) {
    links.push(linkDiv.children[i])
  }

  links.sort(function(e1, e2) {
    var date1 = Date.parse(blogs[e1.getAttribute("data-blogIndex")].date), date2 = Date.parse(blogs[e2.getAttribute("data-blogIndex")].date)
    return date1 < date2 ? 1 : (date1 > date2 ? -1 : 0);
  })

  linkDiv.innerHTML = ''
  for (const i = 0; i < links.length; i++) {
    linkDiv.appendChild(links[i])
  }
}

document.addEventListener("DOMContentLoaded", addBlogs, false);

for (let i = 0; i < linkDiv.children.length; i++) {
  const child = linkDiv.children[i]
}