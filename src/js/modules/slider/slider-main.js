import Slider from './slider';

export default class MainSlider extends Slider {
  constructor(btns, next, prev, firsts) {
    super(btns, next, prev, firsts);
  }

  showSlides(n) {
    if (n > this.slides.length) {this.slideIndex = 1;}

    if (n < 1) {this.slideIndex = this.slides.length;}

    try {
      this.hanson.style.opacity = '0';

      if (n === 3) {
        this.hanson.classList.add('animated');
        setTimeout(() => {
          this.hanson.style.opacity = '1';
          this.hanson.classList.add('slideInUp');
        }, 3000);
      } else {
        this.hanson.classList.remove('slideInUp');
      }
    } catch(err) {}

    this.slides.forEach(slide => {
      slide.style.display = 'none';
    });

    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.plusSlides(1);
      });
    });

    this.firsts.forEach(first => {
      first.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    document.querySelectorAll('.prevmodule').forEach(item => {
      item.addEventListener('click', (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        this.plusSlides(-1);
      });
    });
    document.querySelectorAll('.nextmodule').forEach(item => {
      item.addEventListener('click', (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        this.plusSlides(1);
      });
    });
  }

  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector('.hanson');
      } catch(err) {}

      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
  }

}