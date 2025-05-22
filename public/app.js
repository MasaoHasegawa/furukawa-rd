async function load(path = '') {
  const res = await fetch('/api/list?path=' + encodeURIComponent(path));
  const data = await res.json();
  window.currentPath = data.path;
  const list = document.getElementById('fileList');
  list.innerHTML = '';
  data.entries.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry.name;
    li.addEventListener('click', () => {
      if (entry.isDirectory) {
        load(data.path + '/' + entry.name);
      } else {
        window.open(data.path + '/' + entry.name, '_blank');
      }
    });
    li.addEventListener('contextmenu', async (e) => {
      e.preventDefault();
      await fetch('/api/open', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({path: data.path + '/' + entry.name})
      });
    });
    list.appendChild(li);
  });
}

document.getElementById('bookmarkBtn').addEventListener('click', async () => {
  await fetch('/api/bookmark', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({path: window.currentPath})
  });
});

load();
