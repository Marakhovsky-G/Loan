export default class Slider {
  constructor({container = null,
    btns = null,
    next = null,
    prev = null,
    firsts = null,
    activeClass = '',
    animate,
    autoplay} = {}) {
      this.container = document.querySelector(container);
      try {this.slides = this.container.children;} catch(err){}
      this.btns = document.querySelectorAll(btns);
      this.prev = document.querySelector(prev);
      this.next = document.querySelector(next);
      this.firsts = document.querySelectorAll(firsts);
      this.slideIndex = 1;
      this.activeClass = activeClass;
      this.animate = animate;
      this.autoplay = autoplay;
  }

}
