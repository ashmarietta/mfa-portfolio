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
  const res = await fetch("/content/works/");
  const html = await res.text();

  const parser = new DOMParser();
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