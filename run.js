javascript:(function(){
  let count = 0;
  let secondsElapsed = 0;
  let interval;

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

  const stopBtn = document.createElement('button');
  stopBtn.textContent = 'Stop';
  stopBtn.style.padding = '4px 8px';
  stopBtn.style.backgroundColor = '#d9534f';
  stopBtn.style.color = 'white';
  stopBtn.style.border = 'none';
  stopBtn.style.borderRadius = '4px';
  stopBtn.style.cursor = 'pointer';

  stopBtn.onclick = () => {
    clearInterval(interval);
    clearInterval(timerInterval);
    stopBtn.textContent = 'Stopped';
    stopBtn.style.backgroundColor = 'gray';
  };

  wrapper.appendChild(counterSpan);
  wrapper.appendChild(timeSpan);
  wrapper.appendChild(stopBtn);
  assignee.parentNode.insertBefore(wrapper, assignee.nextSibling);

  interval = setInterval(() => {
    const btn = document.querySelector('material-icon[icon="refresh"]');
    if (btn) {
      btn.click();
      count++;
      updateDisplay();
    }
  }, 1000);

  const timerInterval = setInterval(() => {
    secondsElapsed++;
    updateDisplay();
  }, 1000);

  updateDisplay();
})();
