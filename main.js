let yOffset = 0; // window.pageYOffset 대신 쓸 변수
let prevScrollHeight = 0; //현재 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
let currentScene = 0; //현재 활성화된 씬
let enterNewScene = false; // 새로운 씬이 시작된 순간
let ahriVideoPlayStatus = false;
let ahriVideoReadyStatus = false;
let tempedCanvasImageData = null;
let isMediaDataLoad = false;

// 스크롤 감속 처리 변수들
let acc = 0.1;
let delayedYOffset = 0;
let rafId;
let rafState;

//4개의 스크롤 구간에 대한 객체배열
const sceneInfo = [
  {
    //0
    type: 'normal', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
    heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#intro_section'),
      afterContainer: document.querySelector('.intro_section-after'),
      afterQuotation: document.querySelector('.intro_section-after h2'),
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
    type: 'sticky', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
    heightNum: 6, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
    scrollHeight: 0,
    finishedLoadingImages: false,
    objs: {
      container: document.querySelector('#second_section'),
      canvas1: document.querySelector('#faker-wakeup-canvas'),
      context1: document.querySelector('#faker-wakeup-canvas').getContext('2d'),
      canvas2: document.querySelector('#faker-lift-canvas'),
      context2: document.querySelector('#faker-lift-canvas').getContext('2d'),
      messageA: document.querySelector('#second_section .main-message.a'),
      messageB: document.querySelector('#second_section .main-message.b'),
      messageC: document.querySelector('#second_section .main-message.c'),
      messageD: document.querySelector('#second_section .main-message.d'),
      messageE: document.querySelector('#second_section .main-message.e'),
      messageF: document.querySelector('#second_section .main-message.f'),
      messageG: document.querySelector('#second_section .main-message.g'),
      messageH: document.querySelector('#second_section .main-message.h'),
      messageI: document.querySelector('#second_section .main-message.i'),

      wakeUpImages: [],
      liftImages: [],
    },
    values: {
      videoImageCount: 276,
      wakeUpImageSequence: [0, Math.floor(276 / 2) - 1, { start: 0, end: 0.5 }],
      wakeUpCanvas_opacity: [1, 0, { start: 0.46, end: 0.52 }],
      canvas2_opacity_out: [1, 0, { start: 0.9, end: 0.95 }],
      // 우승컵 들어올리는 프레임이 많아서 반으로 줄임
      liftImageCount: 722,
      liftImageSequence: [0, Math.floor(722 / 2) - 1, { start: 0.5, end: 0.9 }],
      liftCanvas_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
      // liftCanvas_opacity_out: [1, 0, { start: 0.46, end: 0.52 }],
      messageA_opacity_in: [0, 1, { start: 0, end: 0.1 }],
      messageB_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
      messageC_opacity_in: [0, 1, { start: 0.2, end: 0.3 }],
      messageD_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
      messageE_opacity_in: [0, 1, { start: 0.4, end: 0.5 }],
      messageF_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
      messageG_opacity_in: [0, 1, { start: 0.6, end: 0.7 }],
      messageH_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
      messageI_opacity_in: [0, 1, { start: 0.8, end: 0.9 }],
      messageA_translateY_in: [20, 0, { start: 0, end: 0.1 }],
      messageB_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
      messageC_translateY_in: [20, 0, { start: 0.2, end: 0.3 }],
      messageD_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
      messageE_translateY_in: [20, 0, { start: 0.4, end: 0.5 }],
      messageF_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
      messageG_translateY_in: [20, 0, { start: 0.6, end: 0.7 }],
      messageH_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
      messageI_translateY_in: [20, 0, { start: 0.8, end: 0.9 }],
      messageA_opacity_out: [1, 0, { start: 0.1, end: 0.15 }],
      messageB_opacity_out: [1, 0, { start: 0.2, end: 0.25 }],
      messageC_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
      messageD_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
      messageE_opacity_out: [1, 0, { start: 0.5, end: 0.55 }],
      messageF_opacity_out: [1, 0, { start: 0.6, end: 0.65 }],
      messageG_opacity_out: [1, 0, { start: 0.7, end: 0.75 }],
      messageH_opacity_out: [1, 0, { start: 0.8, end: 0.85 }],
      messageI_opacity_out: [1, 0, { start: 0.9, end: 0.95 }],
      messageA_translateY_out: [0, -20, { start: 0.1, end: 0.15 }],
      messageB_translateY_out: [0, -20, { start: 0.2, end: 0.25 }],
      messageC_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
      messageD_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
      messageE_translateY_out: [0, -20, { start: 0.5, end: 0.55 }],
      messageF_translateY_out: [0, -20, { start: 0.6, end: 0.65 }],
      messageG_translateY_out: [0, -20, { start: 0.7, end: 0.75 }],
      messageH_translateY_out: [0, -20, { start: 0.8, end: 0.85 }],
      messageI_translateY_out: [0, -20, { start: 0.9, end: 0.95 }],
    },
  },
  {
    //2
    type: 'normal', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
    heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#third_section'),
      background: document.querySelector('#third_background'),
    },
    values: {
      background_opacity_in: [0, 1, { start: 0.96, end: 0.99 }],
      background_opacity_out: [1, 0, { start: 0.93, end: 0.97 }],
    },
  },
  {
    //3
    type: 'sticky', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
    heightNum: 6, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
    scrollHeight: 0,
    finishedLoadingImages: false,
    objs: {
      container: document.querySelector('#fourth_section'),
      canvasContainer: document.querySelector('#canvas_container'),
      canvas1: document.querySelector('.image-blend-canvas'),
      canvasUp: document.querySelector('#image-blend-canvas-up'),
      overlayCanvas: document.querySelector('#image-blend-canvas-overlay'),
      tempedCanvas: document.createElement('canvas'),
      context1: document.querySelector('.image-blend-canvas').getContext('2d'),
      overlayContext: document
        .querySelector('#image-blend-canvas-overlay')
        .getContext('2d'),
      canvasUpContext: document
        .querySelector('#image-blend-canvas-up')
        .getContext('2d'),
      assetPath: [
        '/imgs/faker_ahri.jpg',
        '/imgs/faker_LeBlanc.jpg',
        '/imgs/final_ahri.mp4',
        '/imgs/blend_faker.png',
      ],
      assets: [],
    },
    values: {
      rect1X: [0, 0, { start: 0, end: 0 }],
      rect2X: [0, 0, { start: 0, end: 0 }],
      blendHeight: [0, 0, { start: 0, end: 0 }],
      canvas_scale: [0, 0, { start: 0, end: 0 }],
      canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
      canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
      rectStartY: 0,
      // 브랜딩 세션의 흰 박스 스크롤 할 대 계산할 예정
    },
  },
];

