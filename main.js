let yOffset = 0; // window.pageYOffset 대신 쓸 변수
let prevScrollHeight = 0; //현재 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
let currentScene = 0; //현재 활성화된 씬
let enterNewScene = false; // 새로운 씬이 시작된 순간

class Queue {
  constructor() {
    this.q = {};
    this.head = 0;
    this.tail = 0;
  }

  push(val) {
    this.q[this.tail++] = val;
  }

  shift() {
    return this.q[this.head++];
  }

  get length() {
    return this.tail - this.head;
  }
}

//4개의 스크롤 구간에 대한 객체배열
const sceneInfo = [
  {
    //0
    type: 'sticky', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
    heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#intro_section'),
      canvas: document.querySelector('#fade-in-faker-canvas'),
      context: document.querySelector('#fade-in-faker-canvas').getContext('2d'),
      introImages: [],
    },
    values: {
      // 변화될 css값들 start, end는 애니메이션 적용될 구간
    },
  },
  {
    //1
    type: 'normal', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
    heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
    scrollHeight: 0,
    objs: {},
  },
  {
    //2
    type: 'sticky', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
    heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
    scrollHeight: 0,
    objs: {},
    values: {},
  },
  {
    //3
    type: 'sticky', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
    heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
    scrollHeight: 0,
    objs: {},
    values: {
      // 브랜딩 세션의 흰 박스 스크롤 할 대 계산할 예정
    },
  },
];

