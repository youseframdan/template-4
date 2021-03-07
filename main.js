let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty('--main-color', mainColors);
  document.querySelectorAll(".colors-list li").forEach(Element => {
    Element.classList.remove("active");
    if (Element.dataset.color === mainColors) {
      Element.classList.add("active");
    }
  });
}
let backgroundOption = true;
let backgroundInterval;
let backgroundLocaiItem = localStorage.getItem("background-option");
if (backgroundLocaiItem !== null) {
  document.querySelectorAll(".random-backgrounds span").forEach(element => {
    element.classList.remove("active");
  });
  if (backgroundLocaiItem === 'true') {
    backgroundOption = true;
    document.querySelector(".settings-box .random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".settings-box .random-backgrounds .no").classList.add("active");
  }
}
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
  document.querySelector(".landing-page").classList.toggle("left");
};
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach(span => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === 'yes') {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});
let landingPage = document.querySelector(".landing-page");
let imgArray = ["01.jpg", "02.jpeg", "03.jpg", "04.jpg", "05.jpg"];
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      landingPage.style.backgroundImage = 'url("img/' + imgArray[randomNumber] + '")';
    }, 3000);
  }
}
randomizeImgs();
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterheight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > (skillsOffsetTop + skillsOuterheight - windowHeight)) {
    let allSkills = document.querySelectorAll(".skills .skill-box .skill-progress span");
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    let allSkill = document.querySelectorAll(".skills .skill-box .skill-progress span");
    allSkill.forEach(skills => {
      skills.style.width = "0%";
    });
  }
};
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
  img.addEventListener('click', (e) => {
    let overlay = document.createElement("div");
    overlay.className = 'popup-overlay';
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = 'popup-box';
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    let closeButton = document.createElement('span');
    let closeButtonText = document.createTextNode("x");
    closeButton.appendChild(closeButtonText);
    closeButton.className = 'cloes-button';
    popupBox.appendChild(closeButton);
  });
});
document.addEventListener("click", function (e) {
  if (e.target.className == 'cloes-button') {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});
const allBullets = document.querySelectorAll(".nav-bullets .bullets");
const allLinks = document.querySelectorAll(".links a");
function scrollToSomewhere(elements) {
  elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach(Element => {
    Element.classList.remove("active");
  });
  ev.target.classList.add("active");
}
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {

  bulletsSpan.forEach(span => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === 'block') {
    bulletsContainer.style.display = 'block';
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = 'none';
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === 'show') {
      bulletsContainer.style.display = 'block';
      localStorage.setItem("bullets_option", 'block');
    } else {
      bulletsContainer.style.display = 'none';
      localStorage.setItem("bullets_option", 'none');
    }
    handleActive(e);
  });
});
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
};
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (e.toggle !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});
tLinks.onclick = function (e) {
  e.stopPropagation();
}