function loadingPercent(current, total) {
  const loadingEl = document.querySelector('.loading-bar span');
  const loadingRestfileEl = document.querySelector('.loading-restfile');

  if (loadingEl && loadingRestfileEl) {
    loadingEl.style.width = `${(current / total) * 100}%`;
    loadingRestfileEl.innerText = `(${current + '/' + total})`;
  }
}

/**
 * 캔버스 이미지, 영상 로드
 */
function setCanvasImages() {
  let imageCount = 0;
  let totalImageCount =
    Math.floor(sceneInfo[1].values.videoImageCount / 2) +
    Math.floor(sceneInfo[1].values.liftImageCount / 2);
  console.log(
    Math.floor(sceneInfo[1].values.videoImageCount / 2),
    Math.floor(sceneInfo[1].values.liftImageCount / 2),
    sceneInfo[3].objs.assetPath.length
  );
  for (let i = 1; i <= sceneInfo[1].values.videoImageCount; i++) {
    if (i % 2 !== 0) continue;
    const imgElem = document.createElement('img');
    imgElem.src = `/videos/faker-wakeup/${i}.jpg`;
    imgElem.onload = () => {
      imageCount++;

      loadingPercent(imageCount, totalImageCount);
      if (imageCount >= totalImageCount) {
        isMediaDataLoad = true;
        document.body.classList.remove('before-load');
        sceneInfo[1].objs.finishedLoadingImages = true;

        // 4번째씬 이미지들 로드
        if (!sceneInfo[3].finishedLoadingImages) fourthSceneImagesLoad();
        afterMideaLoad();
      }
    };
    sceneInfo[1].objs.wakeUpImages.push(imgElem);
  }

  for (let i = 1; i <= sceneInfo[1].values.liftImageCount; i++) {
    if (i % 2 !== 0) continue;
    const imgElem = document.createElement('img');
    imgElem.src = `/videos/faker-cup/${i}.jpg`;
    imgElem.onload = () => {
      imageCount++;
      loadingPercent(imageCount, totalImageCount);
      if (imageCount >= totalImageCount) {
        isMediaDataLoad = true;
        document.body.classList.remove('before-load');
        sceneInfo[1].objs.finishedLoadingImages = true;

        // 4번째씬 이미지들 로드
        if (!sceneInfo[3].finishedLoadingImages) fourthSceneImagesLoad();
        afterMideaLoad();
      }
    };
    sceneInfo[1].objs.liftImages.push(imgElem);
  }

  //console.log(sceneInfo[1].objs.wakeUpImages);
}

function fourthSceneImagesLoad() {
  if (sceneInfo[3].finishedLoadingImages) return;

  for (let i = 0; i < sceneInfo[3].objs.assetPath.length; i++) {
    let imgElem;
    if (
      ['jpg', 'png'].includes(
        sceneInfo[3].objs.assetPath[i].split('.')[1].toLowerCase()
      )
    ) {
      imgElem = document.createElement('img');
    } else {
      imgElem = document.createElement('video');
      // 비디오의 모든 정보 이벤트 크기, 시속시간 등
      imgElem.onloadedmetadata = () => {
        ahriVideoReadyStatus = true;
      };

      imgElem.loop = true;
      // 자동재생 조건 만족시키기
      imgElem.muted = true;
    }

    imgElem.src = sceneInfo[3].objs.assetPath[i];
    // imgElem.onload = () => {
    //   imageCount++;
    //   if (imageCount >= totalImageCount) {
    //     isMediaDataLoad = true;
    //     document.body.classList.remove('before-load');
    //     afterMideaLoad();
    //   }
    // };
    sceneInfo[3].objs.assets.push(imgElem);
  }
}

