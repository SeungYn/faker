(()=>{let e,t,a=0,s=0,n=0,o=!1,r=!1,c=!1,i=null,l=!1,g=0;const d=[{type:"normal",heightNum:5,scrollHeight:0,objs:{container:document.querySelector("#intro_section"),afterContainer:document.querySelector(".intro_section-after"),afterQuotation:document.querySelector(".intro_section-after h2"),canvas:document.querySelector("#fade-in-faker-canvas"),context:document.querySelector("#fade-in-faker-canvas").getContext("2d"),introImages:[]},values:{}},{type:"sticky",heightNum:6,scrollHeight:0,objs:{container:document.querySelector("#second_section"),canvas1:document.querySelector("#faker-wakeup-canvas"),context1:document.querySelector("#faker-wakeup-canvas").getContext("2d"),canvas2:document.querySelector("#faker-lift-canvas"),context2:document.querySelector("#faker-lift-canvas").getContext("2d"),messageA:document.querySelector("#second_section .main-message.a"),messageB:document.querySelector("#second_section .main-message.b"),messageC:document.querySelector("#second_section .main-message.c"),messageD:document.querySelector("#second_section .main-message.d"),messageE:document.querySelector("#second_section .main-message.e"),messageF:document.querySelector("#second_section .main-message.f"),messageG:document.querySelector("#second_section .main-message.g"),messageH:document.querySelector("#second_section .main-message.h"),messageI:document.querySelector("#second_section .main-message.i"),wakeUpImages:[],liftImages:[]},values:{videoImageCount:276,wakeUpImageSequence:[0,275,{start:0,end:.5}],wakeUpCanvas_opacity:[1,0,{start:.46,end:.52}],canvas2_opacity_out:[1,0,{start:.9,end:.95}],liftImageCount:722,liftImageSequence:[0,Math.floor(361)-1,{start:.5,end:.9}],liftCanvas_opacity_in:[0,1,{start:.5,end:.55}],messageA_opacity_in:[0,1,{start:0,end:.1}],messageB_opacity_in:[0,1,{start:.1,end:.2}],messageC_opacity_in:[0,1,{start:.2,end:.3}],messageD_opacity_in:[0,1,{start:.3,end:.4}],messageE_opacity_in:[0,1,{start:.4,end:.5}],messageF_opacity_in:[0,1,{start:.5,end:.6}],messageG_opacity_in:[0,1,{start:.6,end:.7}],messageH_opacity_in:[0,1,{start:.7,end:.8}],messageI_opacity_in:[0,1,{start:.8,end:.9}],messageA_translateY_in:[20,0,{start:0,end:.1}],messageB_translateY_in:[20,0,{start:.1,end:.2}],messageC_translateY_in:[20,0,{start:.2,end:.3}],messageD_translateY_in:[20,0,{start:.3,end:.4}],messageE_translateY_in:[20,0,{start:.4,end:.5}],messageF_translateY_in:[20,0,{start:.5,end:.6}],messageG_translateY_in:[20,0,{start:.6,end:.7}],messageH_translateY_in:[20,0,{start:.7,end:.8}],messageI_translateY_in:[20,0,{start:.8,end:.9}],messageA_opacity_out:[1,0,{start:.1,end:.15}],messageB_opacity_out:[1,0,{start:.2,end:.25}],messageC_opacity_out:[1,0,{start:.3,end:.35}],messageD_opacity_out:[1,0,{start:.4,end:.45}],messageE_opacity_out:[1,0,{start:.5,end:.55}],messageF_opacity_out:[1,0,{start:.6,end:.65}],messageG_opacity_out:[1,0,{start:.7,end:.75}],messageH_opacity_out:[1,0,{start:.8,end:.85}],messageI_opacity_out:[1,0,{start:.9,end:.95}],messageA_translateY_out:[0,-20,{start:.1,end:.15}],messageB_translateY_out:[0,-20,{start:.2,end:.25}],messageC_translateY_out:[0,-20,{start:.3,end:.35}],messageD_translateY_out:[0,-20,{start:.4,end:.45}],messageE_translateY_out:[0,-20,{start:.5,end:.55}],messageF_translateY_out:[0,-20,{start:.6,end:.65}],messageG_translateY_out:[0,-20,{start:.7,end:.75}],messageH_translateY_out:[0,-20,{start:.8,end:.85}],messageI_translateY_out:[0,-20,{start:.9,end:.95}]}},{type:"normal",heightNum:5,scrollHeight:0,objs:{container:document.querySelector("#third_section"),background:document.querySelector("#third_background")},values:{background_opacity_in:[0,1,{start:.96,end:.99}],background_opacity_out:[1,0,{start:.93,end:.97}]}},{type:"sticky",heightNum:6,scrollHeight:0,objs:{container:document.querySelector("#fourth_section"),canvasContainer:document.querySelector("#canvas_container"),canvas1:document.querySelector(".image-blend-canvas"),canvasUp:document.querySelector("#image-blend-canvas-up"),overlayCanvas:document.querySelector("#image-blend-canvas-overlay"),tempedCanvas:document.createElement("canvas"),context1:document.querySelector(".image-blend-canvas").getContext("2d"),overlayContext:document.querySelector("#image-blend-canvas-overlay").getContext("2d"),canvasUpContext:document.querySelector("#image-blend-canvas-up").getContext("2d"),assetPath:["/imgs/faker_ahri.jpg","/imgs/faker_LeBlanc.jpg","/imgs/final_ahri.mp4","/imgs/blend_faker.png"],assets:[]},values:{rect1X:[0,0,{start:0,end:0}],rect2X:[0,0,{start:0,end:0}],blendHeight:[0,0,{start:0,end:0}],canvas_scale:[0,0,{start:0,end:0}],canvasCaption_opacity:[0,1,{start:0,end:0}],canvasCaption_translateY:[20,0,{start:0,end:0}],rectStartY:0}}];function m(){const e=d[0].objs,{width:t,height:a}=e.canvas.getBoundingClientRect(),s=document.createElement("canvas"),n=s.getContext("2d");s.width=t,s.height=a,n.drawImage(e.introImages[0],0,0,t,a);const o=n.getImageData(0,0,t,a);e.canvas.width=t,e.canvas.height=a;let r=0,c=0;function i(t,s,n){t<0&&s>a||(e.context.putImageData(o,0,0,t-n,s+n,n,n),i(t-n,s+n,n))}!function t(){e.context.putImageData(o,0,0,r,c,20,20),i(r,c,20),r<e.canvas.width?r+=20:c+=20,(c<e.canvas.height&&r<e.canvas.width||c<e.canvas.height&&r>=e.canvas.width)&&window.requestAnimationFrame((()=>{t()})),c>=e.canvas.height&&r>=e.canvas.width&&(e.afterContainer.style.display="block",e.afterQuotation.style.animation="faker_quotation-after 2s forwards")}()}function y(e,t){let a,s=t/d[n].scrollHeight;const o=d[n].scrollHeight;if(e.length>=3){const s=e[2].start*o,n=e[2].end*o;t>=s&&t<=n?a=(t-s)/(n-s)*(e[1]-e[0])+e[0]:t<s?a=e[0]:t>n&&(a=e[1])}else a=s*(e[1]-e[0])+e[0];return a}function u(){const e=d[n].objs,t=d[n].values,o=a-s,l=d[n].scrollHeight,g=o/l;switch(n){case 1:if(g<=.1){const a=y(t.messageA_opacity_in,o),s=y(t.messageA_translateY_in,o);e.messageA.style.opacity=a,e.messageA.style.transform=`translateY(${s}%)`}else{const a=y(t.messageA_opacity_out,o),s=y(t.messageA_translateY_out,o);e.messageA.style.opacity=a,e.messageA.style.transform=`translateY(${s}%)`}if(g<=.2){const a=y(t.messageB_opacity_in,o),s=y(t.messageB_translateY_in,o);e.messageB.style.opacity=a,e.messageA.style.transform=`translateY(${s}%)`}else{const a=y(t.messageB_opacity_out,o),s=y(t.messageB_translateY_out,o);e.messageB.style.opacity=a,e.messageB.style.transform=`translateY(${s}%)`}if(g<=.3){const a=y(t.messageC_opacity_in,o),s=y(t.messageC_translateY_in,o);e.messageC.style.opacity=a,e.messageC.style.transform=`translateY(${s}%)`}else{const a=y(t.messageC_opacity_out,o),s=y(t.messageC_translateY_out,o);e.messageC.style.opacity=a,e.messageC.style.transform=`translateY(${s}%)`}if(g<=.4){const a=y(t.messageD_opacity_in,o),s=y(t.messageD_translateY_in,o);e.messageD.style.opacity=a,e.messageD.style.transform=`translateY(${s}%)`}else{const a=y(t.messageD_opacity_out,o),s=y(t.messageD_translateY_out,o);e.messageD.style.opacity=a,e.messageD.style.transform=`translateY(${s}%)`}if(g<=.5){const a=y(t.messageE_opacity_in,o),s=y(t.messageE_translateY_in,o);e.messageE.style.opacity=a,e.messageE.style.transform=`translateY(${s}%)`}else{const a=y(t.messageE_opacity_out,o),s=y(t.messageE_translateY_out,o);e.messageE.style.opacity=a,e.messageE.style.transform=`translateY(${s}%)`}if(g<=.6){const a=y(t.messageF_opacity_in,o),s=y(t.messageF_translateY_in,o);e.messageF.style.opacity=a,e.messageF.style.transform=`translateY(${s}%)`}else{const a=y(t.messageF_opacity_out,o),s=y(t.messageF_translateY_out,o);e.messageF.style.opacity=a,e.messageF.style.transform=`translateY(${s}%)`}if(g<=.7){const a=y(t.messageG_opacity_in,o),s=y(t.messageG_translateY_in,o);e.messageG.style.opacity=a,e.messageG.style.transform=`translateY(${s}%)`}else{const a=y(t.messageG_opacity_out,o),s=y(t.messageG_translateY_out,o);e.messageG.style.opacity=a,e.messageG.style.transform=`translateY(${s}%)`}if(g<=.8){const a=y(t.messageH_opacity_in,o),s=y(t.messageH_translateY_in,o);e.messageH.style.opacity=a,e.messageH.style.transform=`translateY(${s}%)`}else{const a=y(t.messageH_opacity_out,o),s=y(t.messageH_translateY_out,o);e.messageH.style.opacity=a,e.messageH.style.transform=`translateY(${s}%)`}if(g<=.9){const a=y(t.messageI_opacity_in,o),s=y(t.messageI_translateY_in,o);e.messageI.style.opacity=a,e.messageI.style.transform=`translateY(${s}%)`}else{const a=y(t.messageI_opacity_out,o),s=y(t.messageI_translateY_out,o);e.messageI.style.opacity=a,e.messageI.style.transform=`translateY(${s}%)`}if(g>=.9&&(e.canvas2.style.opacity=y(t.canvas2_opacity_out,o)),g<.95&&(d[2].objs.background.style.opacity=0),g>=.95){const e=y(d[2].values.background_opacity_in,o);d[2].objs.background.style.opacity=e}break;case 2:if(d[2].objs.background.style.opacity=1,g>=.95){const e=d[3].objs,t=d[3].values,a=window.innerWidth/e.canvas1.width,s=window.innerHeight/e.canvas1.height;let n;n=a<=s?s:a,e.canvas1.width=`${document.body.offsetWidth}`,e.canvas1.height=`${window.innerHeight}`,e.overlayCanvas.width=`${document.body.offsetWidth}`,e.overlayCanvas.height=`${window.innerHeight}`;const o=.5*e.canvas1.width;t.rect1X[0]=0,t.rect1X[1]=t.rect1X[0]-o,t.rect2X[0]=t.rect1X[0]+e.canvas1.width-o,t.rect2X[1]=t.rect2X[0]+o,e.overlayContext.clearRect(0,0,e.overlayCanvas.width,e.overlayCanvas.height),e.overlayContext.drawImage(e.assets[0],t.rect1X[0],0,parseInt(o),window.innerHeight),e.overlayContext.drawImage(e.assets[1],t.rect2X[0],0,parseInt(o),window.innerHeight),e.overlayContext.strokeRect(t.rect1X[0],0,parseInt(o),window.innerHeight),e.overlayContext.strokeRect(t.rect2X[0],0,parseInt(o),window.innerHeight)}break;case 3:const a=window.innerWidth/e.canvasUp.width,s=window.innerHeight/e.canvasUp.height;let n;e.canvas1.style.opacity=1,e.overlayCanvas.style.opacity=1,n=a<=s?s:a,e.canvas1.width=`${document.body.offsetWidth}`,e.canvas1.height=`${window.innerHeight}`,e.overlayCanvas.width=`${document.body.offsetWidth}`,e.overlayCanvas.height=`${window.innerHeight}`,e.canvasUp.style.transform=`scale(${n})`,e.canvasUp.style.top=-(e.canvasUp.height-e.canvasUp.height*n)/2+"px",t.rectStartY||(t.rectStartY=e.canvasContainer.offsetTop,t.rect1X[2].start=window.innerHeight/2/l,t.rect2X[2].start=window.innerHeight/2/l,t.rect1X[2].end=t.rectStartY/l,t.rect2X[2].end=t.rectStartY/l,e.overlayContext.lineWidth=20),!r&&c&&(console.log("비디오 재생 시작"),e.assets[2].play(),r=!0,_(e.context1,e.assets[2],e.canvas1.width,window.innerHeight,t,o));const m=.5*e.canvas1.width;if(t.rect1X[0]=0,t.rect1X[1]=t.rect1X[0]-m,t.rect2X[0]=t.rect1X[0]+e.canvas1.width-m,t.rect2X[1]=t.rect2X[0]+m,e.overlayContext.drawImage(e.assets[0],parseInt(y(t.rect1X,o)),0,parseInt(m),window.innerHeight),e.overlayContext.drawImage(e.assets[1],parseInt(y(t.rect2X,o)),0,parseInt(m),window.innerHeight),e.overlayContext.strokeRect(parseInt(y(t.rect1X,o)),0,parseInt(m),window.innerHeight),e.overlayContext.strokeRect(parseInt(y(t.rect2X,o)),0,parseInt(m),window.innerHeight),g<t.rect1X[2].end)e.canvasContainer.classList.remove("sticky");else if(g>=t.rect1X[2].end){e.canvasContainer.classList.add("sticky"),t.blendHeight[0]=0,t.blendHeight[1]=e.canvasUp.height,t.blendHeight[2].start=t.rect1X[2].end,t.blendHeight[2].end=t.blendHeight[2].start+.25;const[a,s]=[e.canvasUp.width,e.canvasUp.height],r=function(e,t){if(i)return i;const a=d[3].objs.tempedCanvas,s=a.getContext("2d");a.width=e,a.height=t;try{s.drawImage(d[3].objs.assets[3],0,0,e,t)}catch(e){console.log("아직 이미지가 준비 안됨")}const n=s.getImageData(0,0,e,t);return i=n,n}(a,s),c=y(t.blendHeight,o);e.canvasUpContext.clearRect(0,0,a,s),e.canvasUpContext.putImageData(r,0,0,0,e.canvasUp.height-c,a,s),g>t.blendHeight[2].end&&(e.canvas1.style.opacity=0,e.overlayCanvas.style.opacity=0,t.canvas_scale[0]=n,t.canvas_scale[1]=document.body.offsetWidth/(1.2*e.canvasUp.width),t.canvas_scale[2].start=t.blendHeight[2].end,t.canvas_scale[2].end=t.canvas_scale[2].start+.25,e.canvasUp.style.transform=`scale(${y(t.canvas_scale,o)})`,e.canvasContainer.style.marginTop=0),t.canvas_scale[2].end>0&&g>t.canvas_scale[2].end&&(e.canvasContainer.classList.remove("sticky"),e.canvasContainer.style.marginTop=.5*l+"px")}}}function _(e,t,a,s,n,o){r&&(e.drawImage(t,0,0,a,s),requestAnimationFrame((()=>{_(e,t,a,s,n,o)})))}function h(){o=!1,s=0;for(let e=0;e<n;e++)s+=d[e].scrollHeight;if(g>s+d[n].scrollHeight&&(o=!0,n<d.length-1&&n++,document.body.setAttribute("id",`show-scene-${n}`)),g<s){if(o=!0,0===n)return;n--,document.body.setAttribute("id",`show-scene-${n}`)}o||u()}function p(){if(g+=.1*(a-g),!o&&1===n){const e=g-s,t=d[n].objs,a=d[n].values,o=Math.round(y(a.wakeUpImageSequence,e));t.wakeUpImages[o]&&(t.context1.drawImage(t.wakeUpImages[o],0,0),t.canvas1.style.opacity=y(a.wakeUpCanvas_opacity,e));const r=Math.round(y(a.liftImageSequence,e));t.liftImages[r]&&(t.context2.drawImage(t.liftImages[r],0,0),t.canvas2.style.opacity=y(a.liftCanvas_opacity_in,e))}e=requestAnimationFrame(p),Math.abs(a-g)<1&&(cancelAnimationFrame(e),t=!1)}function v(){console.log("미디어 데이터 로드"),setTimeout((()=>{m()}),2e3),function(){for(let e=0;e<d.length;e++)"sticky"===d[e].type?d[e].scrollHeight=d[e].heightNum*window.innerHeight:d[e].scrollHeight=d[e].objs.container.offsetHeight,d[e].objs.container.style.height=`${d[e].scrollHeight}px`;a=window.scrollY;let e=0;for(let t=0;t<d.length;t++)if(e+=d[t].scrollHeight,e>=a){n=t;break}document.body.setAttribute("id",`show-scene-${n}`);const t=window.innerHeight/1080,s=window.innerWidth/1920;d[1].objs.canvas1.style.transform=`translate3d(-50%,-50%,0) scaleX(${s}) scaleY(${t})`,d[1].objs.canvas2.style.transform=`translate3d(-50%,-50%,0) scaleX(${s}) scaleY(${t})`}()}!function(){const e=document.createElement("img");e.src="/imgs/intro-fade-in-faker.png",e.onload=()=>{console.log("안녕하세요")},d[0].objs.introImages.push(e)}(),function(){let e=0,t=d[1].values.videoImageCount+Math.floor(d[1].values.liftImageCount/2);console.log(d[1].values.videoImageCount,Math.floor(d[1].values.liftImageCount/2),d[3].objs.assetPath.length);for(let a=1;a<=d[1].values.videoImageCount;a++){const s=document.createElement("img");s.src=`/videos/faker-wakeup/${a}.jpg`,s.onload=()=>{e++,e>=t&&(l=!0,document.body.classList.remove("before-load"),v())},d[1].objs.wakeUpImages.push(s)}for(let a=1;a<=d[1].values.liftImageCount;a++){if(a%2!=0)continue;const s=document.createElement("img");s.src=`/videos/faker-cup/${a}.jpg`,s.onload=()=>{e++,e>=t&&(l=!0,document.body.classList.remove("before-load"),v())},d[1].objs.liftImages.push(s)}for(let e=0;e<d[3].objs.assetPath.length;e++){let t;["jpg","png"].includes(d[3].objs.assetPath[e].split(".")[1].toLowerCase())?t=document.createElement("img"):(t=document.createElement("video"),t.onloadedmetadata=()=>{c=!0},t.loop=!0,t.muted=!0),t.src=d[3].objs.assetPath[e],d[3].objs.assets.push(t)}}(),window.addEventListener("load",(()=>{!function(){let e=-1;const t=document.querySelectorAll(".award_wrap_list_award_card");t.forEach(((a,s)=>{a.addEventListener("click",(()=>{e=s,a.classList.contains("active")?window.offsetWidth<1024?(d[2].objs.container.style.height=d[2].scrollHeight-400+"px",d[2].scrollHeight-=400):(d[2].objs.container.style.height=d[2].scrollHeight-700+"px",d[2].scrollHeight-=700):(window.offsetWidth<1024?(d[2].objs.container.style.height=`${d[2].scrollHeight+400}px`,d[2].scrollHeight+=400):(d[2].objs.container.style.height=`${d[2].scrollHeight+700}px`,d[2].scrollHeight+=700),console.log(d[2].objs.scrollHeight));const n=Math.min(a.querySelector("p").getBoundingClientRect().height/2+a.offsetTop,a.offsetParent.getBoundingClientRect().height);document.body.style.setProperty("--timeline-height",`${n}px`),t.forEach(((t,a)=>{a<e?t.classList.add("passed"):a===e&&(t.classList.toggle("active"),t.classList.remove("passed"))}))}))}))}(),window.addEventListener("scroll",(s=>{a=window.scrollY,h(),t||(e=requestAnimationFrame(p),t=!0)}));let s=a,n=0;if(a>10){let e=setInterval((()=>{window.scrollTo(0,s),s+=2,n++,n>10&&clearInterval(e)}),20)}window.addEventListener("scroll",(()=>{a=window.pageYOffset,h(),t||(e=requestAnimationFrame(p),t=!0)})),window.addEventListener("resize",(()=>{window.innerWidth>600&&window.location.reload()})),window.addEventListener("orientationchange",(()=>{scrollTo(0,0),setTimeout((()=>{window.location.reload()}),500)})),document.querySelector(".loading").addEventListener("transitionend",(e=>{document.body.removeChild(e.currentTarget)}))}))})();