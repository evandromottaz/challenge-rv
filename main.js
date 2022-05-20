import './style.css';
import Carousel from './js/Carousel';
import Active from './js/Active';

new Active('.items-1');
new Active('.items-2');

if (matchMedia('(max-width:770px)').matches) {
  new Carousel('.carousel-1');
  new Carousel('.carousel-2');
}
