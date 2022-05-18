export function cleanNameWithUnderline(name) {
  return name.toLowerCase().replace(/\s/g, '_');
}

export function createElement(element) {
  return document.createElement(element);
}

export function removeElement(element) {
  document.querySelector(element).remove();
}

export function onClick(item, handleFunc) {
  item.addEventListener('click', handleFunc);
}

export function onEnter(item, handleFunc) {
  item.addEventListener('mouseenter', handleFunc);
}

export function onLeave(item, handleFunc) {
  item.addEventListener('mouseleave', handleFunc);
}
