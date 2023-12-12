const nameText = document.querySelector('.name-animation');
let i = 0;
nameText.innerHTML = nameText.textContent.replace(/\S/g, (match, index) => {
  i++;
  return `<span class='letter' style='--i:${i}'>${match}</span>`;
});
const nameText2 = document.querySelector('.name-animation-2');
let i2 = 0;
nameText2.innerHTML = nameText2.textContent.replace(/\S/g, (match, index) => {
  i2++;
  return `<span class='letter' style='--i:${i2}'>${match}</span>`;
});

const api = 'https://bagussolay.my.id/api';

const getData = () => {
  fetch(`${api}/ucapan`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById('comments').innerHTML =
          data.data.length + ' Comments';
        renderComment(data.data);
      }
    })
    .catch((error) => console.error('Error:', error));
};

const renderComment = (commentsData) => {
  const commentContainer = document.getElementById('all-comment');
  commentContainer.innerHTML = '';

  // Loop through the commentsData array
  for (const comment of commentsData) {
    // Create elements for each comment
    const commentElement = document.createElement('div');
    commentElement.className = 'col-12 border-tab';
    commentElement.innerHTML = `
    <div class="d-flex mx-0">
      <div class="me-3">
        <img width="28px" height="28px" src="assets/images/comment.png" alt="" />
      </div>
      <div class="isi-komen text-start">
        <h5>${comment.name} <span class="badge bg-secondary">${
      comment.kehadiran
    }</span></h5>
        <p>${comment.ucapan}</p>
        <small class="d-flex align-items-center mt-1">
          <img src="assets/images/clock.svg" width="12px" class="me-1" />
          ${getTimeAgo(comment.createdAt)}
        </small>
      </div>
    </div>
  `;
    commentContainer.appendChild(commentElement);
  }
};

function getTimeAgo(timestamp) {
  const now = new Date();
  const commentTime = new Date(timestamp);
  const timeDiff = now - commentTime;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) {
    return `${seconds} Detik Lalu`;
  } else if (minutes < 60) {
    return `${minutes} Menit Lalu`;
  } else if (hours < 24) {
    return `${hours} Jam Lalu`;
  } else {
    return commentTime.toLocaleDateString('en-US');
  }
}

getData();

let form = document.getElementById('form');
let inputNama = document.getElementById('nama');
let inputUcapan = document.getElementById('ucapan');
let inputKehadiran = document.getElementById('kehadiran');
let buttonSubmit = document.getElementById('button-kirim');
let loading = document.getElementById('loading-ucapan');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  buttonSubmit.innerHTML = `
  <div style="width: 20px; height: 20px" class="spinner-border text-dark" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  Loading
  `;
  buttonSubmit.disabled = true;
  loading.classList.remove('d-none');
  loading.classList.add('d-flex');
  loading.innerHTML = `<div
  class="spinner-grow text-secondary"
  role="status"
>
  <span class="visually-hidden">Loading...</span>
</div>`;
  const data = {
    name: inputNama.value,
    ucapan: inputUcapan.value,
    kehadiran: inputKehadiran.value,
  };
  postData(data);
});

const postData = (data) => {
  fetch(`${api}/ucapan`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setTimeout(() => {
          getData();
          inputNama.value = '';
          inputUcapan.value = '';
          inputKehadiran.value = '';
          buttonSubmit.innerHTML = `
        <img
          src="assets/images/send.svg"
          width="18px"
          height="18px"
          alt=""
        />
        Kirim
        `;
          loading.innerHTML = `<h6 class="text-center mb-0" style="color: #319342;font-size: 14px;">Thanks For Comments</ class="text-center mb-0" style="color: #319342;font-size: 14px;"h6>`;

          setTimeout(() => {
            loading.innerHTML = '';
            loading.classList.add('d-none');
            loading.classList.remove('d-flex');
          }, 2000);
        }, 1500);
      }
    })
    .catch((error) => console.error('Error:', error));
};
const kirimHadiah = () => {
  const amplopDigital = document.getElementById('amplop-digital');
  if (amplopDigital.classList.contains('d-none')) {
    amplopDigital.classList.remove('d-none');
    amplopDigital.classList.add('d-flex');
  } else {
    amplopDigital.classList.remove('d-flex');
    amplopDigital.classList.add('d-none');
  }
};

const currentUrl = window.location.href;

// Create a URL object from the current URL
const url = new URL(currentUrl);

// Get the search parameters from the URL
const queryParams = new URLSearchParams(url.search);

// Get the value of the 'kehadiran' parameter
const kepadaValue = queryParams.get('kepada');
const decodeKepada = decodeURIComponent(kepadaValue);
if (kepadaValue) {
  document.getElementById('kepada-name').innerHTML = decodeKepada
} else {
  document.getElementById('kepada-name').innerHTML = 'Saudara/i'
}

function playAudio() {
  const amplopDigital = document.querySelector('body');
  if (amplopDigital.classList.contains('h-100vh')) {
    amplopDigital.classList.remove('h-100vh')
  }
  document.querySelector("audio").play();
  document.getElementById('page-2').scrollIntoView()
}

document.querySelector("audio").play();
