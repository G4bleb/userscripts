// ==UserScript==
// @name         jira
// @version      0.1
// @description  jira improvements
// @author       https://github.com/G4bleb
// @match        https://*.atlassian.net/*
// @icon         https://www.atlassian.com/favicon-32x32.png
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  (async function addJiraYourWork() {
    while (true) {
      const logo = await waitForElm("nav a[href='/jira']");

      const url = window.location.href;
      const org = url.substring(
        url.indexOf("//") + 2,
        url.indexOf(".atlassian.net")
      );
      logo.href = `https://bitbucket.org/${org}/workspace/pull-requests?user_filter=WATCHING`;
      logo.textContent = "Go to Bitbucket";
      makeAnchorElemWork(logo);
    }
  })();

  (async function removeReleasesFromSidebar() {
    while (true) {
      const releasesDiv = await waitForElm(
        "div[data-test-id='development-summary-releases-field.ui.summary.actions']"
      );
      releasesDiv.remove();
    }
  })();
})();

function makeAnchorElemWork(elem) {
  elem.addEventListener(
    "click",
    function (event) {
      event.stopImmediatePropagation();
    },
    true
  );
}

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
