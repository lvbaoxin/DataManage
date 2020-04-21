<template>
    
    <div class="stage">
        <div class="breads">
            <div class="bread bread-left"></div>
            <div class="bread bread-right"></div>
        </div>
        <div class="toaster">
            <div class="eyes">
            <div class="eye eye-left"></div>
            <div class="eye eye-right"></div>
            </div>
            <div class="eyes eyes-second">
            <div class="eye-second eye-left"></div>
            <div class="eye-second eye-right"></div>
            </div>
            <div class="mouth"></div>
            <div class="toaster-white"></div>
        </div>
        <div class="toaster-bottom">
            <div class="toaster-bottom-white"></div>
        </div>
        <div class="bottom-line">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
</template>
<style scoped>

.stage {
  transform: scale(.6);
  width: 498px;
  position: absolute;
  height: 200px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
    top: 50%;
    left: 50%;
    margin-left: -249px;
    margin-top: -100px;
}

/* Bread */
.breads {
  width: 100%;
  height: 30px;
  position: relative;
}

.bread {
  background-color: #ffe99c;
  width: 120px;
  height: 120px;
  position: absolute;
  border-radius: 30px;
  border: 8px solid #ffb54c;
  will-change: transform;
  -webkit-animation: bread 2000ms cubic-bezier(0.19, 1, 0.22, 1) infinite;
          animation: bread 2000ms cubic-bezier(0.19, 1, 0.22, 1) infinite;
}

.bread-left {
  left: 162px;  
  z-index: 2;
}

.bread-right {
  left: 210px;
  animation-delay: 100ms;
}

@-webkit-keyframes bread {
  0% {
    -webkit-transform: translateY(0) scaleX(1) translateZ(0);
    filter: brightness(1);
  }
  40% {
    -webkit-transform: translateY(10px) scaleX(1) translateZ(0);
    filter: brightness(0.8);
  }
  65% {
    transform: translateY(-250px) scaleX(0.80) translateZ(0);
    filter: brightness(0.8);
  }

  70% {
    transform: translateY(0) scaleX(1) translateZ(0);
    filter: brightness(1);
  }
  100% {
    -webkit-transform: translateY(0) scaleX(1) translateZ(0);
    filter: brightness(1);
  }
}

@keyframes bread {
  0% {
    transform: translateY(0) scaleX(1) translateZ(0);
    filter: brightness(1);
  }
  50% {
    transform: translateY(10px) scaleX(1) translateZ(0);
    filter: brightness(0.8);
  }
  60% {
    transform: translateY(-250px) scaleX(0.80) translateZ(0);
    filter: brightness(0.8);
  }
  70% {
    transform: translateY(0) scaleX(1) translateZ(0);
    filter: brightness(1);
  }
  100% {
    transform: translateY(0) scaleX(1) translateZ(0);
    filter: brightness(1);
  }
}

.bread:before {
  content: '';
  width: 90px;
  height: 36px;
  background-color: #ffe99c;
  position: absolute;
  border-radius: 100%;
  border: 16px solid #ffb54c;
  border-right: 0;
  border-bottom: 0;
  border-left: 0;
  top: -18px;
  left: 7px;
}

/* Toaster */
.toaster {
  margin-bottom: -10px;
  width: 240px;
  height: 140px;
  border: 10px solid #000;
  border-bottom: 0;
  border-radius: 40px 40px 0 0;
  background-color: #6fdfff;
  position: relative;
  overflow: hidden;
  z-index: 3;
  will-change: transform;
  -webkit-animation: toaster 2000ms linear infinite;
          animation: toaster 2000ms linear infinite;
  transform-origin: bottom center;
}

