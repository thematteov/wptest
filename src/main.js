import "./styles/style.css";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";
import imagesLoaded from "imagesloaded";

window.addEventListener("load", function () {
  let tl = gsap.timeline();
  let links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (
        $(this).prop("hostname") === window.location.host &&
        $(this).attr("href").indexOf("#") === -1 &&
        $(this).attr("target") !== "_blank"
      ) {
        e.preventDefault();
        // let destination = this.getAttribute("href");
        // tl.set(".page__transition", { display: "grid" });
        // tl.fromTo(
        //   ".page__transition__pantone",
        //   { opacity: 0 },
        //   {
        //     opacity: 1,
        //     duration: 0.001,
        //     stagger: { amount: 0.5, from: "random" },
        //     onComplete: () => (window.location = destination),
        //   }
        // );
      }
    });
  });
  window.onpageshow = function(event){
  	if (event.persisted) {
    	window.location.reload();
    }
  }
});

gsap.registerPlugin(ScrollTrigger);
let lenis = new Lenis({
  lerp: 0.1,
  duration: 0.7,
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 0.65,
  touchMultiplier: 0.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
const preloadImages = new Promise((resolve) => {
  imagesLoaded(document.querySelectorAll("img"), { background: true }, resolve);
});
if (
  !sessionStorage.getItem("animationPlayed") ||
  performance.navigation.type === 1
) {
  // If not played, run the animation
  gsap.set(".preloader", { display: "flex" });
} else {
  gsap.set(".preloader", { display: "none" });
}
let allDone = [preloadImages];
Promise.all(allDone).then(() => {
  if (
    !sessionStorage.getItem("animationPlayed") ||
    performance.navigation.type === 1
  ) {
    // If not played, run the animation
    // gsap.set(".page__transition", { display: "none" });
    // gsap.set(".preloader", { display: "flex" });
    // gsap.to(".preloader", {
    //   x: "100vw",
    //   ease: "power2.inOut",
    //   duration: 1.2,
    //   delay: 1,
    //   onComplete: function () {
    //     // Set a flag in sessionStorage indicating that the animation has been played
    //     sessionStorage.setItem("animationPlayed", "true");
    //   },
    // });
  } else {
    gsap.set(".preloader", { display: "none" });
  }
  // Check if the animation has already been played in this session
  ////////////////////////////////
  if (window.matchMedia("(max-width: 768px)").matches) {
    // Your mobile-specific JavaScript code here
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load", // notice "resize" isn't in the list
    });
  } else {
    // Code for non-mobile devices
    window.addEventListener("resize", () => {
      ScrollTrigger.update();
    });
  }
  // if (
  //   document
  //     .querySelector(".page__wrapper")
  //     .getAttribute("data-barba-namespace") === "home"
  // ) {
  //   initHome();
  // }
});
