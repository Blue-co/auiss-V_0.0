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
  const inputField = document.getElementById('youInput');
  
  // 현재 입력된 값에 줄바꿈 문자(\n)를 추가합니다.
  inputField.value += '\n';
  
  // 기본 엔터 동작(줄바꿈 후 다음 줄로 넘어가는 등)을 방지하고 싶다면 
  // event.preventDefault()가 필요할 수 있습니다.
}

function auScl(textarea) {
        textarea.style.height = 'auto' // 높이를 자동으로 초기화
        textarea.style.height = textarea.scrollHeight + 'px' // 스크롤 높이에 맞게 높이 설정
}
