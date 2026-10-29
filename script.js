const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

if (hamburger && navbar) {
  const icon = hamburger.querySelector("i");

  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");

    if (navbar.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });
}

function getSliderMetrics(track, cards) {
  if (!track || !cards.length) {
    return {
      cardWidth: 0,
      gap: 0,
    };
  }

  const cardWidth = cards[0].offsetWidth;

  const gap = parseFloat(window.getComputedStyle(track).gap) || 0;

  return {
    cardWidth,
    gap,
  };
}

function moveSlider(track, currentIndex, cards) {
  const { cardWidth, gap } = getSliderMetrics(track, cards);

  const offset = currentIndex * (cardWidth + gap);

  track.style.transform = `translateX(-${offset}px)`;
}

const productTrack = document.getElementById("productTrack");

const productCards = document.querySelectorAll(".product-card");

const productPrev = document.getElementById("prevBtn");

const productNext = document.getElementById("nextBtn");

let productCurrentIndex = 0;
let productAutoSlide;

function getProductVisibleCards() {
  if (window.innerWidth <= 600) {
    return 1;
  }

  if (window.innerWidth <= 900) {
    return 2;
  }

  return 3;
}

function updateProductSlider() {
  if (!productTrack || !productCards.length) {
    return;
  }

  const visibleCards = getProductVisibleCards();

  const maxIndex = Math.max(0, productCards.length - visibleCards);

  if (productCurrentIndex > maxIndex) {
    productCurrentIndex = maxIndex;
  }

  moveSlider(productTrack, productCurrentIndex, productCards);

  productCards.forEach((card, index) => {
    card.classList.toggle("active", index === productCurrentIndex);
  });
}

function nextProductSlide() {
  const visibleCards = getProductVisibleCards();

  const maxIndex = Math.max(0, productCards.length - visibleCards);

  if (productCurrentIndex < maxIndex) {
    productCurrentIndex++;
  } else {
    productCurrentIndex = 0;
  }

  updateProductSlider();
}

function prevProductSlide() {
  const visibleCards = getProductVisibleCards();

  const maxIndex = Math.max(0, productCards.length - visibleCards);

  if (productCurrentIndex > 0) {
    productCurrentIndex--;
  } else {
    productCurrentIndex = maxIndex;
  }

  updateProductSlider();
}

if (productNext) {
  productNext.addEventListener("click", () => {
    nextProductSlide();
    restartProductAutoSlide();
  });
}

if (productPrev) {
  productPrev.addEventListener("click", () => {
    prevProductSlide();
    restartProductAutoSlide();
  });
}

function startProductAutoSlide() {
  clearInterval(productAutoSlide);

  productAutoSlide = setInterval(nextProductSlide, 4000);
}

function restartProductAutoSlide() {
  startProductAutoSlide();
}

const trendingTrack = document.getElementById("trendingTrack");

const trendingCards = document.querySelectorAll(".trending-card");

const trendingPrev = document.getElementById("trendingPrev");

const trendingNext = document.getElementById("trendingNext");

let trendingCurrentIndex = 0;

function updateTrendingSlider() {
  if (!trendingTrack || !trendingCards.length) {
    return;
  }

  const { cardWidth, gap } = getSliderMetrics(trendingTrack, trendingCards);

  const totalCardSpace = cardWidth + gap;

  const normalOffset = trendingCurrentIndex * totalCardSpace;

  const containerWidth = trendingTrack.parentElement.offsetWidth;

  const centerOffset = containerWidth / 2 - cardWidth / 2;

  const offset = normalOffset - centerOffset;

  trendingTrack.style.transform = `translateX(-${offset}px)`;

  trendingCards.forEach((card, index) => {
    card.classList.toggle("active-card", index === trendingCurrentIndex);
  });
}

if (trendingNext) {
  trendingNext.addEventListener("click", () => {
    if (trendingCurrentIndex < trendingCards.length - 1) {
      trendingCurrentIndex++;
      updateTrendingSlider();
    }
  });
}

if (trendingPrev) {
  trendingPrev.addEventListener("click", () => {
    if (trendingCurrentIndex > 0) {
      trendingCurrentIndex--;
      updateTrendingSlider();
    }
  });
}

const testimonialTrack = document.getElementById("testimonialTrack");

const testimonialCards = document.querySelectorAll(".testimonial-card");

const testimonialPrev = document.getElementById("testPrevBtn");

const testimonialNext = document.getElementById("testNextBtn");

let testimonialCurrentIndex = 0;

function getTestimonialVisibleCards() {
  if (window.innerWidth <= 600) {
    return 1;
  }

  if (window.innerWidth <= 900) {
    return 2;
  }

  if (window.innerWidth <= 1200) {
    return 3;
  }

  return 4;
}

function updateTestimonialSlider() {
  if (!testimonialTrack || !testimonialCards.length) {
    return;
  }

  const visibleCards = getTestimonialVisibleCards();

  const maxIndex = Math.max(0, testimonialCards.length - visibleCards);

  if (testimonialCurrentIndex > maxIndex) {
    testimonialCurrentIndex = maxIndex;
  }

  moveSlider(testimonialTrack, testimonialCurrentIndex, testimonialCards);
}

if (testimonialNext) {
  testimonialNext.addEventListener("click", () => {
    const visibleCards = getTestimonialVisibleCards();

    const maxIndex = Math.max(0, testimonialCards.length - visibleCards);

    if (testimonialCurrentIndex < maxIndex) {
      testimonialCurrentIndex++;

      updateTestimonialSlider();
    }
  });
}

if (testimonialPrev) {
  testimonialPrev.addEventListener("click", () => {
    if (testimonialCurrentIndex > 0) {
      testimonialCurrentIndex--;

      updateTestimonialSlider();
    }
  });
}

function initializeSliders() {
  updateProductSlider();

  updateTrendingSlider();

  updateTestimonialSlider();
}

window.addEventListener("resize", initializeSliders);

window.addEventListener("DOMContentLoaded", () => {
  initializeSliders();

  startProductAutoSlide();
});
