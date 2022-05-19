import {
  addClass,
  cleanNameWithUnderline,
  createElement,
  onClick,
  onEnter,
  onMouseDown,
  onLeave,
  removeClass,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
} from './Commons';

export class Carousel {
  constructor(carousel) {
    this.carousel = document.querySelector(carousel);
    this.container = this.carousel.querySelector('.carousel-container');
    this.items = [...this.container.querySelectorAll('.item')];
    this.activeClass = { active: 'active', selected: 'selected' };
    this.activeClass.values = Object.values(this.activeClass);

    this.dist = { start: 0, moving: 0, end: 0 };
    this.init();
  }

  init() {
    this.bind();
    this.events();
  }

  events() {
    if (window.innerWidth < 920) {
      onMouseDown(this.container, this.onStart);
      onMouseUp(this.container, this.onEnd);
      onTouchStart(this.container, this.onStart);
      onTouchEnd(this.container, this.onEnd);
      this.hasController();
    }

    this.items.forEach((item, i) => {
      onClick(item, () => this.handleClickImg(item, i));
      onEnter(item, () => this.handleEnterItem(item));
      onTouchStart(item, () => this.handleClickImg(item, i));
    });
  }

  updateCarouselPosition(clientX) {
    this.dist.moving = (clientX - this.dist.start) * 1.4;
    return this.dist.end + this.dist.moving;
  }

  imgPosition(finalX) {
    const firstItem = this.items[0];
    let totalOffsetWidthItems = 0;

    const marginStr = this.getComputedItem(this.container, 'gap');
    const cleanMargin = +marginStr.replace(/px\s?/g, '');

    this.items.forEach((item) => {
      totalOffsetWidthItems += item.offsetWidth + cleanMargin;
    });

    if (finalX + cleanMargin > firstItem.offsetLeft) {
      finalX = 0;
    } else if (
      finalX - this.container.offsetWidth <
      -totalOffsetWidthItems - cleanMargin
    ) {
      finalX = -totalOffsetWidthItems + window.innerWidth - cleanMargin;
    }

    this.moveCarouselItems(finalX);
  }

  moveCarouselItems(finalX) {
    this.dist.saved = finalX;
    this.container.style.transform = `translate3d(${finalX}px, 0, 0)`;
  }

  onStart(ev) {
    ev.preventDefault();
    let moveType;
    if (ev.type === 'mousedown') {
      this.dist.start = ev.clientX;
      moveType = 'mousemove';
    } else {
      this.dist.start = ev.changedTouches[0].clientX;
      moveType = 'touchmove';
    }

    this.container.addEventListener(moveType, this.onMovement);
    this.transition(false);
  }

  onMovement(ev) {
    const clientX =
      ev.type === 'mousemove' ? ev.clientX : ev.changedTouches[0].clientX;
    let finalX = this.updateCarouselPosition(clientX);
    this.imgPosition(finalX);
  }

  onEnd() {
    this.container.removeEventListener('mousemove', this.onMovement);
    this.dist.end = this.dist.saved;
    this.transition(true);
  }

  handleClickImg(item, index) {
    const selected = this.activeClass.selected;
    const indexButton = this.panel ? this.panel.buttons[index] : undefined;
    this.resetClasses();
    this.addActiveImg(item, selected);
    this.replaceImgActive(item);

    if (indexButton) {
      this.handleClickButton(indexButton, index);
    }
  }

  resetClasses() {
    const values = this.activeClass.values;
    this.items.forEach((item) => {
      removeClass(item, ...values);
      this.replaceImgActive(item);
    });
  }

  handleEnterItem(item) {
    const active = this.activeClass.active;
    addClass(item, active);
    this.replaceImgActive(item);
    onLeave(item, () => this.handleLeave(item));
  }

  handleLeave(item) {
    item.classList.remove('active');
    this.replaceImgActive(item);
  }

  hasController() {
    this.panel = this.carousel.querySelector('.carousel-panel');
    if (this.panel) this.controller();
  }

  getComputedItem(element, style) {
    return window.getComputedStyle(element)[style];
  }

  handleClickButton(button, indexButton) {
    this.resetActiveButtons();
    const selected = this.activeClass.selected;
    const item = this.items[indexButton];
    const itemLeft = item.offsetLeft;
    const itemRight = item.getBoundingClientRect().right;
    const itemCenter = item.getBoundingClientRect().width;
    addClass(button, selected);
    addClass(item, selected);

    console.log(indexButton);
    console.log(itemCenter);
    if (indexButton === 0) this.moveCarouselItems(itemLeft);
    else if (indexButton > 0 && indexButton < this.items.length - 1) {
      console.log('meio');
      this.moveCarouselItems(-itemCenter);
    } else this.moveCarouselItems(-itemRight);

    this.replaceImgActive(item);
  }

  transition(active) {
    this.container.style.transition = active ? 'transform:.3s ease' : '';
  }

  resetActiveButtons() {
    const values = this.activeClass.values;
    this.panel.buttons.forEach((button) => removeClass(button, ...values));
    this.resetClasses();
    this.items.forEach((item) => this.replaceImgActive(item));
  }

  controller() {
    this.createButtons();
    this.panel.buttons.forEach((button, index) => {
      onClick(button, () => this.handleClickButton(button, index));
      button.setAttribute('type', 'button');
      button.setAttribute('title', 'navigation button');
    });
  }

  createButtons() {
    let hiddenItems = 0;
    this.items.forEach((item, i) => {
      const itemRight = item.getBoundingClientRect().right;
      const innerWidth = window.innerWidth;

      this.panel.appendChild(createElement('button'));
      this.panel.buttons = this.panel.querySelectorAll('button');

      if (itemRight > innerWidth) hiddenItems++;
      if (hiddenItems >= 1);
    });
  }

  addActiveImg(item, moveOrClick) {
    addClass(item, this.activeClass[moveOrClick]);
  }

  isActive(item) {
    if (
      item.classList.contains('selected') ||
      item.classList.contains('active')
    )
      return true;
    else false;
  }

  replaceImgActive(item) {
    const itemImg = item.querySelector('img');
    const itemName = item.querySelector('.item-title').innerText;
    const cleanName = cleanNameWithUnderline(itemName);

    if (this.isActive(item))
      itemImg.src = `/images/icons/${cleanName}/${cleanName}-active.svg`;
    else itemImg.src = `/images/icons/${cleanName}/${cleanName}-inactive.svg`;
  }

  bind() {
    this.addActiveImg = this.addActiveImg.bind(this);
    this.onMovement = this.onMovement.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
}
