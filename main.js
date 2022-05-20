import './style.css';
import Carousel from './js/Carousel';
import Active from './js/Active';

new Active('.items');

if (matchMedia('(max-width:480px)').matches) new Carousel('.carousel-1');
