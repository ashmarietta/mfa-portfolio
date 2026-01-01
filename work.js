function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

async function loadWork() {
  const slug = getQueryParam("slug");

  if (!slug) {
    document.getElementById("work-content").innerHTML =
      "<p>Work not found.</p>";
    return;
  }

  const res = await fetch(`/content/works/${slug}.md`);
  const text = await res.text();

  document.getElementById("work-content").innerHTML =
    marked.parse(text);
}

loadWork();

async function loadWorksList() {
  const res = await fetch("https://api.github.com/repos/ashmarietta/mfa-portfolio/contents/content/works");
  const files = await res.json();

  let listHTML = "<h2>What I’ve Written</h2><ul>";

  for (const file of files) {
    if (!file.name.endsWith(".md")) continue;

    const slug = file.name.replace(".md", "");

    // fetch the markdown file
    const contentRes = await fetch(`/content/works/${file.name}`);
    const text = await contentRes.text();

    // try to read the title from front-matter
    let title = slug.replace(/-/g, " "); // fallback

    const match = text.match(/title:\s*(.+)/);
    if (match) {
      title = match[1].trim();
    }

    listHTML += `
      <li>
        <a href="/work.html?slug=${slug}">
          ${title}
        </a>
      </li>`;
  }

  listHTML += "</ul>";

  document.getElementById("what_ive_written").innerHTML = listHTML;
}

loadWorksList();

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