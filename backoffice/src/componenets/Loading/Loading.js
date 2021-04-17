import "./Loading.scss";
import {useEffect} from 'react';

const sleep = (seconds = 4) => {
  return new Promise((resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  }));
}

const animate = async (box) => {
  box.classList.add('top');

  await sleep(1);
  box.classList.remove('top');

  box.classList.add('right');
  await sleep(3);
  box.classList.remove('right');
  box.classList.add('bottom');
  await sleep();

  box.classList.remove('bottom');
  box.classList.add('left');
  await sleep();
  box.classList.remove('left');

  await animate(box);
}

const boxEffect = async () => {
  const box = document.querySelector('.box');
  await animate(box);
};

export default () => {
  useEffect(() => {
    window.addEventListener('load', boxEffect);

    return function cleanup() {
      window.removeEventListener('load', boxEffect);
    };
  });

  return <div className="loading">
    <div className="loading-text-wrapper">
      <span className="text">Loading</span>
      <div className="box">
      </div>
    </div>
  </div>
}
