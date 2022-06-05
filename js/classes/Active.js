import {
  addClass,
  cleanNameWithUnderline,
  onClick,
  onEnter,
  onLeave,
  onTouchStart,
  removeClass,
} from '../Commons';

export class Active {
  constructor(container) {
    this.container = document.querySelector(container);
    this.active = 'active';
    this.items = [...this.container.querySelectorAll('.item')].map(
      (item, index) => {
        const name = item.querySelector('.item-title').innerText;
        const img = item.querySelector('img');
        return {
          name,
          item,
          img,
          index,
        };
      },
    );

    this.events();
  }

  events() {
    this.items.forEach((itemObj) => {
      onClick(itemObj.item, () => this.onClickImg(itemObj));
      onTouchStart(itemObj.item, () => this.onClickImg(itemObj));
      onEnter(itemObj.item, () => this.onHover(itemObj));
      onLeave(itemObj.item, () => this.onHoverLeave(itemObj));
    });
  }

  onHoverLeave(itemObj) {
    this.removeClassItems();
    this.replaceImgActive(itemObj);
  }

  onHover(itemObj) {
    addClass(itemObj.item, this.active);
    this.replaceImgActive(itemObj);
  }

  onClickImg(itemObj) {
    this.removeSelected();
    this.removeClassItems();
    itemObj.item.setAttribute('data-selected', 'true');
    this.replaceImgActive(itemObj);
  }

  removeSelected() {
    this.items.forEach(({ item }) => item.removeAttribute('data-selected'));
  }

  removeClassItems() {
    this.items.forEach(({ item }) => {
      removeClass(item, this.active);
    });
  }

  replaceImgActive() {
    this.items.forEach(({ img, name, item }) => {
      const hasActive = item.classList.contains(this.active);
      const hasSelected = item.getAttribute('data-selected');
      name = cleanNameWithUnderline(name);

      hasActive || hasSelected
        ? (img.src = `/images/icons/${name}/${name}-active.svg`)
        : (img.src = `/images/icons/${name}/${name}-inactive.svg`);
    });
  }
}
