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