import {
  cleanNameWithUnderline,
  createElement,
  onClick,
  onEnter,
  onLeave,
  removeElement,
} from './Commons';

export class Carousel {
  constructor(carousel) {
    this.carousel = document.querySelector(carousel);
    this.carousel.items = this.carousel.querySelectorAll('.item');
    this.move = { finalPosition: 0, firstPositionX: 0, movement: 0 };
    this.activeClass = { mouse: 'active', selected: 'selected' };

    this.init();
  }

  init() {
    this.bind();
    this.hasController();
    this.carousel.items.forEach((item) => this.events(item));
  }

  events(item) {
    onClick(item, () => this.handleClick(item));
    onEnter(item, () => this.handleEnter(item));
  }

  handleClick(item) {
    this.resetActiveClass(this.activeClass.selected);
    this.addActiveImg(item, this.activeClass.selected);
    this.replaceImgActive(item);
  }

  handleEnter(item) {
    item.classList.add('active');
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

  handleController(button) {
    this.resetActiveButton();
    this.addActiveImg(button, this.activeClass.selected);
  }

  resetActiveImg(clickOrLeave) {
    this.carousel.items.forEach((item) =>
      this.removeActiveClass(item, this.activeClass[clickOrLeave]),
    );
  }

  resetActiveButton() {
    this.panel.buttons.forEach((button) =>
      button.classList.remove(this.activeClass.selected),
    );
  }

  controller() {
    this.createButtons();
    this.panel.buttons = this.panel.querySelectorAll('button');
    this.panel.buttons.forEach((button) => {
      onClick(button, () => this.handleController(button));
      button.setAttribute('type', 'button');
      button.setAttribute('title', 'navigation button');
    });
  }

  createButtons() {
    let hiddenItems = 0;
    this.carousel.items.forEach((item) => {
      const itemRight = item.getBoundingClientRect().right;
      const innerWidth = window.innerWidth;

      if (itemRight > innerWidth) hiddenItems++;
      this.panel.appendChild(createElement('button'));
      console.log(hiddenItems);
      // falta o index
      if (hiddenItems >= 1) removeElement('button');
    });
  }

  removeActiveClass(item, moveOrClick) {
    item.classList.remove(this.activeClass[moveOrClick]);
    this.replaceImgActive(item);
  }

  addActiveImg(item, moveOrClick) {
    item.classList.add(this.activeClass[moveOrClick]);
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

  onResize() {
    window.addEventListener('resize', this.updateCarousel);
  }

  bind() {
    this.controller = this.controller.bind(this);
    this.resetActiveClass = this.resetActiveImg.bind(this);
    this.addActiveImg = this.addActiveImg.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
}
