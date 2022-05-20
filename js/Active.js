import { addClass, onClick, onEnter, onLeave, onTouchStart } from './Commons';

class Active {
  constructor(container) {
    this.container = document.querySelector(container);
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
    this.removeClass();
    this.replaceImgActive(itemObj);
  }

  onHover(itemObj) {
    addClass(itemObj.item, 'active');
    this.replaceImgActive(itemObj);
  }

  onClickImg(itemObj) {
    this.removeSelected();
    this.removeClass();
    itemObj.item.setAttribute('data-selected', 'true');
    this.replaceImgActive(itemObj);
  }

  removeSelected() {
    this.items.forEach(({ item }) => item.removeAttribute('data-selected'));
  }

  removeClass() {
    this.items.forEach((itemObj) => {
      itemObj.item.classList.remove('active');
    });
  }

  replaceImgActive() {
    this.items.forEach(({ img, name, item }) => {
      const hasActive = item.classList.contains('active');
      const hasSelected = item.getAttribute('data-selected');

      hasActive || hasSelected
        ? (img.src = `/images/icons/${name}/${name}-active.svg`)
        : (img.src = `/images/icons/${name}/${name}-inactive.svg`);
    });
  }
}

export default Active;
