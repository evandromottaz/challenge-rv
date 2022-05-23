import { Active } from './Active';
import {
  addClass,
  debounce,
  onDown,
  onTouchStart,
  onUp,
  removeClass,
} from '../Commons';

export class Carousel {
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
    let calcDist = this.dist.finalPosition - this.dist.movement;
    const lastPositionItem = this.items[this.lastItemIndex].position;

    if (calcDist > 0) return (calcDist = 0);
    else if (calcDist < lastPositionItem) return (calcDist = lastPositionItem);
    else return calcDist;
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
    console.log(this.dist.finalPosition);

    const moveTo = 130;

    if (this.dist.movement > moveTo && this.index.next !== null)
      this.changeItem(this.index.next);
    else if (this.dist.movement < -moveTo && this.index.prev !== null)
      this.changeItem(this.index.prev);
    else this.changeItem(this.index.current);
  }

  changeItem(index) {
    const currentItem = this.items[index];
    this.moveCarousel(currentItem.position);
    this.itemIndex(index);
    this.dist.finalPosition = currentItem.position;
    this.buttons.forEach((button) => removeClass(button, this.selectedClass));
    addClass(this.buttons[index], this.selectedClass);
  }

  events() {
    window.addEventListener('resize', this.onResize);
    this.items.forEach(({ item }) => {
      onTouchStart(item, () => this.onClickTouch());
    });
    onDown(this.carousel, this.onStart);
    onUp(this.carousel, this.onEnd);
  }

  onClickTouch() {
    this.dist.movement = 0;
  }

  // config
  itemIndex(index) {
    this.index = {
      prev: index ? index - 1 : null,
      current: index,
      next: index === this.lastItemIndex ? null : index + 1,
    };
  }

  itemPosition(item, index) {
    this.lastItemIndex = this.container.querySelectorAll('.item').length - 1;
    if (index === 0) return 0;
    else if (index > 0 && index < this.lastItemIndex) {
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
    }, 1000);
  }

  init() {
    this.bind();
    this.config();
    this.events();
    this.itemIndex(0);
    return this;
  }

  bind() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 200);
  }
}

export class NavButtons extends Carousel {
  constructor(carousel, container) {
    super(carousel, container);
    this.bindButtonsEvents();
    this.selectedClass = 'selected';
  }

  createButtons() {
    const panel = this.carousel.querySelector('.carousel-panel');
    this.items.forEach(() => {
      const createButton = document.createElement('button');
      panel.appendChild(createButton);
    });
    return panel;
  }

  desactiveButtons() {
    this.buttons.forEach((button) => removeClass(button, this.selectedClass));
  }

  getClassImgContainer(item, index) {
    const grandfather = item.parentElement.parentElement;
    const carouselClasses = grandfather.getAttribute('class');
    const carouselClass = carouselClasses.replace('carousel ', '');

    const active = new Active(`.${carouselClass} .carousel-container`);
    active.onClickImg(this.items[index]);
  }

  activeButton(item) {
    const indexItem = this.index.current;
    this.desactiveButtons();

    // to use class Active
    this.getClassImgContainer(item, indexItem);
    addClass(this.buttons[indexItem], this.selectedClass);
  }

  eventButtons(item, index) {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      this.changeItem(index);
      this.activeButton(item);
    });

    onTouchStart(item, (event) => {
      event.preventDefault();
      this.changeItem(index);
      this.activeButton(item);
    });

    this.container.addEventListener('changeEvent', () =>
      this.activeButton(item),
    );
  }

  addButtons() {
    this.panel = this.createButtons();
    this.buttons = [...this.panel.children];
    this.buttons.forEach((item, index) => this.eventButtons(item, index));
  }

  bindButtonsEvents() {
    this.eventButtons = this.eventButtons.bind(this);
  }
}
