export class Carousel {
  constructor(carousel, panel = '') {
    this.carousels = document.querySelectorAll(carousel);
    this.panels = document.querySelectorAll(panel);
    this.dist = { finalPosition: 0, firstPositionX: 0, movement: 0 };
    this.activeClass = 'active';
  }

  controller(panel, totalItems) {
    for (let i = 0; i < totalItems.length; i++) {
      const createButton = document.createElement('button');
      panel.appendChild(createButton);
    }

    const buttons = panel.querySelectorAll('button');
    buttons.forEach((button) => {
      button.setAttribute('type', 'button');
      button.setAttribute('title', 'navigation button');
    });

    this.events(buttons);
  }

  onClick(item) {
    item.addEventListener('click', (event) => {
      return event;
    });
    // item.classList.toggle(this.activeClass);
  }

  onLeave(img, itemTitle, changed) {
    if (img.classList.contains('active')) {
      img.src = `/images/icons/${itemTitle.toLowerCase()}/inactive.svg`;
    }
    img.src = `/images/icons/${itemTitle.toLowerCase()}/inactive.svg`;
  }

  onHover(item) {
    const itemTitle = item.querySelector('.item-title').innerText;
    let changed = true;
    const img = item.querySelector('img');
    img.src = `/images/icons/${itemTitle.toLowerCase()}/active.svg`;

    item.addEventListener('mouseleave', () =>
      this.onLeave(img, itemTitle, changed),
    );
  }

  events(items) {
    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.resetActiveClass(items);
        this.onClick(item);
      });

      if (item.classList.contains('item')) {
        item.addEventListener('mouseenter', () => {
          this.onHover(item);
        });
      }
    });
  }

  resetActiveClass(items) {
    items.forEach((item) => item.classList.remove(this.activeClass));
  }

  bind() {
    this.onClick = this.onClick.bind(this);
    this.onHover = this.onHover.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }

  init() {
    this.bind();
    this.carousels.forEach((carousel, index) => {
      const container = carousel.querySelector('.carousel-container');
      const items = container.querySelectorAll('.item');
      this.events(items);

      if (this.panels) this.controller(this.panels[index], items);
    });
  }
}
