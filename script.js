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
  const res = await fetch("https://api.github.com/repos/ashmarietta/mfa-portfolio/contents/content/works");
  const files = await res.json();

  let listHTML = "<h2>What I’ve Written</h2><ul>";

  files
    .filter(file => file.name.endsWith(".md"))
    .forEach(file => {
      const slug = file.name.replace(".md", "");
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