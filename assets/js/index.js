const nameText = document.querySelector('.name-animation');
let i = 0;
nameText.innerHTML = nameText.textContent.replace(
  /\S/g,
  (match, index) => {
    i++;
    return `<span class='letter' style='--i:${i}'>${match}</span>`;
  }
);
const nameText2 = document.querySelector('.name-animation-2');
let i2 = 0;
nameText2.innerHTML = nameText2.textContent.replace(
  /\S/g,
  (match, index) => {
    i2++;
    return `<span class='letter' style='--i:${i2}'>${match}</span>`;
  }
);
