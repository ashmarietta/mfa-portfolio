async function loadMarkdown(url, targetId) {
  const res = await fetch(url);
  const text = await res.text();
  document.getElementById(targetId).innerHTML =
    marked.parse(text);
}

async function loadMarkdown(url, targetId) {
  const res = await fetch(url);
  const text = await res.text();

  // strip YAML front-matter if present
  const parts = text.split('---');
  let content = text;

  if (parts.length > 2) {
    content = parts.slice(2).join('---');
  }

  // remove a leading "Title:" label if present
  content = content.replace(/^Title:\s*/i, '');

  document.getElementById(targetId).innerHTML =
    marked.parse(content);
}


async function loadWorksList() {
  const res = await fetch("https://api.github.com/repos/ashmarietta/mfa-portfolio/contents/content/works");
  const files = await res.json();

  const works = [];

  for (const file of files) {
    if (!file.name.endsWith(".md")) continue;

    const slug = file.name.replace(".md", "");

    const contentRes = await fetch(`/content/works/${file.name}`);
    const text = await contentRes.text();

    const parts = text.split('---');

    let title = slug.replace(/-/g, " ");
    let date = "1970-01-01";

    if (parts.length > 2) {
      parts[1].split('\n').forEach(line => {
        if (line.startsWith("title:")) {
          title = line.replace("title:", "").trim();
        }
        if (line.startsWith("date:")) {
          date = line.replace("date:", "").trim();
        }
      });
    }

    works.push({ slug, title, date });
  }

  // newest first
  works.sort((a, b) => new Date(b.date) - new Date(a.date));

  let listHTML = "<h2>What I’ve Written</h2><ul>";

  works.forEach(work => {
    listHTML += `
      <li>
        <a href="/work.html?slug=${work.slug}">
          ${work.title}
        </a>
      </li>`;
  });

  listHTML += "</ul>";

  document.getElementById("what_ive_written").innerHTML = listHTML;
}

loadWorksList();