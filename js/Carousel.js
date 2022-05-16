export class Carousel {
  constructor(carousel, panel = '') {
    this.carousels = document.querySelectorAll(carousel);
    this.panels = document.querySelectorAll(panel);
    this.dist = { finalPosition: 0, firstPositionX: 0, movement: 0 };
    this.activeClass = { mouse: 'active', selected: 'selected' };
  }

  controller(panel, totalItems) {
    totalItems.forEach(() => {
      const createButton = document.createElement('button');
      panel.appendChild(createButton);
    });

    // for SEO
    const buttons = panel.querySelectorAll('button');
    buttons.forEach((button) => {
      button.setAttribute('type', 'button');
      button.setAttribute('title', 'navigation button');
    });

    this.events(buttons);
  }

  itemName(item) {
    return item.querySelector('h3').innerText;
  }

  replaceImgActive(item) {
    const itemImg = item.querySelector('img');
    if (
      item.classList.contains('selected') ||
      item.classList.contains('active')
    )
      itemImg.src = `/assets/${this.itemName(item)}-active.svg`;
    else itemImg.src = `/assets/${this.itemName(item)}-inactive.svg`;
  }

  handleClick(item, items = '') {
    this.resetActiveClass(items);
    item.classList.add(this.activeClass.selected);
    this.replaceImgActive(item);
  }

  onClick(item, items = '') {
    item.addEventListener('click', () => this.handleClick(item, items));
  }

  onMouseLeave(item) {
    item.addEventListener('mouseout', () => {
      item.classList.remove('active');
      this.replaceImgActive(item);
    });
  }

  onMouseEnter(item) {
    item.addEventListener('mouseover', () => {
      item.classList.add('active');
      this.replaceImgActive(item);
      this.onMouseLeave(item);
    });
  }

  events(items) {
    items.forEach((item) => {
      this.onClick(item, items);
      this.onMouseEnter(item);
    });
  }

  resetActiveClass(items) {
    items.forEach((item) => {
      item.classList.remove(this.activeClass.selected);
      item.classList.remove(this.activeClass.mouse);
      this.replaceImgActive(item);
    });
  }

  bind() {
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  init() {
    this.bind();
    this.carousels.forEach((carousel) => {
      const container = carousel.querySelector('.carousel-container');
      const items = container.querySelectorAll('.item');
      this.events(items);

      // if (this.panels) this.controller(this.panels[index], items);
    });
  }
}
