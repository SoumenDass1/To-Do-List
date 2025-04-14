const carouselTrack = document.getElementById('carouselTrack');
    const slides = carouselTrack.children;
    const totalSlides = slides.length;
    let currentIndex = 0;
    let isAnimating = false;
    let autoSlideInterval;

    const firstSlideClone = slides[0].cloneNode(true);
    carouselTrack.appendChild(firstSlideClone);

    const lastSlideClone = slides[totalSlides - 1].cloneNode(true);
    carouselTrack.insertBefore(lastSlideClone, slides[0]);

    carouselTrack.style.transform = 'translateX(-100%)';

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    function goToSlide(index, isLoopingForward = false, isLoopingBackward = false) {
      if (isAnimating) return;
      isAnimating = true;

      if (isLoopingForward) {
        carouselTrack.style.transition = 'transform 0.5s ease-in-out';
        carouselTrack.style.transform = `translateX(-${(totalSlides + 1) * 100}%)`;

        setTimeout(() => {
          carouselTrack.style.transition = 'none';
          carouselTrack.style.transform = `translateX(-100%)`;
          currentIndex = 0;
          isAnimating = false;
        }, 500);
      } 
      else if (isLoopingBackward) {
        carouselTrack.style.transition = 'transform 0.5s ease-in-out';
        carouselTrack.style.transform = 'translateX(0%)';

        setTimeout(() => {
          carouselTrack.style.transition = 'none';
          carouselTrack.style.transform = `translateX(-${totalSlides * 100}%)`;
          currentIndex = totalSlides - 1;
          isAnimating = false;
        }, 500);
      } 
      else {
        carouselTrack.style.transition = 'transform 0.5s ease-in-out';
        carouselTrack.style.transform = `translateX(-${(index + 1) * 100}%)`;
        currentIndex = index;

        setTimeout(() => {
          isAnimating = false;
        }, 500);
      }
    }

    function prevSlide() {
      stopAutoSlide();
      if (currentIndex === 0) {
        goToSlide(totalSlides - 1, false, true);
      } else {
        goToSlide(currentIndex - 1);
      }
      startAutoSlide();
    }

    function nextSlide() {
      stopAutoSlide();
      if (currentIndex === totalSlides - 1) {
        goToSlide(0, true, false);
      } else {
        goToSlide(currentIndex + 1);
      }
      startAutoSlide();
    }

    startAutoSlide();

    document.querySelector('.carousel').addEventListener('mouseenter', stopAutoSlide);
    document.querySelector('.carousel').addEventListener('mouseleave', startAutoSlide);