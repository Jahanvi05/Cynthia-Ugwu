const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});


function firstPageAni() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })



    .to(".boundinglen", {
      y: "-10",
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })

    .from("#landingfooter", {
      y: -10,
      opacity: 0,
      ease: Expo.easeInOut,
      duration: 1.5,
      delay: -1,
    });
}


var timeout;

function circleMouseChange() {

  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.9, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.9, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouse(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#cursorcircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });

  }


function circleMouse(xscale,yscale) {
  // window is the screen (browser screen)
  window.addEventListener("mousemove", function (dets) {
    // console.log(dets.clientX,dets.clientY);

    document.querySelector(
      "#cursorcircle"
    ).style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(${xscale} , ${yscale})`;
    // ` is used to join two things in javascript.
  });

  // Client x (x axis) min at right and client y (y axis) min at up
}



circleMouseChange();
circleMouse();
firstPageAni();

// teeno element ko sleect karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye


// ***********BOTH THE ICONS ARE WORKING TOGETHER*******

// document.querySelectorAll(".circle").forEach(function(icon) {
//   icon.addEventListener("mouseover", function() {
//     gsap.from("i", {
//       y: "-20",
//       opacity: 1,
//       duration: 0.7,
//       ease: Expo.easeInOut,
//     });
//   });
// });



document.querySelectorAll(".circle").forEach(function(icon) {
  icon.addEventListener("mouseover", function() {
    // Select the <i> element inside the current ".circle" element
    var iconElement = icon.querySelectorAll("i");
    
    // Check if an <i> element is found before animating
    if (iconElement) {
      gsap.from(iconElement, {
        y: "-20",
    opacity: 1,
    ease: Expo.easeInOut,
      });
    }
  });
});


document.querySelectorAll(".elem").forEach(function (elem) {
 

  var rotate = 0;
  var diff =0;


  elem.addEventListener("mouseover", function () {
    gsap.to(elem.querySelectorAll("h1, h5"), {
      opacity: 0.2,
      x: 20, // Adjust the value as needed to shift the elements to the right
    });
  });
  
  elem.addEventListener("mouseleave", function () {
    gsap.to(elem.querySelectorAll("h1, h5"), {
      opacity: 1,
      x: 0, // Reset the horizontal position to its original value
    });
  });

 
  elem.addEventListener("mouseleave",function (dets){
    gsap.to(elem.querySelector("img"),
    {
      opacity:0,
      ease:Power3,
      duration:0.5,
    });
  
  });



  elem.addEventListener("mousemove", function (dets) {
     // clientX takes the current value of x axisand client y takes the current alue at y axis ,where the image is

    //  The result (diff) represents the vertical distance between the mouse pointer and the top edge of the "elem" element.

    // The result (diff) represents the vertical distance between the mouse pointer and the top edge of the "elem" element.

    var diff = dets.clientY - elem.getBoundingClientRect().top;

  //  differnce between the current x xis position and last  axis position saves in rotate
    diffrot = dets.clientX-rotate;

    // stores the current x axis position which will be used previous location/position to calculate the diff
    rotate=dets.clientX;
    
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      // clamp is a function which sets the min and max value for the rotation ,whatever the difeernce comes the rotation of the image will be betwen this min and max value
      rotate:gsap.utils.clamp(-20,20,diffrot*0.5),

    });
  });
});

