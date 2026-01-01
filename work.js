function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

async function loadWork() {
  const slug = getQueryParam("slug");

  const res = await fetch(`/content/works/${slug}.md`);
  const text = await res.text();

  // split YAML front-matter
  const parts = text.split('---');

  let metadata = {};
  let content = text;

  if (parts.length > 2) {
    const yaml = parts[1];
    content = parts.slice(2).join('---');

    yaml.split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) {
        metadata[key.trim()] = rest.join(':').trim();
      }
    });
  }

  // Title fallback
  const title = metadata.title || slug.replace(/-/g, ' ');

  document.title = title + " — Allison Marietta";

  document.getElementById("work-content").innerHTML = `
    <h1>${title}</h1>
    ${marked.parse(content)}
  `;
}

loadWork();