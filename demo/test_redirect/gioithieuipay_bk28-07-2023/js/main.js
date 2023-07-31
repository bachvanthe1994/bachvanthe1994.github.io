
var animation1= document.getElementsByClassName('images--animation1');
CustomEase.create("hop", "M0,0,C0.396,0.16,0.336,0.866,0.932,0,0.882,0.27,0.97,0.546,1,1");
TweenMax.to(animation1, 2.5, { ease: "hop", y: -500 });
