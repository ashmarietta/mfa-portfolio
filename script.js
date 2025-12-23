async function loadMarkdown(url, elementId) {
  const response = await fetch(url);
  const text = await response.text();
  document.getElementById(elementId).innerHTML =
    marked.parse(text);
}

loadMarkdown("/content/pages/who.md", "who");
loadMarkdown("/content/pages/contact.md", "contact");

fetch("/content/pages/working.md")
  .then(res => res.text())
  .then(text => {
    const data = text.split('---').pop();
    const lines = data.split('\n');
    let reading = '';
    let writing = '';
    let current = null;

    lines.forEach(line => {
      if (line.startsWith('## Reading')) current = 'reading';
      else if (line.startsWith('## Writing')) current = 'writing';
      else if (current === 'reading') reading += line + '\n';
      else if (current === 'writing') writing += line + '\n';
    });

    document.getElementById("working").innerHTML = `
      <h2>What I’m Working On</h2>
      <h3>What I’m Reading</h3>
      ${marked.parse(reading)}
      <h3>What I’m Writing</h3>
      ${marked.parse(writing)}
    `;
  });