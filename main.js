// ----------- PAGE LOADER -----------

async function loadMarkdown(url, targetId) {
  const res = await fetch(url);
  let text = await res.text();

  // strip YAML front matter
  if (text.trim().startsWith('---')) {
    const parts = text.split('---');
    if (parts.length >= 3) {
      text = parts.slice(2).join('---').trim();
    }
  }

  // remove ONLY the word "Title:"
  const lines = text.split('\n');
  if (lines[0].trim().toLowerCase().startsWith('title:')) {
    lines[0] = lines[0].replace(/title:\s*/i, '').trim();
  }

  const content = lines.join('\n');

  document.getElementById(targetId).innerHTML =
    marked.parse(content);
}

// ----------- LOAD STATIC PAGES -----------

loadMarkdown("/content/pages/who_i_am.md", "who_i_am");
loadMarkdown("/content/pages/what_im_working_on.md", "what_im_working_on");
loadMarkdown("/content/pages/how_to_reach_me.md", "how_to_reach_me");

// ----------- WORKS LIST -----------

async function loadWorksList() {

  const res = await fetch(
    "https://api.github.com/repos/ashmarietta/mfa-portfolio/contents/content/works"
  );
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

      const meta = parts[1].split('\n');

      meta.forEach(line => {
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

  let listHTML = "<h2>WHAT I’VE WRITTEN</h2><ul>";

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

// ----------- RUN IT -----------

loadWorksList();