function setLayout() {
  // 각 스크롤 섹션의 높이 세팅
  for (let i = 0; i < sceneInfo.length; i++) {
    if (sceneInfo[i].type === 'sticky') {
      // 스크롤 애니메이션이 필요한 씬의 크기를 늘려줌
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
    } else {
      // 스크롤 애니메이션이 필요 없는 부분은 해당 content의 높이로 지정
      sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
    }

    sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; //
  }
  //console.log(sceneInfo);
  //새로고침시 현재 스크롤 위치에 맞춰서 현재 씬을 반영함
  //씬을 돌면서 height를 더하다가 현재 스크롤 지점이랑 같거나 커지는 지점에서 해당 씬을 넣음
  yOffset = window.scrollY;
  let totalScrollHeight = 0;
  for (let i = 0; i < sceneInfo.length; i++) {
    totalScrollHeight += sceneInfo[i].scrollHeight;
    if (totalScrollHeight >= yOffset) {
      currentScene = i;
      break;
    }
  }
  document.body.setAttribute('id', `show-scene-${currentScene}`);
  const heightRatio = window.innerHeight / 1080;
  const widthRatio = window.innerWidth / 1920;
  //console.log(heightRatio);
  // scale로 크기를 재설정 해주기 떄문에 위치 값을 지정해줘도 제대로 적용이 안됨
  // 이를 해결하기 위해 5050 정렬을 사용
  sceneInfo[1].objs.canvas1.style.transform = `translate3d(-50%,-50%,0) scaleX(${widthRatio}) scaleY(${heightRatio})`;
  sceneInfo[1].objs.canvas2.style.transform = `translate3d(-50%,-50%,0) scaleX(${widthRatio}) scaleY(${heightRatio})`;

  // 새로고침시 살짝 밑으로 스크롤을 내림
  let tempYOffset = yOffset;
  let tempScrollCount = 0;

  if (yOffset > 10 && isMediaDataLoad) {
    let siId = setInterval(() => {
      window.scrollTo(0, tempYOffset);
      tempYOffset += 2;
      tempScrollCount++;

      if (tempScrollCount > 10) {
        clearInterval(siId);
      }
    }, 20);
  }
}

function fadeInFakerImage() {
  const objs = sceneInfo[0].objs;
  const { width, height } = objs.canvas.getBoundingClientRect();

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

  let x = 0,
    y = 0;
  let px = 0,
    py = 0;

  const fillRange = 20;

  fadeInRequestAnimaionPutImageWave();

  function fadeInRequestAnimaionPutImageWave() {
    //console.log(x, y);
    //if (y >= objs.canvas.height || x >= objs.canvas.width) return;

    objs.context.putImageData(imageData, 0, 0, x, y, fillRange, fillRange);

    prevPutImage(x, y, fillRange);

    if (x < objs.canvas.width) x += fillRange;
    else y += fillRange; // 나머지 빈 곳 처리

    if (y < objs.canvas.height && x < objs.canvas.width) {
      window.requestAnimationFrame(() => {
        fadeInRequestAnimaionPutImageWave();
      });
    } else if (y < objs.canvas.height && x >= objs.canvas.width) {
      window.requestAnimationFrame(() => {
        fadeInRequestAnimaionPutImageWave();
      });
    }

    // 이미지가 완전히 덮여졌을 때

    if (y >= objs.canvas.height && x >= objs.canvas.width) {
      objs.afterContainer.style.display = 'block';
      objs.afterQuotation.style.animation = 'faker_quotation-after 2s forwards';
    }
  }

  function prevPutImage(x, y, range) {
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
    prevPutImage(x - range, y + range, range);
  }
}

// 인트로 이미지 로드 함수
function loadImages() {
  // 인트로 이미지 로드
  const introFakerImage = document.createElement('img');
  introFakerImage.src = '/imgs/intro-fade-in-faker.png';
  introFakerImage.onload = () => {
    console.log('안녕하세요');
    // setTimeout(() => {
    //   fadeInFakerImage();
    // }, 2000);
  };

  sceneInfo[0].objs.introImages.push(introFakerImage);
}

/**
 *
 * @param {*} values 변화될 oppacitry
 * @param {*} currentYOffset  현재 씬에서 스크롤된 값
 */
function calcValues(values, currentYOffset) {
  let rv;
  // 현재 씬 스크롤 비율을 나타냄
  let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
  const scrollHeight = sceneInfo[currentScene].scrollHeight;
  //console.log(values);
  if (values.length >= 3) {
    // start ~ end 사이에 애니메이션 실행
    const partScrollStart = values[2].start * scrollHeight;
    const partScrollEnd = values[2].end * scrollHeight;
    const partScrollHeight = partScrollEnd - partScrollStart;

    if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
      // 현재 씬에서 스크롤 된 곳의 비율 만큼 값을 만들어줌, 즉 시작, 끝 값이 지정된 스크롤 위치에서 값으로 매핑
      rv =
        ((currentYOffset - partScrollStart) / partScrollHeight) *
          (values[1] - values[0]) +
        values[0];
    } else if (currentYOffset < partScrollStart) {
      rv = values[0];
    } else if (currentYOffset > partScrollEnd) {
      rv = values[1];
    }
  } else {
    rv = scrollRatio * (values[1] - values[0]) + values[0];
  }
  //console.log('rv', rv);

  return rv;
}

