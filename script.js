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

// TODO later: list works – we’ll do this next