javascript:(function(){
  let count = 0;
  let secondsElapsed = 0;
  let interval = null;
  let timerInterval = null;
  let isRunning = true;

  const assignee = document.querySelector('[debug-id="assignee"]');
  if (!assignee) {
    alert("Assignee öğesi bulunamadı.");
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.style.display = 'inline-flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.marginLeft = '10px';
  wrapper.style.gap = '10px';

  const counterSpan = document.createElement('span');
  counterSpan.style.fontWeight = 'bold';
  counterSpan.style.color = 'green';

  const timeSpan = document.createElement('span');
  timeSpan.style.color = 'blue';
  timeSpan.style.fontWeight = 'bold';

  function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  }

  function updateDisplay() {
    counterSpan.textContent = `Clicks: ${count}`;
    timeSpan.textContent = `Time: ${formatTime(secondsElapsed)}`;
  }

  function startClicking() {
    if (interval || timerInterval) return;
    interval = setInterval(() => {
      const btn = document.querySelector('material-icon[icon="refresh"]');
      if (btn) {
        btn.click();
        count++;
        updateDisplay();
      }
    }, 1000);
    timerInterval = setInterval(() => {
      secondsElapsed++;
      updateDisplay();
    }, 1000);
  }

  function stopClicking() {
    clearInterval(interval);
    clearInterval(timerInterval);
    interval = null;
    timerInterval = null;
  }

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = 'Stop';
  toggleBtn.style.padding = '4px 8px';
  toggleBtn.style.backgroundColor = '#d9534f';
  toggleBtn.style.color = 'white';
  toggleBtn.style.border = 'none';
  toggleBtn.style.borderRadius = '4px';
  toggleBtn.style.cursor = 'pointer';

  toggleBtn.onclick = () => {
    if (isRunning) {
      stopClicking();
      toggleBtn.textContent = 'Start';
      toggleBtn.style.backgroundColor = '#5cb85c';
    } else {
      startClicking();
      toggleBtn.textContent = 'Stop';
      toggleBtn.style.backgroundColor = '#d9534f';
    }
    isRunning = !isRunning;
  };

  wrapper.appendChild(counterSpan);
  wrapper.appendChild(timeSpan);
  wrapper.appendChild(toggleBtn);
  assignee.parentNode.insertBefore(wrapper, assignee.nextSibling);

  updateDisplay();
  startClicking();
})();
