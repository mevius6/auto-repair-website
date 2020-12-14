// https://github.com/parcel-bundler/parcel/issues/3492
// new Worker('./sw');

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator
            .serviceWorker
            .register('./sw.js', { scope: '/' })
            .then((registration) => {
              console.log('SW зарегестрирован: ', registration)
            });
    }
    catch (e) {
      console.log('SW не зарегестрирован');
    }
  }
}

let deferredPrompt;
const addDiv = document.querySelector('.a2hs');
const addBtn = document.querySelector('.a2hs__cta');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  addDiv.classList.toggle('hidden', false);

  addBtn.addEventListener('click', () => {
    addDiv.classList.toggle('hidden', true);

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Пользователь принял a2hs запрос');
      } else {
        console.log('Пользователь отклонил a2hs запрос');
      }
      deferredPrompt = null;
    })
  });
});

window.addEventListener('appinstalled', () => {
  console.log('a2hs установлен');
});

window.addEventListener('load', () => registerSW());
