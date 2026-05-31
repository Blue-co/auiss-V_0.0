// 입력한 매시지를 저장하는 함수를 선언합니다.
function loadStoredIdea() {
  const savedIdea = localStorage.getItem('ideas'); // localStorage를 통하여 ideas라는 항목을 불릅니다.
  if (savedIdea) {
    const idArray = JSON.parse(savedIdea); // idArray라는 항목을 만듭니다.
    document.getElementById('45tr').innerHTML = idArray // 방금 만든 idArray라는 항목을 채팅창에 모두 불러와줍니다.
      .map(
        (item, idx) =>
          `<div class='chat-bubble user' data-idx='${idx}'><div class='chat-pront'>${item.replace(
            /\n/g,
            '<br>'
          )}</div>
                    <div class='chat-bubble_button-box'>
                      <button class='re' width='39px' onclick='editMsg(${idx})' width='130px'><img src='https://i.ibb.co/G4FKXrpM/Screenshot-20250927-115825-Gallery.jpg' width='100%' height='100%' margin='0' padding='0' alt='Edit'></button>
                      <button class='emov' onclick='deleteMsg(${idx})'><img src='https://i.ibb.co/7xn7gsxx/Screenshot-20250927-115038-Samsung-Notes.jpg' width='100%' height='100%' margin='0' padding='0' alt='Delete'></button>
                    </div>
                </div>`
      )
      .join('');

    // 모바일(터치)에서만 스와이프 핸들러 연결
    try {
      if (
        'ontouchstart' in window &&
        window.matchMedia('(max-width: 550px)').matches
      ) {
        const chatBox = document.getElementById('45tr');
        const bubbles = chatBox.querySelectorAll('.chat-bubble');
        bubbles.forEach((bubble) => {
          let startX = 0;
          let startY = 0;
          let moved = false;
          let currentX = 0;

          bubble.style.transition = 'transform 0.2s ease';

          function onTouchStart(e) {
            if (!e.touches || e.touches.length !== 1) return;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            moved = false;
            currentX = 0;
            bubble.style.transition = '';
            bubble.classList.remove('swipe-right', 'swipe-left');
          }

          function onTouchMove(e) {
            if (!e.touches || e.touches.length !== 1) return;
            const dx = e.touches[0].clientX - startX;
            const dy = e.touches[0].clientY - startY;
            if (Math.abs(dy) > Math.abs(dx)) return; // 세로 스크롤 우선
            e.preventDefault();
            moved = true;
            currentX = dx;
            bubble.style.transform = `translateX(${dx}px)`;

            // 스와이프 방향에 따라 시각적 피드백
            if (dx > 30) {
              // 수정 방향
              bubble.classList.add('swipe-left');
              bubble.classList.remove('swipe-right');
            } else if (dx < -30) {
              // 삭제 방향
              bubble.classList.add('swipe-right');
              bubble.classList.remove('swipe-left');
            } else {
              // 아무것도 수행 못한 상태
              bubble.classList.remove('swipe-right', 'swipe-left');
            }
          }

          function onTouchEnd() {
            if (!moved) {
              bubble.style.transition = 'transform 0.2s ease';
              bubble.style.transform = '';
              return;
            }
            const threshold = 80; // 임계값 증가
            const idx = parseInt(bubble.getAttribute('data-idx'), 10);
            bubble.style.transition = 'transform 0.2s ease';

            if (currentX > threshold) {
              // R로 밀기 -> 삭제
              bubble.style.transform = 'translateX(-100px)';
              setTimeout(() => {
                deleteMsg(idx);

                bubble.classList.remove('swipe-left');
              }, 200);
            } else if (currentX < -threshold) {
              // L로 밀기 -> 수정
              bubble.style.transform = 'translateX(100px)';
              setTimeout(() => {
                editMsg(idx);
                bubble.style.transform = '';
                bubble.classList.remove('swipe-right');
              }, 200);
            } else {
              bubble.style.transform = '';
              bubble.classList.remove('swipe-right', 'swipe-left');
            }
          }

          bubble.addEventListener('touchstart', onTouchStart, {
            passive: true,
          });
          bubble.addEventListener('touchmove', onTouchMove, { passive: false });
          bubble.addEventListener('touchend', onTouchEnd);
        });
      }
    } catch (err) {
      console.error('Swipe handlers init error:', err);
    }
  }
  scrollToBottom();
}

function scrollToBottom() {
  const chatBox = document.getElementById('45tr');
  chatBox.scrollTop = chatBox.scrollHeight;
}

function deleteMsg(idx) {
  const ideas = JSON.parse(localStorage.getItem('ideas') || '[]');
  ideas.splice(idx, 1);
  localStorage.setItem('ideas', JSON.stringify(ideas));
  loadStoredIdea();
  editIdx = null;
  document.getElementById('youInput').value = '';
}

function editMsg(idx) {
  const ideas = JSON.parse(localStorage.getItem('ideas') || '[]');
  document.getElementById('youInput').value = ideas[idx];
  editIdx = idx;
}
