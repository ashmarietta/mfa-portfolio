async function loadMarkdown(url, targetId) {
  const res = await fetch(url);
  const text = await res.text();
  document.getElementById(targetId).innerHTML =
    marked.parse(text);
}

// Single pages
loadMarkdown("/content/pages/who_i_am.md", "who_i_am");
loadMarkdown("/content/pages/how_to_reach_me.md", "how_to_reach_me");
loadMarkdown("/content/pages/what_im_working_on.md", "what_im_working_on");

async function loadWorksList() {
  const res = await fetch("/content/works/");
  const parser = new DOMParser();
  const html = await res.text();
  const doc = parser.parseFromString(html, "text/html");

  const links = [...doc.querySelectorAll("a")]
    .map(a => a.getAttribute("href"))
    .filter(href => href.endsWith(".md"));

  let listHTML = "<h2>What I’ve Written</h2><ul>";

  links.forEach(file => {
    const slug = file.replace(".md", "");
    const title = slug.replace(/-/g, " ");

    listHTML += `
      <li>
        <a href="/work.html?slug=${slug}">
          ${title}
        </a>
      </li>`;
  });

  listHTML += "</ul>";

  document.getElementById("what_ive_written").innerHTML = listHTML;
}

loadWorksList();