/*
 * Slider
 */

var swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*
 * Predict Age
 */

async function getPredict(name) {
  const response = await fetch(`https://api.agify.io/?name=${name}`);
  const result = await response.json();

  return result;
}

async function applyingPrediction() {
  const nameUser = document.getElementById("user-name").value;

  if (nameUser) {
    const predictResult = await getPredict(nameUser);

    document.querySelector(
      ".container-predict-age-component-result"
    ).innerHTML = `
        <p>
          Apostamos que <span>${predictResult.name}</span> tem <span>${predictResult.age}</span> anos!
        </p>
      `;
  }
}

document
  .querySelector(".container-predict-age-component-input #user-name")
  .addEventListener("keypress", async function (e) {
    if (e.key === "Enter") {
      applyingPrediction();
    }
  });

document
  .querySelector(".container-predict-age-component-input button")
  .addEventListener("click", async function (e) {
    applyingPrediction();
  });
