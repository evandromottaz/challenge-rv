export function cleanNameWithUnderline(name) {
  return name.toLowerCase().replace(/\s/g, '_');
}

export function createElement(element) {
  return document.createElement(element);
}

export function onClick(item, handleClick) {
  item.addEventListener('click', handleClick);
}

export function onEnter(item, handleEnter) {
  item.addEventListener('mouseenter', handleEnter);
}

export function onLeave(item, handleLeave) {
  item.addEventListener('mouseleave', handleLeave);
}

export function onMouseDown(element, handleMouseDown) {
  element.addEventListener('mousedown', handleMouseDown);
}

export function onTouchStart(element, handleTouchStart) {
  element.addEventListener('touchstart', handleTouchStart);
}

export function onMouseMove(element, handleMouseMove) {
  element.addEventListener('mousemove', handleMouseMove);
}

export function onMouseUp(element, handleMouseUp) {
  element.addEventListener('mouseup', handleMouseUp);
}

export function onTouchEnd(element, handleTouchEnd) {
  element.addEventListener('touchend', handleTouchEnd);
}

export function addClass(element, ...names) {
  names ? names : [];
  names.forEach((name) => element.classList.add(name));
}

export function removeClass(element, ...names) {
  names ? names : [];
  names.forEach((name) => element.classList.remove(name));
}
