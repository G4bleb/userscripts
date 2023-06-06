// ==UserScript==
// @name         bitbucket
// @version      0.1
// @description  bitbucket improvements
// @author       https://github.com/G4bleb
// @match        https://bitbucket.org/*
// @icon         https://bitbucket.org/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  (async function changePRslink() {
    let link = await waitForElm("a[href$='/workspace/pull-requests']");
    debugger;
    link.href = link.href + "?user_filter=WATCHING";
  })();
})();

//https://stackoverflow.com/a/61511955
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
