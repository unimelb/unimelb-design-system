const PROMPT_ID = 'uom-prompt';
const PROMPT_CLASS = PROMPT_ID;
const STORAGE_KEY = 'uomPromptRetry';

function renderPrompt(root, content, opts) {
  // Don't render the prompt if localStorage is not supported
  if (!window.localStorage) {
    return;
  }

  // Retrieve the number of times the prompt was shown so far
  let count = window.localStorage.getItem(STORAGE_KEY);
  count = count ? parseInt(count, 10) : 0;

  // Don't render the prompt if the maximum number of retries has been reached
  if (count >= opts.retry) {
    return;
  }

  // Create prompt
  const prompt = document.createElement('div');
  prompt.id = PROMPT_ID;
  prompt.className = PROMPT_CLASS;
  prompt.innerHTML = buildInnerMarkup(content);
  prompt.setAttribute('role', 'status'); // implies aria-live="polite"
  root.appendChild(prompt);

  // Hide prompt by default
  togglePrompt(prompt, false);

  // Show prompt after delay and update count in localStorage
  setTimeout(function () {
    togglePrompt(prompt, true);
    window.localStorage.setItem(STORAGE_KEY, count + 1);
  }, opts.delay);

  // Hide prompt when any dismiss button is pressed
  const btns = [].slice.call(document.getElementsByTagName('button'));
  const handler = createHandler(prompt, btns);
  for (let btn of btns) {
    btn.addEventListener('click', handler);
  }
}

function buildInnerMarkup(content) {
  return (
`<div class="${PROMPT_CLASS}__inner">
  <button class="${PROMPT_CLASS}__dismiss" type="button" aria-label="Dismiss">
    <svg class="icon" role="img" focusable="false" width="24" height="24" viewBox="0 0 48 48">
      <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path>
    </svg>
  </button>
  <div class="${PROMPT_CLASS}__content">
    ${content}
  </div>
</div>`
  );
}

function togglePrompt(prompt, show) {
  if (show) {
    prompt.removeAttribute('hidden');
  } else {
    prompt.setAttribute('hidden', 'hidden');
  }
}

function createHandler(prompt, btns) {
  return function handler() {
    // Hide prompt
    togglePrompt(prompt, false);

    // Remove event listeners
    for (let btn of btns) {
      btn.removeEventListener('click', handler);
    }
  }
}

export default renderPrompt;
