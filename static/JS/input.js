let editIdx = null;

function youC() {
  const text = document.getElementById('youInput').value;
  if (!text.trim()) return;
  const currentIdeas = JSON.parse(localStorage.getItem('ideas') || '[]');
  if (editIdx !== null) {
    currentIdeas[editIdx] = text;
    editIdx = null;
  } else {
    currentIdeas.push(text);
  }
  localStorage.setItem('ideas', JSON.stringify(currentIdeas));
  loadStoredIdea();
  document.getElementById('youInput').value = '';
  scrollToBottom();
}

function brE() {
  const text = document.getElementById('youInput');
  text.innerHTML = '<br>';
}
