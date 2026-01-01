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

  const works = [];

  for (const file of files) {
    if (!file.name.endsWith(".md")) continue;

    const slug = file.name.replace(".md", "");

    const contentRes = await fetch(`/content/works/${file.name}`);
    const text = await contentRes.text();

    // TITLE — fallback to slug if missing
    let title = slug.replace(/-/g, " ");
    const titleMatch = text.match(/title:\s*(.+)/);
    if (titleMatch) title = titleMatch[1].trim();

    // DATE — fallback to 1970 if missing
    let date = "1970-01-01";
    const dateMatch = text.match(/date:\s*([0-9-]+)/);
    if (dateMatch) date = dateMatch[1];

    works.push({ slug, title, date });
  }

  // sort newest → oldest
  works.sort((a, b) => new Date(b.date) - new Date(a.date));

  // render list
  let listHTML = "<h2>What I’ve Written</h2><ul>";

  works.forEach(work => {
    listHTML += `
      <li>
        <a href="/work.html?slug=${work.slug}">
          ${work.title}
        </a>
        <span class="work-date">${work.date}</span>
      </li>`;
  });

  listHTML += "</ul>";

  document.getElementById("what_ive_written").innerHTML = listHTML;
}

loadWorksList();