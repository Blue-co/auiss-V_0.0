let editIdx = null;
const text = document.getElementById('youInput').value;

function youC() {
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
  text.innerHTML = '<br>';
}
