import Slider from './slider';

export default class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
  }


  decorizeSlides() {
    this.slides.forEach(slide => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });

    if (!this.slides[0].closest('button')) {
      this.slides[0].classList.add(this.activeClass);
    }

    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }


  nextSlide() {
    if (this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
      for (let i = 0; i < 3; i++) {
        this.container.appendChild(this.slides[0]);
      }
      this.decorizeSlides();
    } else {
      this.container.appendChild(this.slides[0]);
      this.decorizeSlides();
    }
  }


  bindTriggers() {
    this.next.addEventListener('click', () => this.nextSlide());

    this.prev.addEventListener('click', () => {
      for (let i = this.slides.length-1; i > 0; i--) {
        if (this.slides[i].tagName !== 'BUTTON') {
          let active = this.slides[i];
          this.container.insertBefore(active, this.slides[0]);
          this.decorizeSlides();
          break;
        }
      }
    });
  }

  autoplaySliders() {
    const pauseAreas = [this.next, this.prev, this.slides[0].parentNode];

    if (this.autoplay) {
      let timer = setInterval(() => this.nextSlide(), 1000);
      pauseAreas.forEach(item => {
        item.addEventListener('mouseover', () => {
          clearInterval(timer);
        });
        item.addEventListener('mouseleave', () => {
          timer = setInterval(() => this.nextSlide(), 1000);
        });
      });
    }
  }

  init() {
    try {
      this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start;
      `;

      this.bindTriggers();
      this.decorizeSlides();
      this.autoplaySliders();
    } catch(err){}
  }

}