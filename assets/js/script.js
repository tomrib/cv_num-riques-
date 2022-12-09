/* logo css */
const textCss = document.getElementById("cssText");
document.getElementById("css").addEventListener("mouseover", function () {
  textCss.innerHTML = "<span>C</span>ss";
});
document.getElementById("css").addEventListener("mouseout", function () {
  textCss.innerHTML = " ";
});
/* logo html */
const textHtml = document.getElementById("htmlText");
document.getElementById("html").addEventListener("mouseover", function () {
  textHtml.innerHTML = "<span>H</span>tml";
});
document.getElementById("html").addEventListener("mouseout", function () {
  textHtml.innerHTML = " ";
});
/* logo js */
const textJs = document.getElementById("textJS");
document.getElementById("js").addEventListener("mouseover", function () {
  textJs.innerHTML = "<span>j</span>avascript";
});
document.getElementById("js").addEventListener("mouseout", function () {
  textJs.innerHTML = " ";
});
/* logo sass */
const textSass = document.getElementById("textSass");
document.getElementById("sass").addEventListener("mouseover", function () {
  textSass.innerHTML = "<span>S</span>ass";
});
document.getElementById("sass").addEventListener("mouseout", function () {
  textSass.innerHTML = " ";
});
/* logo figma */
const textFigma = document.getElementById("textFigma");
document.getElementById("figma").addEventListener("mouseover", function () {
  textFigma.innerHTML = "<span>F</span>igma";
});
document.getElementById("figma").addEventListener("mouseout", function () {
  textFigma.innerHTML = " ";
});
/* logo Bootstrap */
const textBootstrap = document.getElementById("textBootstrap");
document.getElementById("bootstrap").addEventListener("mouseover", function () {
  textBootstrap.innerHTML = "<span>B</span>ootstrap";
});
document.getElementById("bootstrap").addEventListener("mouseout", function () {
  textBootstrap.innerHTML = " ";
});
/* logo php */
const textPhp = document.getElementById("textPhp");
document.getElementById("php").addEventListener("mouseover", function () {
  textPhp.innerHTML = "<span>H</span>ypertext <span>P</span>reprocessor";
});
document.getElementById("php").addEventListener("mouseout", function () {
  textPhp.innerHTML = " ";
});

const textGithub = document.getElementById("textGithub");
document.getElementById("github").addEventListener("mouseover", function () {
  textGithub.innerHTML = "<span>G</span>ithub";
});
document.getElementById("github").addEventListener("mouseout", function () {
  textGithub.innerHTML = " ";
});
/* logo wordpress */
const textWordpress = document.getElementById("textWordpress");
document.getElementById("wordpress").addEventListener("mouseover", function () {
  textWordpress.innerHTML = "<span>W</span>ordpress";
});
document.getElementById("wordpress").addEventListener("mouseout", function () {
  textWordpress.innerHTML = " ";
});

(function () {
  // VARIABLES
  const timeline = document.querySelector(".timeline ol"),
    elH = document.querySelectorAll(".timeline li > div"),
    arrows = document.querySelectorAll(".timeline .arrows .arrow"),
    arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
    arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
    firstItem = document.querySelector(".timeline li:first-child"),
    lastItem = document.querySelector(".timeline li:last-child"),
    xScrolling = 280,
    disabledClass = "disabled";

  // START
  window.addEventListener("load", init);

  function init() {
    setEqualHeights(elH);
    animateTl(xScrolling, arrows, timeline);
    setKeyboardFn(arrowPrev, arrowNext);
  }

  // SET EQUAL HEIGHTS
  function setEqualHeights(el) {
    let counter = 0;
    for (let i = 0; i < el.length; i++) {
      const singleHeight = el[i].offsetHeight;

      if (counter < singleHeight) {
        counter = singleHeight;
      }
    }

    for (let i = 0; i < el.length; i++) {
      el[i].style.height = `${counter}px`;
    }
  }

  // CHECK IF AN ELEMENT IS IN VIEWPORT
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // SET STATE OF PREV/NEXT ARROWS
  function setBtnState(el, flag = true) {
    if (flag) {
      el.classList.add(disabledClass);
    } else {
      if (el.classList.contains(disabledClass)) {
        el.classList.remove(disabledClass);
      }
      el.disabled = false;
    }
  }

  // ANIMATE TIMELINE
  function animateTl(scrolling, el, tl) {
    let counter = 0;
    for (let i = 0; i < el.length; i++) {
      el[i].addEventListener("click", function () {
        if (!arrowPrev.disabled) {
          arrowPrev.disabled = true;
        }
        if (!arrowNext.disabled) {
          arrowNext.disabled = true;
        }
        const sign = this.classList.contains("arrow__prev") ? "" : "-";
        if (counter === 0) {
          tl.style.transform = `translateX(-${scrolling}px)`;
        } else {
          const tlStyle = getComputedStyle(tl);
          // add more browser prefixes if needed here
          const tlTransform =
            tlStyle.getPropertyValue("-webkit-transform") ||
            tlStyle.getPropertyValue("transform");
          const values =
            parseInt(tlTransform.split(",")[4]) +
            parseInt(`${sign}${scrolling}`);
          tl.style.transform = `translateX(${values}px)`;
        }

        setTimeout(() => {
          isElementInViewport(firstItem)
            ? setBtnState(arrowPrev)
            : setBtnState(arrowPrev, false);
          isElementInViewport(lastItem)
            ? setBtnState(arrowNext)
            : setBtnState(arrowNext, false);
        }, 1100);

        counter++;
      });
    }
  }
  // ADD BASIC KEYBOARD FUNCTIONALITY
  function setKeyboardFn(prev, next) {
    document.addEventListener("keydown", (e) => {
      if (e.which === 37 || e.which === 39) {
        const timelineOfTop = timeline.offsetTop;
        const y = window.pageYOffset;
        if (timelineOfTop !== y) {
          window.scrollTo(0, timelineOfTop);
        }
        if (e.which === 37) {
          prev.click();
        } else if (e.which === 39) {
          next.click();
        }
      }
    });
  }
})();