function playAnimation() {
  const objs = sceneInfo[currentScene].objs;
  const values = sceneInfo[currentScene].values;
  const currentYOffset = yOffset - prevScrollHeight;
  const scrollHeight = sceneInfo[currentScene].scrollHeight; // 현재 씬의 높이
  const scrollRatio = currentYOffset / scrollHeight; // currentYOffset / 현재 씬의 높이
  let ahriSceneScrollYOffset;
  //console.log(currentScene);
  // 현재 씬만 애니메이션 되도록 해주는 함수
  switch (currentScene) {
    case 1:
      // let sequence = Math.round(
      //   calcValues(values.imageSequence, currentYOffset)
      // );
      //

      // const sequence1 = Math.round(
      //   calcValues(values.wakeUpImageSequence, currentYOffset)
      // );

      // objs.context1.drawImage(objs.wakeUpImages[sequence1], 0, 0);
      // objs.canvas1.style.opacity = calcValues(
      //   values.wakeUpCanvas_opacity,
      //   currentYOffset
      // );

      // const sequence2 = Math.round(
      //   calcValues(values.liftImageSequence, currentYOffset)
      // );
      // //console.log('sequence2', sequence2);
      // objs.context2.drawImage(objs.liftImages[sequence2], 0, 0);
      // objs.canvas2.style.opacity = calcValues(
      //   values.liftCanvas_opacity_in,
      //   currentYOffset
      // );

      if (scrollRatio <= 0.1) {
        const messageA_opacity_in = calcValues(
          values.messageA_opacity_in,
          currentYOffset
        );
        const messageA_translate_in = calcValues(
          values.messageA_translateY_in,
          currentYOffset
        );

        objs.messageA.style.opacity = messageA_opacity_in;
        objs.messageA.style.transform = `translateY(${messageA_translate_in}%)`;
      } else {
        const messageA_opacity_out = calcValues(
          values.messageA_opacity_out,
          currentYOffset
        );
        const messageA_translate_out = calcValues(
          values.messageA_translateY_out,
          currentYOffset
        );

        objs.messageA.style.opacity = messageA_opacity_out;
        objs.messageA.style.transform = `translateY(${messageA_translate_out}%)`;
      }
      if (scrollRatio <= 0.2) {
        const messageB_opacity_in = calcValues(
          values.messageB_opacity_in,
          currentYOffset
        );
        const messageB_translate_in = calcValues(
          values.messageB_translateY_in,
          currentYOffset
        );
        objs.messageB.style.opacity = messageB_opacity_in;
        objs.messageA.style.transform = `translateY(${messageB_translate_in}%)`;
      } else {
        const messageB_opacity_out = calcValues(
          values.messageB_opacity_out,
          currentYOffset
        );
        const messageB_translate_out = calcValues(
          values.messageB_translateY_out,
          currentYOffset
        );
        objs.messageB.style.opacity = messageB_opacity_out;
        objs.messageB.style.transform = `translateY(${messageB_translate_out}%)`;
      }

      if (scrollRatio <= 0.3) {
        const messageC_opacity_in = calcValues(
          values.messageC_opacity_in,
          currentYOffset
        );
        const messageC_translate_in = calcValues(
          values.messageC_translateY_in,
          currentYOffset
        );
        objs.messageC.style.opacity = messageC_opacity_in;
        objs.messageC.style.transform = `translateY(${messageC_translate_in}%)`;
      } else {
        const messageC_opacity_out = calcValues(
          values.messageC_opacity_out,
          currentYOffset
        );
        const messageC_translate_out = calcValues(
          values.messageC_translateY_out,
          currentYOffset
        );
        objs.messageC.style.opacity = messageC_opacity_out;
        objs.messageC.style.transform = `translateY(${messageC_translate_out}%)`;
      }

      if (scrollRatio <= 0.4) {
        const messageD_opacity_in = calcValues(
          values.messageD_opacity_in,
          currentYOffset
        );
        const messageD_translate_in = calcValues(
          values.messageD_translateY_in,
          currentYOffset
        );
        //console.log('d ', messageD_opacity_in);
        objs.messageD.style.opacity = messageD_opacity_in;
        objs.messageD.style.transform = `translateY(${messageD_translate_in}%)`;
      } else {
        const messageD_opacity_out = calcValues(
          values.messageD_opacity_out,
          currentYOffset
        );
        const messageD_translate_out = calcValues(
          values.messageD_translateY_out,
          currentYOffset
        );
        objs.messageD.style.opacity = messageD_opacity_out;
        objs.messageD.style.transform = `translateY(${messageD_translate_out}%)`;
      }
      if (scrollRatio <= 0.5) {
        const messageE_opacity_in = calcValues(
          values.messageE_opacity_in,
          currentYOffset
        );
        const messageE_translate_in = calcValues(
          values.messageE_translateY_in,
          currentYOffset
        );
        objs.messageE.style.opacity = messageE_opacity_in;
        objs.messageE.style.transform = `translateY(${messageE_translate_in}%)`;
      } else {
        const messageE_opacity_out = calcValues(
          values.messageE_opacity_out,
          currentYOffset
        );
        const messageE_translate_out = calcValues(
          values.messageE_translateY_out,
          currentYOffset
        );
        objs.messageE.style.opacity = messageE_opacity_out;
        objs.messageE.style.transform = `translateY(${messageE_translate_out}%)`;
      }
      if (scrollRatio <= 0.6) {
        const messageF_opacity_in = calcValues(
          values.messageF_opacity_in,
          currentYOffset
        );
        const messageF_translate_in = calcValues(
          values.messageF_translateY_in,
          currentYOffset
        );
        objs.messageF.style.opacity = messageF_opacity_in;
        objs.messageF.style.transform = `translateY(${messageF_translate_in}%)`;
      } else {
        const messageF_opacity_out = calcValues(
          values.messageF_opacity_out,
          currentYOffset
        );
        const messageF_translate_out = calcValues(
          values.messageF_translateY_out,
          currentYOffset
        );
        objs.messageF.style.opacity = messageF_opacity_out;
        objs.messageF.style.transform = `translateY(${messageF_translate_out}%)`;
      }
      if (scrollRatio <= 0.7) {
        const messageG_opacity_in = calcValues(
          values.messageG_opacity_in,
          currentYOffset
        );
        const messageG_translate_in = calcValues(
          values.messageG_translateY_in,
          currentYOffset
        );
        objs.messageG.style.opacity = messageG_opacity_in;
        objs.messageG.style.transform = `translateY(${messageG_translate_in}%)`;
      } else {
        const messageG_opacity_out = calcValues(
          values.messageG_opacity_out,
          currentYOffset
        );
        const messageG_translate_out = calcValues(
          values.messageG_translateY_out,
          currentYOffset
        );
        objs.messageG.style.opacity = messageG_opacity_out;
        objs.messageG.style.transform = `translateY(${messageG_translate_out}%)`;
      }
      if (scrollRatio <= 0.8) {
        const messageH_opacity_in = calcValues(
          values.messageH_opacity_in,
          currentYOffset
        );
        const messageH_translate_in = calcValues(
          values.messageH_translateY_in,
          currentYOffset
        );
        objs.messageH.style.opacity = messageH_opacity_in;
        objs.messageH.style.transform = `translateY(${messageH_translate_in}%)`;
      } else {
        const messageH_opacity_out = calcValues(
          values.messageH_opacity_out,
          currentYOffset
        );
        const messageH_translate_out = calcValues(
          values.messageH_translateY_out,
          currentYOffset
        );
        objs.messageH.style.opacity = messageH_opacity_out;
        objs.messageH.style.transform = `translateY(${messageH_translate_out}%)`;
      }
      if (scrollRatio <= 0.9) {
        const messageI_opacity_in = calcValues(
          values.messageI_opacity_in,
          currentYOffset
        );
        const messageI_translate_in = calcValues(
          values.messageI_translateY_in,
          currentYOffset
        );
        objs.messageI.style.opacity = messageI_opacity_in;
        objs.messageI.style.transform = `translateY(${messageI_translate_in}%)`;
      } else {
        const messageI_opacity_out = calcValues(
          values.messageI_opacity_out,
          currentYOffset
        );
        const messageI_translate_out = calcValues(
          values.messageI_translateY_out,
          currentYOffset
        );
        objs.messageI.style.opacity = messageI_opacity_out;
        objs.messageI.style.transform = `translateY(${messageI_translate_out}%)`;
      }

      if (scrollRatio >= 0.9) {
        objs.canvas2.style.opacity = calcValues(
          values.canvas2_opacity_out,
          currentYOffset
        );
      }
      // 3번째 배경을 미리 불러오는데 오차때문에 생긴 버그 수정해주는 코드
      if (scrollRatio < 0.95) {
        // 3번째 배경을 미리 불러오는데 오차때문에 생긴 버그 수정해주는 코드
        sceneInfo[2].objs.background.style.opacity = 0;
      }
      if (scrollRatio >= 0.95) {
        const background_opacity_in = calcValues(
          sceneInfo[2].values.background_opacity_in,
          currentYOffset
        );
        sceneInfo[2].objs.background.style.opacity = background_opacity_in;
      }

      break;

    case 2:
      // 2번 케이스에 오면 무조건 배경은 1
      sceneInfo[2].objs.background.style.opacity = 1;
      // if (scrollRatio < 0.92) sceneInfo[2].objs.background.style.opacity = 1;
      // else
      //   objs.background.style.opacity = calcValues(
      //     values.background_opacity_out,
      //     currentYOffset
      //   );

      if (scrollRatio >= 0.95) {
        // 4번째 씬 캔버스를 미리 그려줌
        const objs = sceneInfo[3].objs;
        const values = sceneInfo[3].values;

        const widthRatio = window.innerWidth / objs.canvas1.width;
        const heightRatio = window.innerHeight / objs.canvas1.height;
        let canvasScalRatio;

        // 어느 비율에서든 꽉 차게 비율을 구함.
        if (widthRatio <= heightRatio) {
          // 캔버스보다 브라우저 창이 홀쭉한 경우
          canvasScalRatio = heightRatio;
        } else {
          // 캔버스보다 브라우저 창이 납작한 경우
          canvasScalRatio = widthRatio;
        }
        // 캔버스는 픽셀단위라서 px를 명시해줄 필요가 없음
        objs.canvas1.width = `${document.body.offsetWidth}`;
        objs.canvas1.height = `${window.innerHeight}`;
        objs.overlayCanvas.width = `${document.body.offsetWidth}`;
        objs.overlayCanvas.height = `${window.innerHeight}`;
        // objs.canvas1.style.transform = `scale(${canvasScalRatio})`;

        const whiteRectWidth = objs.canvas1.width * 0.5;
        values.rect1X[0] = 0;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] =
          values.rect1X[0] + objs.canvas1.width - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;
        objs.overlayContext.clearRect(
          0,
          0,
          objs.overlayCanvas.width,
          objs.overlayCanvas.height
        );

        // 아리 양옆 이미지
        objs.overlayContext.drawImage(
          objs.assets[0],
          values.rect1X[0],
          0,
          parseInt(whiteRectWidth),
          window.innerHeight
        );
        objs.overlayContext.drawImage(
          objs.assets[1],
          values.rect2X[0],
          0,
          parseInt(whiteRectWidth),
          window.innerHeight
        );
        // 이미지 테두리
        objs.overlayContext.strokeRect(
          values.rect1X[0],
          0,
          parseInt(whiteRectWidth),
          window.innerHeight
        );
        objs.overlayContext.strokeRect(
          values.rect2X[0],
          0,
          parseInt(whiteRectWidth),
          window.innerHeight
        );
      }
      break;

    case 3:
      // console.log('3 play');
      const widthRatio = window.innerWidth / objs.canvasUp.width;
      const heightRatio = window.innerHeight / objs.canvasUp.height;
      let canvasScalRatio;
      objs.canvas1.style.opacity = 1;
      objs.overlayCanvas.style.opacity = 1;

      // 어느 비율에서든 꽉 차게 비율을 구함.
      if (widthRatio <= heightRatio) {
        // 캔버스보다 브라우저 창이 홀쭉한 경우
        canvasScalRatio = heightRatio;
      } else {
        // 캔버스보다 브라우저 창이 납작한 경우
        canvasScalRatio = widthRatio;
      }
      // 캔버스는 픽셀단위라서 px를 명시해줄 필요가 없음
      // 캔버스는 크기를 지정하면 그린 내용을 초기화 시킴
      objs.canvas1.width = `${document.body.offsetWidth}`;
      objs.canvas1.height = `${window.innerHeight}`;
      objs.overlayCanvas.width = `${document.body.offsetWidth}`;
      objs.overlayCanvas.height = `${window.innerHeight}`;
      // transform으로 했기때문에 초기화가 안됨
      objs.canvasUp.style.transform = `scale(${canvasScalRatio})`;
      objs.canvasUp.style.top = `${
        -(objs.canvasUp.height - objs.canvasUp.height * canvasScalRatio) / 2
      }px`;

      if (!values.rectStartY) {
        // 스크롤 이벤트가 발생한나 순간 값을 가져옴, 속도에 따라 값이 변함 (아래 코드는)
        //values.rectStartY = objs.canvas.getBoundingClientRect().top;
        // 위의 문제를 해결하기 위해 offSetTop를 사용
        // 왼쪽 값에 빨간거 높이에서 연두색 높이를 빼고 나누기 2를 해주면됨

        values.rectStartY = objs.canvasContainer.offsetTop;

        values.rect1X[2].start = window.innerHeight / 2 / scrollHeight;
        values.rect2X[2].start = window.innerHeight / 2 / scrollHeight;
        // 해당 캔버스가 맨위로 가는 시점을 비율료 나타낸것
        values.rect1X[2].end = values.rectStartY / scrollHeight;
        values.rect2X[2].end = values.rectStartY / scrollHeight;

        // 테두리 크기 지정
        objs.overlayContext.lineWidth = 20;
      }

      // 처음 진입시 비디오 재생
      if (!ahriVideoPlayStatus && ahriVideoReadyStatus) {
        console.log('비디오 재생 시작');
        objs.assets[2].play();
        ahriVideoPlayStatus = true;
        canvasVideoAutoPlay(
          objs.context1,
          objs.assets[2],
          objs.canvas1.width,
          window.innerHeight,
          values,
          currentYOffset
        );
      }

      const whiteRectWidth = objs.canvas1.width * 0.5;
      values.rect1X[0] = 0;
      values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
      values.rect2X[0] = values.rect1X[0] + objs.canvas1.width - whiteRectWidth;
      values.rect2X[1] = values.rect2X[0] + whiteRectWidth;
      // objs.context1.drawImage(objs.assets[1], 0, 0);
      // objs.context1.fillRect(0, 0, 500, 500);

      // objs.overlayContext.clearRect(
      //   0,
      //   0,
      //   objs.overlayCanvas.width,
      //   objs.overlayCanvas.height
      // );

      // 아리 양옆 이미지
      objs.overlayContext.drawImage(
        objs.assets[0],
        parseInt(calcValues(values.rect1X, currentYOffset)),
        0,
        parseInt(whiteRectWidth),
        window.innerHeight
      );
      objs.overlayContext.drawImage(
        objs.assets[1],
        parseInt(calcValues(values.rect2X, currentYOffset)),
        0,
        parseInt(whiteRectWidth),
        window.innerHeight
      );
      // 이미지 테두리
      objs.overlayContext.strokeRect(
        parseInt(calcValues(values.rect1X, currentYOffset)),
        0,
        parseInt(whiteRectWidth),
        window.innerHeight
      );
      objs.overlayContext.strokeRect(
        parseInt(calcValues(values.rect2X, currentYOffset)),
        0,
        parseInt(whiteRectWidth),
        window.innerHeight
      );

      // objs.overlayContext.fillRect(
      //   parseInt(calcValues(values.rect1X, currentYOffset)),
      //   0,
      //   parseInt(whiteRectWidth),
      //   window.innerHeight
      // );
      // objs.overlayContext.fillRect(
      //   parseInt(calcValues(values.rect2X, currentYOffset)),
      //   0,
      //   parseInt(whiteRectWidth),
      //   window.innerHeight
      // );
      if (scrollRatio < values.rect1X[2].end) {
        // 아리가 상단에 닿았을 때
        objs.canvasContainer.classList.remove('sticky');

        //objs.canvasUp.classList.('sticky');
      } else if (scrollRatio >= values.rect1X[2].end) {
        objs.canvasContainer.classList.add('sticky');

        //objs.canvasUp.classList.add('sticky');

        // 이미지 블렌드
        // imageBlendY: [0, 0, {start:y, end:0}]
        // 이미지의 width, height를 안 넣어주면 원래 이미지 크기로 그림
        values.blendHeight[0] = 0;
        values.blendHeight[1] = objs.canvasUp.height;
        values.blendHeight[2].start = values.rect1X[2].end;
        values.blendHeight[2].end = values.blendHeight[2].start + 0.25; // 스크롤 끝나는 기간을 정함

        // 크기가 가변적이기 때문에 이미지를 캔버스에 미리 그려놓고 복사

        const [width, height] = [objs.canvasUp.width, objs.canvasUp.height];

        // const tempCanvas = document.createElement('canvas');
        // const tempCtx = tempCanvas.getContext('2d');

        // tempCanvas.width = width;
        // tempCanvas.height = height;
        // tempCtx.drawImage(objs.assets[3], 0, 0, width, height);
        const imageData = tempedCanvas(width, height);

        const blendHeight = calcValues(values.blendHeight, currentYOffset);

        // 이미지 아래서 부터 그리기
        // canvasUpContext는 크기를 다시 지정하지 않기 때문에 clearRect를 사용해야함
        objs.canvasUpContext.clearRect(0, 0, width, height);
        objs.canvasUpContext.putImageData(
          imageData,
          0,
          0,
          0,
          objs.canvasUp.height - blendHeight,
          width,
          height
        );

        // 블랜드 이미지 축소 애니메이션 시작
        if (scrollRatio > values.blendHeight[2].end) {
          objs.canvas1.style.opacity = 0;
          objs.overlayCanvas.style.opacity = 0;
          values.canvas_scale[0] = canvasScalRatio; // 블랜드 이미지 축소 애니메이션 초기값
          values.canvas_scale[1] =
            document.body.offsetWidth / (1.2 * objs.canvasUp.width); // 블랜드 이미지 축소 애니메이션 끝값
          values.canvas_scale[2].start = values.blendHeight[2].end; // 애니메이션 시작 위치
          values.canvas_scale[2].end = values.canvas_scale[2].start + 0.25; // 애니메이션 시작 위치

          objs.canvasUp.style.transform = `scale(${calcValues(
            values.canvas_scale,
            currentYOffset
          )})`;
          // 스크롤이 다시 올라갈 때 마진을 없애줘야함
          objs.canvasContainer.style.marginTop = 0;
        }

        if (
          values.canvas_scale[2].end > 0 &&
          scrollRatio > values.canvas_scale[2].end
        ) {
          // 블랜드 이미지가 fixed일 때 스크롤 된 길이 만큼 마진으로 해줘야함
          // fixed를 풀어주면 그만큼 위로 위치가 올라가기 때문
          // 근데 0.4배를 해주면됨 블랜드 이미지가 스크롤 이벤트가 실행된 기간은 0.4, 40퍼센트이기 때문
          objs.canvasContainer.classList.remove('sticky');
          objs.canvasContainer.style.marginTop = `${scrollHeight * 0.5}px`;
        }
      }

      break;
  }
}

