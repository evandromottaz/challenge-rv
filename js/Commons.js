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

export function onDown(element, handleDown) {
  const touchOrMouse = ['mousedown', 'touchstart'];
  touchOrMouse.forEach((event) => element.addEventListener(event, handleDown));
}

export function onUp(element, handleUp) {
  const touchOrMouse = ['mouseup', 'touchend'];
  touchOrMouse.forEach((event) => element.addEventListener(event, handleUp));
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

export function onResize(element, handleResize) {
  element.addEventListener('resize', handleResize);
}

export function addClass(element, ...names) {
  names ? names : [];
  names.forEach((name) => element.classList.add(name));
}
