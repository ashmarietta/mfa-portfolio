fetch("http://127.0.0.1:8000/works")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("works");
    container.innerHTML = "";

    data.forEach(work => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h2>${work.title}</h2>
        <p>${work.content}</p>
      `;
      container.appendChild(div);
    });
  });