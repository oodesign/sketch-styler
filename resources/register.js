// disable the context menu (eg. the right click menu) to have a more native feel
// document.addEventListener('contextmenu', (e) => {
//   e.preventDefault()
// })

document.getElementById('btnGetStyler').addEventListener('click', () => {
  window.postMessage('OpenStylerWeb');
})

document.getElementById('btnStartTrial').addEventListener('click', () => {
  window.postMessage('StartTrial');
})

document.getElementById('btnContinueTrial').addEventListener('click', () => {
  window.postMessage('ContinueTrial');
})

document.getElementById('btnLetsStart').addEventListener('click', () => {
  window.postMessage('LetsStart');
})

document.getElementById('btnLetsStartTrial').addEventListener('click', () => {
  window.postMessage('LetsStartTrial');
})

document.getElementById('btnNavRegistration').addEventListener('click', () => {
  document.getElementById('ctaForm').className = "yFadeOut";
  document.getElementById('registerForm').className = "yFadeIn";
  document.getElementById('inputLicense').focus();
})

document.getElementById('btnGoBack').addEventListener('click', () => {
  document.getElementById('registerForm').className = "";
  document.getElementById('ctaForm').className = "yFadeIn";
  document.getElementById('warningMessage').className = "rowAuto warningText";
})

document.getElementById('btnRegister').addEventListener('click', () => {
  document.getElementById('warningMessage').className = "rowAuto warningText";
  window.postMessage('RegisterKey', document.getElementById("inputLicense").value);
})

window.ShowRegistrationComplete = () => {
  document.getElementById('ctaForm').className = "yFadeOut";
  document.getElementById('registerForm').className = "yFadeOut";
  document.getElementById('confirmationForm').className = "yFadeIn";
};

window.ShowTrialStarted = () => {
  document.getElementById('ctaForm').className = "yFadeOut";
  document.getElementById('startTrialForm').className = "yFadeIn";
};

window.ShowRegistrationFail = () => {
  document.getElementById('warningMessage').className = "rowAuto warningText warningTextVisible";
};

window.cancelAssignation = () => {
  window.postMessage('Cancel');
}

window.SetTrialMode = (remainingDays) => {
  document.getElementById('registerMessage').innerHTML = `Styler assigns styles automatically to all of your unstyled layers.<br/>
                                                        You still have <span class="primaryText"><b>`+ remainingDays + ` days</b></span> to push it to the limit. Go style everything! `;

  document.getElementById('btnStartTrial').className = "btnStartTrial notDisplayed";
  document.getElementById('btnContinueTrial').className = "btnStartTrial";

}

window.SetExpiredMode = () => {
  document.getElementById('registerMessage').innerHTML = `Looks like your trial expired. Maybe it's a good time to get it? `;

  document.getElementById('btnStartTrial').className = "btnStartTrial notDisplayed";
  document.getElementById('btnContinueTrial').className = "btnStartTrial notDisplayed";

}