function fadeInFakerImage() {
  const objs = sceneInfo[0].objs;
  const { width, height } = objs.canvas.getBoundingClientRect();
  const visitedMap = Array.from({ length: height }, () =>
    new Array(width).fill(false)
  );
  console.log(visitedMap);
  const tempCanvas = document.createElement('canvas');
  const ctx = tempCanvas.getContext('2d');

  tempCanvas.width = width;
  tempCanvas.height = height;
  ctx.drawImage(objs.introImages[0], 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  //console.log(width, height);
  //console.log(objs.canvas.width);
  objs.canvas.width = width;
  objs.canvas.height = height;

  //objs.context.putImageData(imageData, 0, 0, 3000, 0, 100, 100);
  // objs.context.putImageData(imageData, 0, 0, 100, 100, 100, 100);
  // objs.context.putImageData(imageData, 0, 0, 200, 100, 100, 100);
  // objs.context.putImageData(imageData, 0, 0, 300, 100, 100, 100);
  // objs.context.putImageData(imageData, 0, 0, 400, 100, 100, 100);
  // objs.context.putImageData(imageData, 0, 0, 0, 200, 100, 100);
  // objs.context.putImageData(imageData, 0, 0, 0, 300, 100, 100);
  //objs.context.drawImage(objs.introImages[0], 0, 0, width, height);
  //console.log(objs.context.getImageData(0, 0, width, height));
  let x = 0,
    y = 0;
  let px = 0,
    py = 0;

  // for (let y = 0; y < objs.canvas.height; y++) {
  //   for (let x = 0; x < objs.canvas.width; x++) {
  //     // (현재 현재 행 * 한 행의 바이트 수 + 구하고자하는 위치) * 4
  //     // const pixelIndex = (y * objs.canvas.width + x) * 4;
  //     // const red = imageData.data[pixelIndex];
  //     // const green = imageData.data[pixelIndex + 1];
  //     // const blue = imageData.data[pixelIndex + 2];
  //     // const alpha = imageData.data[pixelIndex + 3];

  //     // // 픽셀 그리기
  //     // objs.context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${
  //     //   alpha / 255
  //     // })`;

  //     // objs.context.fillRect(x, y, 1, 1);
  //     if (!visitedMap[x][y]) {
  //       requestAnimationFrame(() => {
  //         bfs(x, y, 1);
  //       });
  //     }
  //   }
  // }
  //fadeInRequestAnimaion();
  //bfs(0, 0, 40);

  //fillPixel(x, y);
  //fadeInRequestAnimaionPutImage();
  const fillRange = 20;
  const setArr = [];
  fadeInRequestAnimaionPutImageWave();

  function fadeInRequestAnimaionPutImageWave() {
    console.log(x, y, objs.canvas.width, objs.canvas.height);
    //if (y >= objs.canvas.height || x >= objs.canvas.width) return;

    objs.context.putImageData(imageData, 0, 0, x, y, fillRange, fillRange);
    // 비동기 로직돌릴 때 x,y, 가 해당 시점의 값으로 시작이 안됨 이것은 클로저 활용
    // setTimeout(() => {
    //   prevPutImage(x, y, fillRange);
    // }, 0.5);
    prevPutImage(x, y, fillRange);
    if (x < objs.canvas.width) x += fillRange;
    else y += fillRange;

    if (y > objs.canvas.height && x > objs.canvas.width) {
      setArr.forEach((id) => clearInterval(id));
    }

    if (y < objs.canvas.height && x < objs.canvas.width) {
      window.requestAnimationFrame(() => {
        fadeInRequestAnimaionPutImageWave();
      });

      // setInterval 상용
      // const timeOutId = window.setInterval(() => {
      //   fadeInRequestAnimaionPutImageWave();
      // }, 0.5);
      // setArr.push(timeOutId);
    } else if (y < objs.canvas.height && x > objs.canvas.width) {
      window.requestAnimationFrame(() => {
        fadeInRequestAnimaionPutImageWave();
      });
      // const timeOutId = window.setInterval(() => {
      //   fadeInRequestAnimaionPutImageWave();
      // }, 0.5);
      // setArr.push(timeOutId);
    }
  }

  function prevPutImage(x, y, range) {
    console.log('prev');
    if (x < 0 && y > height) {
      return;
    }
    objs.context.putImageData(
      imageData,
      0,
      0,
      x - range,
      y + range,
      range,
      range
    );
    // setTimeout(() => {
    //   prevPutImage(x - range, y + range, range);
    // }, 0.5);
    prevPutImage(x - range, y + range, range);
  }
  function fadeInRequestAnimaionPutImage() {
    objs.context.putImageData(imageData, 0, 0, x, y, 100, 100);
    x += 100;
    if (x >= objs.canvas.width) {
      x = 0;
      y += 100;
    }

    if (y < objs.canvas.height && x < objs.canvas.width) {
      window.requestAnimationFrame(() => {
        fadeInRequestAnimaionPutImage();
      });
    }
  }
  function fadeInRequestAnimaion() {
    if (!visitedMap[x][y]) bfs(x, y, 40);
    //console.log(x, y);
    x++;
    if (x >= objs.canvas.width) {
      x = 0;
      y += 80;
    }

    if (y < objs.canvas.height && x < objs.canvas.width) {
      window.requestAnimationFrame(() => {
        fadeInRequestAnimaion();
      });
    }
  }

  function bfs(x, y, range) {
    console.log('bfs', x, y);
    // const q = [[x, y]];
    const q = new Queue();
    q.push([x, y]);
    visitedMap[x][y] = true;
    fillOneOfPixel(x, y);
    while (q.length > 0) {
      const [dx, dy] = q.shift();

      for (let [tx, ty] of [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]) {
        const [nx, ny] = [dx + tx, dy + ty];

        // 현재 canvas 범위를 벗어나면
        if (nx < 0 || nx >= height || ny < 0 || ny >= width) continue;
        // 지정 범위안이 아니면
        if (
          nx < x - range ||
          nx > x + range ||
          ny < y - range ||
          ny > y + range
        )
          continue;
        if (visitedMap[nx][ny]) continue;

        fillOneOfPixel(nx, ny);
        visitedMap[nx][ny] = true;
        q.push([nx, ny]);
      }
    }
  }

  function fillPixel(dx, dy) {
    console.log(123);
    const pixelIndex = (dy * objs.canvas.width + dx) * 4;
    const red = imageData.data[pixelIndex];
    const green = imageData.data[pixelIndex + 1];
    const blue = imageData.data[pixelIndex + 2];
    const alpha = imageData.data[pixelIndex + 3];

    // 픽셀 그리기
    objs.context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;

    objs.context.fillRect(dx, dy, 1, 1);
    x++;
    if (x >= objs.canvas.width) {
      x = 0;
      y++;
    }

    if (y < objs.canvas.height && x < objs.canvas.width) {
      window.requestAnimationFrame(() => {
        fillPixel(x, y);
      });
    }
  }

  // 하나의 픽셀 그리기를 담당하는 함수
  function fillOneOfPixel(x, y) {
    const pixelIndex = (y * objs.canvas.width + x) * 4;
    const red = imageData.data[pixelIndex];
    const green = imageData.data[pixelIndex + 1];
    const blue = imageData.data[pixelIndex + 2];
    const alpha = imageData.data[pixelIndex + 3];

    // 픽셀 그리기
    objs.context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;

    objs.context.fillRect(x, y, 1, 1);
  }
}

function loadImages() {
  // 인트로 이미지 로드
  const introFakerImage = document.createElement('img');
  introFakerImage.src = './imgs/intro-fade-in-faker.png';
  introFakerImage.onload = () => {
    console.log('안녕하세요');
    fadeInFakerImage();
  };

  sceneInfo[0].objs.introImages.push(introFakerImage);
}

loadImages();
//fadeInFakerImage();