// 네번째 씬 세번째 블랜딩 캔버스 초기화
function tempedCanvas(width, height) {
  if (tempedCanvasImageData) return tempedCanvasImageData;

  const tempCanvas = sceneInfo[3].objs.tempedCanvas;
  const tempCtx = tempCanvas.getContext('2d');

  tempCanvas.width = width;
  tempCanvas.height = height;
  try {
    tempCtx.drawImage(sceneInfo[3].objs.assets[3], 0, 0, width, height);
  } catch (e) {
    console.log('아직 이미지가 준비 안됨');
  }
  const imageData = tempCtx.getImageData(0, 0, width, height);
  tempedCanvasImageData = imageData;
  return imageData;
}

function canvasVideoAutoPlay(
  context,
  video,
  width,
  height,
  values,
  currentYOffset
) {
  if (!ahriVideoPlayStatus) return;

  //context.drawImage(video, 0, 0, 100, 100);
  context.drawImage(video, 0, 0, width, height);

  //context.drawImage(video, 0, 0);
  requestAnimationFrame(() => {
    canvasVideoAutoPlay(context, video, width, height, values, currentYOffset);
  });
}

// 수상경력 iframe toggle 이벤트
function awardEventEnroll() {
  let currentIndex = -1;

  const award_iframe_elems = document.querySelectorAll(
    '.award_wrap_list_award_card'
  );

  //console.log(document.querySelector('.award_wrap_list::after'));

  award_iframe_elems.forEach((item, i) => {
    // 부모 요소로 부터 거리
    //console.log('offsetParent', item.offsetTop);
    item.addEventListener('click', () => {
      currentIndex = i;

      // 클릭되면 변화된 길이만큼 동적으로 높이를 조정해줌
      if (!item.classList.contains('active')) {
        if (window.offsetWidth < 1024) {
          sceneInfo[2].objs.container.style.height = `${
            sceneInfo[2].scrollHeight + 400
          }px`;
          sceneInfo[2].scrollHeight += 400;
        } else {
          sceneInfo[2].objs.container.style.height = `${
            sceneInfo[2].scrollHeight + 700
          }px`;
          sceneInfo[2].scrollHeight += 700;
        }
        console.log(sceneInfo[2].objs.scrollHeight);
      } else {
        if (window.offsetWidth < 1024) {
          sceneInfo[2].objs.container.style.height = `${
            sceneInfo[2].scrollHeight - 400
          }px`;
          sceneInfo[2].scrollHeight -= 400;
        } else {
          sceneInfo[2].objs.container.style.height = `${
            sceneInfo[2].scrollHeight - 700
          }px`;
          sceneInfo[2].scrollHeight -= 700;
        }
      }

      const timeLineHeight = Math.min(
        item.querySelector('p').getBoundingClientRect().height / 2 +
          item.offsetTop,
        item.offsetParent.getBoundingClientRect().height
      );
      // timeline 높이 지정
      //console.log(timeLineHeight);
      document.body.style.setProperty(
        '--timeline-height',
        `${timeLineHeight}px`
      );
      award_iframe_elems.forEach((el, index) => {
        if (index < currentIndex) {
          el.classList.add('passed');
        } else if (index === currentIndex) {
          el.classList.toggle('active');
          el.classList.remove('passed');
        } else {
          // el.classList.remove('passed');
          // el.classList.remove('active');
        }
      });
    });
  });
}