@-webkit-keyframes toaster {
  0% {
    border: 10px solid #000;
    background-color: #6fdfff;
    -webkit-transform: scaleX(1) scaleY(1) translateZ(0);
  }
  30% {
    background-color: #b66f7f;
    border: 10px solid #7f0000;
    -webkit-transform: scaleX(1.08) scaleY(0.98) translateZ(0);
  }
  40% {
    background-color: #b66f7f;
    border: 10px solid #7f0000;
    -webkit-transform: scaleX(1.08) scaleY(0.98) translateZ(0);
  }
  50% {
    background-color: #b66f7f;
    border: 10px solid #7f0000;
    -webkit-transform: scaleX(1.08) scaleY(0.98) translateZ(0);
  }
  55%{
    background-color: #b66f7f;
    border: 10px solid #7f0000;
    -webkit-transform: scaleX(0.85) scaleY(1) translateZ(0);  
  }  
  60% {
    border: 10px solid #000;
    background-color: #6fdfff;
    -webkit-transform: scaleX(1) scaleY(1) translateZ(0);
  }
  100% {
    border: 10px solid #000;
    background-color: #6fdfff;
    -webkit-transform: scaleX(1) scaleY(1) translateZ(0);
  }
}

@keyframes toaster {
  0% {
    border: 10px solid #000;
    background-color: #6fdfff;
    transform: scaleX(1) scaleY(1) translateZ(0);
  }
  30% {
    background-color: #b66f7f;
    border: 10px solid #7f0000;
    transform: scaleX(1.08) scaleY(0.98) translateZ(0);
  }
  40% {
    background-color: #b66f7f;
    border: 10px solid #7f0000;
    transform: scaleX(1.08) scaleY(0.98) translateZ(0);
  }
  50% {
    background-color: #b66f7f;
    border: 10px solid #7f0000;
    transform: scaleX(1.08) scaleY(0.98) translateZ(0);
  }
  55%{
    background-color: #b66f7f;
    border: 10px solid #7f0000;
    transform: scaleX(0.85) scaleY(1) translateZ(0);  
  }  
  60% {
    border: 10px solid #000;
    background-color: #6fdfff;
    transform: scaleX(1) scaleY(1) translateZ(0);
  }
  100% {
    border: 10px solid #000;
    background-color: #6fdfff;
    transform: scaleX(1) scaleY(1) translateZ(0);
  }
}

.toaster-white {
  width: 190px;
  height: calc(100% + 12px);
  background-color: #fff;
  border-top: 8px solid #000;
  border-right: 8px solid #000;
  border-radius: 0 35px 0 0; 
  margin-top: -8px;
  -webkit-animation: toasterWhite 2000ms linear infinite;
          animation: toasterWhite 2000ms linear infinite;
}

@-webkit-keyframes toasterWhite {
  0% {
    border-top: 8px solid #000;
    border-right: 8px solid #000;
  }
  30% {
    border-top: 8px solid #7f0000;
    border-right: 8px solid #7f0000;
  }
  40% {
    border-top: 8px solid #7f0000;
    border-right: 8px solid #7f0000;
  }
  50% {
    border-top: 8px solid #7f0000;
    border-right: 8px solid #7f0000;
  }
  60% {
    border-top: 8px solid #000;
    border-right: 8px solid #000;
  }
  100% {
    border-top: 8px solid #000;
    border-right: 8px solid #000;
  }
}

@keyframes toasterWhite {
  0% {
    border-top: 8px solid #000;
    border-right: 8px solid #000;
  }
  30% {
    border-top: 8px solid #7f0000;
    border-right: 8px solid #7f0000;
  }
  40% {
    border-top: 8px solid #7f0000;
    border-right: 8px solid #7f0000;
  }
  50% {
    border-top: 8px solid #7f0000;
    border-right: 8px solid #7f0000;
  }
  60% {
    border-top: 8px solid #000;
    border-right: 8px solid #000;
  }
  100% {
    border-top: 8px solid #000;
    border-right: 8px solid #000;
  }
}

.eyes {
  width: 80px;
  height: 14px;
  position: absolute;
  left: 52px;
  top: 56px;
  display: flex;
  justify-content: space-between;
  will-change: transform;
  -webkit-animation: eyes 2000ms linear infinite;
          animation: eyes 2000ms linear infinite;
}

