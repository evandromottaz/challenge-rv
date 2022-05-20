import { debounce, onClick, onDown, onTouchStart, onUp } from './Commons';

class Carousel {
  constructor(carousel) {
    this.carousel = document.querySelector(carousel);
    this.container = this.carousel.querySelector('.carousel-container');
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
    this.init();
  }

  moveCarousel(distX) {
    this.dist.position = distX;
    this.container.style.transform = `translateX(${distX}px)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.5;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    event.preventDefault();
    let moveType;
    if (event.type === 'mousedown') {
      this.dist.startX = event.clientX;
      moveType = 'mousemove';
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      moveType = 'touchmove';
    }

    this.carousel.addEventListener(moveType, this.onMove);
    this.transition(false);
  }

  transition(active) {
    this.container.style.transition = active ? 'transform .3s' : '';
  }

  onMove(event) {
    const mouseOrTouch =
      event.type === 'touchmove'
        ? event.changedTouches[0].clientX
        : event.clientX;
    const finalPosition = this.updatePosition(mouseOrTouch);
    this.moveCarousel(finalPosition);
  }

  onEnd(event) {
    const moveType = event.type === 'touchend' ? 'touchmove' : 'mousemove';
    this.carousel.removeEventListener(moveType, this.onMove);
    this.dist.finalPosition = this.dist.position;
    this.changeItemOnEnd();
    this.transition(true);
  }

  changeItemOnEnd() {
    if (this.dist.movement > 50 && this.index.next !== null)
      this.changeItem(this.index.next);
    else if (this.dist.movement < -50 && this.index.prev !== null)
      this.changeItem(this.index.prev);
    else this.changeItem(this.index.current);
  }

  events() {
    window.addEventListener('resize', this.onResize);
    this.items.forEach(({ item }) => {
      onTouchStart(item, () => this.onClick());
    });
    onDown(this.carousel, this.onStart);
    onUp(this.carousel, this.onEnd);
  }

  onClick() {
    this.dist.movement = 0;
  }

  // config
  itemIndex(index) {
    this.index = {
      prev: index ? index - 1 : null,
      current: index,
      next: index === this.lastItem ? null : index + 1,
    };
  }

  changeItem(index) {
    const currentItem = this.items[index];
    this.moveCarousel(currentItem.position);
    this.itemIndex(index);
    this.dist.finalPosition = currentItem.position;
  }

  activePrevItem() {
    if (this.index.prev !== null) this.changeItem(this.index.prev);
  }

  activeNextItem() {
    if (this.index.next !== null) this.changeItem(this.index.next);
  }

  itemPosition(item, index) {
    this.lastItem = this.container.querySelectorAll('.item').length - 1;
    if (index === 0) return 0;
    else if (index > 0 && index < this.lastItem) {
      const margin = (-item.offsetWidth + innerWidth) / 2;
      return -(item.offsetLeft - margin); //posição do elemento - margin da tela
    } else {
      const gap = window.getComputedStyle(this.container).gap;
      const containerWidth = this.container.offsetWidth;
      const itemRight = item.getBoundingClientRect().right;
      const clean = +gap.replace(/px\s?/g, '');
      return -itemRight + containerWidth - clean;
    }
  }

  config() {
    this.items = [...this.container.children].map((item, index) => {
      const position = this.itemPosition(item, index);
      return { item, position };
    });
  }

  onResize() {
    setTimeout(() => {
      this.config();
      this.changeItem(this.index.current);
      console.log('oi');
    }, 1000);
  }

  init() {
    this.bind();
    this.config();
    this.itemIndex(0);
    this.events();
    return this;
  }

  bind() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 200);
  }
}

class NavButtons extends Carousel {}

export default Carousel;