function scrollLoop() {
  enterNewScene = false;
  prevScrollHeight = 0; //currentScene 으로 현재 내가 보고있는 씬에서 이전의 씬들의 값을 구해줌 2번쨰 씬을 보고있으면 1번째 씬의 높이 값이 할당됨
  for (let i = 0; i < currentScene; i++) {
    prevScrollHeight += sceneInfo[i].scrollHeight;
    //console.log(prevScrollHeight);
  }
  //console.log(sceneInfo[currentScene], currentScene);
  // 애니메이션 감속 처리때문에 기존의 yOffset으로 판별하면 어색해질 수 있음
  // 그걸 방지하기 위해 yOffset > delayedYOffset으로 변경 기존 다른 애니메이션은 상돤이 없음
  if (
    delayedYOffset >
    prevScrollHeight + sceneInfo[currentScene].scrollHeight
  ) {
    enterNewScene = true;
    // 씬이 3을 안 넘어가게 하기
    if (currentScene < sceneInfo.length - 1) {
      currentScene++;
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  if (delayedYOffset < prevScrollHeight) {
    enterNewScene = true;
    if (currentScene === 0) return; //브라우져가 바운스효과가 일어나면 yOffset이 마이너스가 될 수 있음 그걸 방지
    currentScene--;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  if (enterNewScene) return; // 씬이 바뀌는 순간 calcValues가 음수값이 나오는 것을 방지하기 위해 종료
  playAnimation();
}

// 애니메이션 감속처리 루프
function loop() {
  // 속도 감속처리 식
  delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

  if (!enterNewScene) {
    // 씬이 바뀔 때 계산 오차를 방지하기 위해 enterNewScene가 아닐 때 수행

    if (currentScene === 1) {
      const currentYOffset = delayedYOffset - prevScrollHeight;
      const objs = sceneInfo[currentScene].objs;
      const values = sceneInfo[currentScene].values;

      const sequence1 = Math.round(
        calcValues(values.wakeUpImageSequence, currentYOffset)
      );
      if (objs.wakeUpImages[sequence1]) {
        objs.context1.drawImage(objs.wakeUpImages[sequence1], 0, 0);
        objs.canvas1.style.opacity = calcValues(
          values.wakeUpCanvas_opacity,
          currentYOffset
        );
      }

      const sequence2 = Math.round(
        calcValues(values.liftImageSequence, currentYOffset)
      );

      //console.log('sequence2', sequence2);
      if (objs.liftImages[sequence2]) {
        objs.context2.drawImage(objs.liftImages[sequence2], 0, 0);
        objs.canvas2.style.opacity = calcValues(
          values.liftCanvas_opacity_in,
          currentYOffset
        );
      }
    }
  }

  rafId = requestAnimationFrame(loop);

  // 무한 호출을 멈추기 위한 과정
  // abs는 스크롤을 위로할 때 대비
  if (Math.abs(yOffset - delayedYOffset) < 1) {
    cancelAnimationFrame(rafId);
    rafState = false;
  }
}

function afterMideaLoad() {
  console.log('미디어 데이터 로드');
  setTimeout(() => {
    fadeInFakerImage();
  }, 2000);
  setLayout();
}

loadImages();
setCanvasImages();

window.addEventListener('load', () => {
  //awardEventEnroll();
  // loadImages();

  awardEventEnroll();

  window.addEventListener('scroll', (e) => {
    yOffset = window.scrollY;
    scrollLoop();

    if (!rafState) {
      rafId = requestAnimationFrame(loop);
      rafState = true;
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) {
      // 사이즈가 바뀔 때 해당값을 변경해주지 않음
      // 기존의 아래 값은 0일때 한번 세팅을 해줌 하지만 resize가 일어나면 값을 바꿔주기 떄문에 설정
      // setLayout();
      // sceneInfo[3].values.rectStartY = 0;

      window.location.reload();
    }
  });

  window.addEventListener('orientationchange', () => {
    // 모바일에서 방향전환이 일어날 때 가로 세로
    scrollTo(0, 0);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  });

  document.querySelector('.loading').addEventListener('transitionend', (e) => {
    // 트랜지션이 끝났을 때 이벤트
    document.body.removeChild(e.currentTarget);
  });
});

//fadeInFakerImage();