@-webkit-keyframes eyes {
  0% {
    opacity: 1;
    -webkit-transform: translateY(0px) translateZ(0);
  }
  7% {
    opacity: 0;
    -webkit-transform: translateY(0px) translateZ(0);
  }
  50% {
    opacity: 0;
    -webkit-transform: translateY(20px) translateZ(0);
  }
  52% {
    opacity: 1;
    -webkit-transform: translateY(0px) translateZ(0);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0px) translateZ(0);
  }
}

@keyframes eyes {
  0% {
    opacity: 1;
    transform: translateY(0px) translateZ(0);
  }
  7% {
    opacity: 0;
    transform: translateY(0px) translateZ(0);
  }
  50% {
    opacity: 0;
    transform: translateY(20px) translateZ(0);
  }
  52% {
    opacity: 1;
    transform: translateY(0px) translateZ(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) translateZ(0);
  }
}

.eye {
  width: 14px;
  height: 14px;
  background-color: #000;
  border-radius: 100%;
}

.eyes-second {
  animation: none;
  height: 20px;
  top: 50px;
}

.eye-second {
  width: 14px;
  height: 20px;
  will-change: transform;
  -webkit-animation: secondEye 300ms linear infinite;
          animation: secondEye 300ms linear infinite;
}

@-webkit-keyframes secondEye {
  0% {
    -webkit-transform: translateX(0px) translateY(0) translateZ(0);
  }
  15% {
    -webkit-transform: translateX(-2px) translateY(0) translateZ(0);
  }  
  30% {
    -webkit-transform: translateX(0px) translateY(0) translateZ(0);
  }
  45% {
    -webkit-transform: translateX(2px) translateY(0) translateZ(0);
  }
  60% {
    -webkit-transform: translateX(0px) translateY(0) translateZ(0);
  }
  75% {
    -webkit-transform: translateX(-2px) translateY(0) translateZ(0);
  }
  100% {
    -webkit-transform: translateX(0px) translateY(0) translateZ(0);  
  }
}

@keyframes secondEye {
  0% {
    transform: translateX(0px) translateY(0) translateZ(0);
  }
  15% {
    transform: translateX(-2px) translateY(0) translateZ(0);
  }  
  30% {
    transform: translateX(0px) translateY(0) translateZ(0);
  }
  45% {
    transform: translateX(2px) translateY(0) translateZ(0);
  }
  60% {
    transform: translateX(0px) translateY(0) translateZ(0);
  }
  75% {
    transform: translateX(-2px) translateY(0) translateZ(0);
  }
  100% {
    transform: translateX(0px) translateY(0) translateZ(0);  
  }
}

.eye-second.eye-left:before {
  width: 6px;
  height: 16px;
  background-color: #000;
  content: '';
  position: absolute;
  border-radius: 20px;
  will-change: transform;
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
  top: 2px;
  left: 2px;
  -webkit-animation: eyeSecond 2000ms linear infinite;
          animation: eyeSecond 2000ms linear infinite;
}

.eye-second.eye-left:after {
  width: 6px;
  height: 16px;
  background-color: #000;
  content: '';
  position: absolute;
  border-radius: 20px;
  will-change: transform;
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
  top: 9px;
  left: 2px;
  -webkit-animation: eyeSecond 2000ms linear infinite;
          animation: eyeSecond 2000ms linear infinite;
}

.eye-second.eye-right:before {
  width: 6px;
  height: 16px;
  background-color: #000;
  content: '';
  position: absolute;
  border-radius: 20px;
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
  top: 2px;
  right: 2px;
  -webkit-animation: eyeSecond 2000ms linear infinite;
          animation: eyeSecond 2000ms linear infinite;
}

.eye-second.eye-right:after {
  width: 6px;
  height: 16px;
  background-color: #000;
  content: '';
  position: absolute;
  border-radius: 20px;
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
  top: 9px;
  right: 2px;
  -webkit-animation: eyeSecond 2000ms linear infinite;
          animation: eyeSecond 2000ms linear infinite;
}

