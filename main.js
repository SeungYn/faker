let yOffset = 0; // window.pageYOffset 대신 쓸 변수
let prevScrollHeight = 0; //현재 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
let currentScene = 0; //현재 활성화된 씬
let enterNewScene = false; // 새로운 씬이 시작된 순간
let ahriVideoPlayStatus = false;
let ahriVideoReadyStatus = false;
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
      wakeUpImageSequence: [0, 275, { start: 0, end: 0.5 }],
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
    heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#fourth_section'),
      canvasContainer: document.querySelector('#canvas_container'),
      canvas1: document.querySelector('.image-blend-canvas'),
      overlayCanvas: document.querySelector('#image-blend-canvas-overlay'),
      context1: document.querySelector('.image-blend-canvas').getContext('2d'),
      overlayContext: document
        .querySelector('#image-blend-canvas-overlay')
        .getContext('2d'),
      assetPath: [
        './imgs/faker_ahri.jpg',
        './imgs/faker_LeBlanc.jpg',
        './imgs/final_ahri.mp4',
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

/**
 * 캔버스 이미지, 영상 로드
 */
function setCanvasImages() {
  for (let i = 1; i <= sceneInfo[1].values.videoImageCount; i++) {
    const imgElem = document.createElement('img');
    imgElem.src = `./videos/faker-wakeup/${i}.jpg`;
    sceneInfo[1].objs.wakeUpImages.push(imgElem);
  }

  for (let i = 1; i <= sceneInfo[1].values.liftImageCount; i++) {
    if (i % 2 !== 0) continue;
    const imgElem = document.createElement('img');
    imgElem.src = `./videos/faker-cup/${i}.jpg`;
    sceneInfo[1].objs.liftImages.push(imgElem);
  }

  for (let i = 0; i < sceneInfo[3].objs.assetPath.length; i++) {
    let imgElem;
    if (
      ['jpg', 'png'].includes(
        sceneInfo[3].objs.assetPath[i].split('.')[2].toLowerCase()
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
      console.log({ imgElem });
      Object.keys(imgElem).forEach((property) => {
        console.log(property + ':', imgElem[property]);
      });
    }
    imgElem.src = sceneInfo[3].objs.assetPath[i];
    sceneInfo[3].objs.assets.push(imgElem);
  }
  console.log(sceneInfo[3].objs.assets);

  //console.log(sceneInfo[1].objs.wakeUpImages);
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
    } else if (y < objs.canvas.height && x > objs.canvas.width) {
      window.requestAnimationFrame(() => {
        fadeInRequestAnimaionPutImageWave();
      });
    }

    // 이미지가 완전히 덮여졌을 때

    if (y > objs.canvas.height && x > objs.canvas.width) {
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
  introFakerImage.src = './imgs/intro-fade-in-faker.png';
  introFakerImage.onload = () => {
    console.log('안녕하세요');
    setTimeout(() => {
      fadeInFakerImage();
    }, 2000);
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

      const sequence1 = Math.round(
        calcValues(values.wakeUpImageSequence, currentYOffset)
      );

      objs.context1.drawImage(objs.wakeUpImages[sequence1], 0, 0);
      objs.canvas1.style.opacity = calcValues(
        values.wakeUpCanvas_opacity,
        currentYOffset
      );

      const sequence2 = Math.round(
        calcValues(values.liftImageSequence, currentYOffset)
      );
      //console.log('sequence2', sequence2);
      objs.context2.drawImage(objs.liftImages[sequence2], 0, 0);
      objs.canvas2.style.opacity = calcValues(
        values.liftCanvas_opacity_in,
        currentYOffset
      );

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
      if (scrollRatio < 0.92) sceneInfo[2].objs.background.style.opacity = 1;
      else
        objs.background.style.opacity = calcValues(
          values.background_opacity_out,
          currentYOffset
        );

      break;

    case 3:
      // console.log('3 play');
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
        console.log('top', objs.canvasContainer.offsetTop, values);
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
          window.innerWidth,
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

      objs.overlayContext.clearRect(
        0,
        0,
        objs.overlayCanvas.width,
        objs.overlayCanvas.height
      );

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

      break;
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
      canvasVideoAutoPlay(
        context,
        video,
        width,
        height,
        values,
        currentYOffset
      );
    });
  }
}

// 페이커 아리 애니메이션 부분
// function canvasVideoAutoPlay(
//   context,
//   video,
//   width,
//   height,
//   values,
//   currentYOffset
// ) {
//   if (!ahriVideoPlayStatus) return;

//   //context.drawImage(video, 0, 0, 100, 100);
//   context.drawImage(video, 0, 0, width, height);
//   context.fillRect(
//     parseInt(calcValues(values.rect1X, currentYOffset)),
//     0,
//     parseInt(width * 0.15),
//     height
//   );
//   context.fillRect(
//     parseInt(calcValues(values.rect2X, currentYOffset)),
//     0,
//     parseInt(width * 0.15),
//     height
//   );

//   //context.drawImage(video, 0, 0);
//   requestAnimationFrame(() => {
//     canvasVideoAutoPlay(context, video, width, height, values, currentYOffset);
//   });
// }

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
  if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
    enterNewScene = true;
    currentScene++;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  if (yOffset < prevScrollHeight) {
    enterNewScene = true;
    if (currentScene === 0) return; //브라우져가 바운스효과가 일어나면 yOffset이 마이너스가 될 수 있음 그걸 방지
    currentScene--;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  if (enterNewScene) return; // 씬이 바뀌는 순간 calcValues가 음수값이 나오는 것을 방지하기 위해 종료
  playAnimation();
}

loadImages();
setCanvasImages();
awardEventEnroll();

window.addEventListener('scroll', (e) => {
  yOffset = window.scrollY;
  scrollLoop();
});

window.addEventListener('load', () => {
  setLayout();
  //awardEventEnroll();
  // loadImages();
});

//fadeInFakerImage();
