
window.onload = function() {
  Particles.init({
    selector: ".background"
  });
};
const particles = Particles.init({
  selector: ".background",
  color: ["#03dac6", "#ff0266", "#000000"],
  connectParticles: true,
  responsive: [
    {
      breakpoint: 768,
      options: {
        color: ["#faebd7", "#03dac6", "#ff0266"],
        maxParticles: 43,
        connectParticles: false
      }
    }
  ]
});

class NavigationPage {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    this.lastScroll = 0;
    let self = this;
    $(".nav-tab").click(function() {
      self.onTabClick(event, $(this));
    });
    $(window).scroll(() => {
      this.onScroll();
    });
    $(window).resize(() => {
      this.onResize();
    });
  }

  onTabClick(event, element) {
    event.preventDefault();
    let scrollTop =
      $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
    $("html, body").animate({ scrollTop: scrollTop }, 600);
  }

  onScroll() {
    this.checkHeaderPosition();
    this.findCurrentTabSelector();
    this.lastScroll = $(window).scrollTop();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

  checkHeaderPosition() {
    const headerHeight = 75;
    if ($(window).scrollTop() > headerHeight) {
      $(".nav-container").addClass("nav-container--scrolled");
    } else {
      $(".nav-container").removeClass("nav-container--scrolled");
    }
    let offset =
      $(".nav").offset().top +
      $(".nav").height() -
      this.tabContainerHeight -
      headerHeight;
    if (
      $(window).scrollTop() > this.lastScroll &&
      $(window).scrollTop() > offset
    ) {
      $(".nav-container").addClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-first");
      $(".nav-container").addClass("nav-container--top-second");
    } else if (
      $(window).scrollTop() < this.lastScroll &&
      $(window).scrollTop() > offset
    ) {
      $(".nav-container").removeClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-second");
      $(".nav-container-container").addClass("nav-container--top-first");
    } else {
      $(".nav-container").removeClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-first");
      $(".nav-container").removeClass("nav-container--top-second");
    }
  }

  findCurrentTabSelector(element) {
    let newCurrentId;
    let newCurrentTab;
    let self = this;
    $(".nav-tab").each(function() {
      let id = $(this).attr("href");
      let offsetTop = $(id).offset().top - self.tabContainerHeight;
      let offsetBottom =
        $(id).offset().top + $(id).height() - self.tabContainerHeight;
      if (
        $(window).scrollTop() > offsetTop &&
        $(window).scrollTop() < offsetBottom
      ) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });
    if (this.currentId != newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;
    if (this.currentTab) {
      width = this.currentTab.css("width");
      left = this.currentTab.offset().left;
    }
    $(".nav-tab-slider").css("width", width);
    $(".nav-tab-slider").css("left", left);
  }
}

new NavigationPage();

var message = document.getElementById('sendMessage');
var submitName = document.querySelectorAll('#name');
var submitText = document.querySelectorAll('#message');
var formshake = document.getElementById('contact-form');
var mailbox = document.getElementById('mailbox');

document.getElementById('sendBtn').addEventListener('click', function(e) {
  if (submitName['0'].validity.valid && submitText['0'].validity.valid) {
    e.preventDefault();
    message.classList.remove('not-active');
    message.classList.add('active');
    mailbox.classList.add('active');
  }
  else {
    message.classList.add('not-active');
    formshake.classList.add('active');
  }
});
document.getElementById('name').addEventListener('click', function() {
  message.classList.remove('not-active');
  formshake.classList.remove('active');
});
document.getElementById('message').addEventListener('click', function() {
  message.classList.remove('not-active');
  formshake.classList.remove('active');
});

function checkFields() {
  const temperature = document.getElementById('temperature').value;
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const convertBtn = document.getElementById('convertBtn');

  if (temperature && fromUnit && toUnit) {
    convertBtn.disabled = false;
  } else {
    convertBtn.disabled = true;
  }
}

function convertTemperature() {
  const temperature = parseFloat(document.getElementById('temperature').value);
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  let result;

  if (fromUnit === toUnit) {
    result = temperature;
  } else if (fromUnit === 'Celsius') {
    if (toUnit === 'Fahrenheit') {
      result = (temperature * 9 / 5) + 32;
    } else if (toUnit === 'Kelvin') {
      result = temperature + 273.15;
    }
  } else if (fromUnit === 'Fahrenheit') {
    if (toUnit === 'Celsius') {
      result = (temperature - 32) * 5 / 9;
    } else if (toUnit === 'Kelvin') {
      result = (temperature - 32) * 5 / 9 + 273.15;
    }
  } else if (fromUnit === 'Kelvin') {
    if (toUnit === 'Celsius') {
      result = temperature - 273.15;
    } else if (toUnit === 'Fahrenheit') {
      result = (temperature - 273.15) * 9 / 5 + 32;
    }
  }

  document.getElementById('result').innerText = `Result: ${result.toFixed(2)} ${toUnit}`;
}