@-webkit-keyframes eyeSecond {
  0% {
    opacity: 0;
    background-color: #000;
  }
  10% {
    opacity: 1;
    background-color: #000;
  }
  15% {
    opacity: 1;
    background-color: #e90101;
  }  
  50% {
    opacity: 1;
    background-color: #e90101;
  }
  52% {
    opacity: 0;
    background-color: #000;
  }
  100% {
    opacity: 0;
    background-color: #000;
  }
}

@keyframes eyeSecond {
  0% {
    opacity: 0;
    background-color: #000;
  }
  10% {
    opacity: 1;
    background-color: #000;
  }
  15% {
    opacity: 1;
    background-color: #e90101;
  }  
  50% {
    opacity: 1;
    background-color: #e90101;
  }
  52% {
    opacity: 0;
    background-color: #000;
  }
  100% {
    opacity: 0;
    background-color: #000;
  }
}

.mouth {
  background-color: #000;
  width: 21px;
  height: 14px;
  position: absolute;
  top: 82px;
  left: 82px;
  border-radius: 50px 50px 120px 120px;
  will-change: transform;
  -webkit-animation: mouth 2000ms linear infinite;
          animation: mouth 2000ms linear infinite;
}

@-webkit-keyframes mouth {
  0% {
    -webkit-transform: scale(1);
  }
  10% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(0);
  }
  60% {
    -webkit-transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1);
  }
}

@keyframes mouth {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0);
  }
  50% {
    transform: scale(0);
  }
  60% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}

.mouth:after {
  content: '';
  width: 12px;
  height: 5px;
  bottom: 3px;
  background-color: #ff4e4e;
  position: absolute;
  border-radius: 30px 30px 180px 180px;
  left: 5px;
}

/* Toaster Bottom */
.toaster-bottom {
  height: 32px;
  width: 270px;
  background-color: #6fdfff;
  border-radius: 40px;
  border: 10px solid #000;
  position: relative;
  margin-bottom: -10px;
  -webkit-animation: toaster 2000ms linear infinite;
          animation: toaster 2000ms linear infinite;
}

.toaster-bottom-white {
  height: 30px;
  width: 230px;
  background-color: #fff;
  position: absolute;
  border-radius: 40px;
  border: 8px solid #000;
  bottom: -10px;
  left: -8px;
   -webkit-animation: toasterBottomWhite 2000ms linear infinite;
           animation: toasterBottomWhite 2000ms linear infinite;
}

@-webkit-keyframes toasterBottomWhite {
  0% {
    border: 8px solid #000;
  }
  30% {
    border: 8px solid #7f0000;
  }
  40% {
    border: 8px solid #7f0000;
  }
  50% {
    border: 8px solid #7f0000;
  }
  60% {
    border: 8px solid #000;
  }
  100% {
    border: 8px solid #000;
  }
}

@keyframes toasterBottomWhite {
  0% {
    border: 8px solid #000;
  }
  30% {
    border: 8px solid #7f0000;
  }
  40% {
    border: 8px solid #7f0000;
  }
  50% {
    border: 8px solid #7f0000;
  }
  60% {
    border: 8px solid #000;
  }
  100% {
    border: 8px solid #000;
  }
}

/* Bottom Line */
.bottom-line {
  height: 10px;
  width: 100%;
  display: flex;
}

.bottom-line .line {
  background-color: #ccc;
  height: 10px;
  border-radius: 30px;
  width: 60px;
  -webkit-animation: lines 2000ms linear infinite;
          animation: lines 2000ms linear infinite;
}

@-webkit-keyframes lines {
  0% {
    background-color: #ccc;
  }
  30% {
    background-color: #f4cb28;
  }
  40% {
    background-color: #f4cb28;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #ccc;
  }
}

@keyframes lines {
  0% {
    background-color: #ccc;
  }
  30% {
    background-color: #f4cb28;
  }
  40% {
    background-color: #f4cb28;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #ccc;
  }
}

.bottom-line .line:nth-child(2) {
  margin: 0 10px;
  flex: 1;
}

.bottom-line .line:nth-child(3) {
  width: 30px;
}
</style>
