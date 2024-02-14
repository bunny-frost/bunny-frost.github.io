// Function to calculate total experience required
function calcExp(currentAR, targetAR, currentExp) {
  // Experience required for each AR level
  const expRequiredPerLevel = [
    0, 375, 500, 625, 725, 850, 950, 1075, 1200, 1300, 1425, 1525, 1650, 1775,
    1875, 2000, 2375, 2500, 2625, 2775, 2825, 3425, 3725, 4000, 4300, 4575,
    4875, 5150, 5450, 5725, 6025, 6300, 6600, 6900, 7175, 7475, 7750, 8050,
    8325, 8625, 10550, 11525, 12475, 13450, 14400, 15350, 16325, 17275, 18250,
    19200, 26400, 28800, 31200, 33600, 36000, 232350, 258950, 285750, 312825,
    340125,
  ]; // Actual values required

  let totalExp = 0;

  // Iterate over AR levels
  for (let ar = currentAR; ar < targetAR; ar++) {
    // Add experience required for current AR level
    totalExp += expRequiredPerLevel[ar];
  }

  totalExp -= currentExp;

  return totalExp;
}

// Function to update result
function updateResult() {
  const currentAR = parseInt(document.getElementById("current-ar").value);
  const currentExp = parseInt(document.getElementById("current-exp").value);
  const targetAR = parseInt(document.getElementById("target-ar").value);

  if (currentAR > 60 || targetAR > 60) {
    window.alert("Maximum AR is 60. Please enter a valid number.");
    document.getElementById("result").value = 0;
    return;
  }

  if (currentAR >= targetAR) {
    window.alert(
      "Current AR can't be greater than/same as Target AR. Please try again."
    );
    document.getElementById("result").value = 0;
    return;
  }
  if (currentExp > 1880200) {
    window.alert("Maximum AR Exp is 1,880,200. Please enter a valid amount.");
    document.getElementById("result").value = 0;
    return;
  }
  let result = calcExp(currentAR, targetAR, currentExp);

  if (isNaN(result)) {
    result = `Invalid Current AR/Target AR or Current Exp.`;
  }
  document.getElementById("result").value = result.toLocaleString();
}

// // Call updateResult when inputs change
// document.getElementById("current-ar").addEventListener("change", updateResult);
// document.getElementById("current-exp").addEventListener("change", updateResult);
// document.getElementById("target-ar").addEventListener("change", updateResult);

// // Initial update
// updateResult();

document.getElementById("current-ar").addEventListener("change", function () {
  const currentAR = parseFloat(this.value);
  if (!Number.isInteger(currentAR)) {
    const nearestLowerInt = Math.floor(currentAR);
    const nearestHigherInt = Math.ceil(currentAR);
    window.alert(
      `Please enter a valid integer value. Nearest valid values: ${nearestLowerInt} or ${nearestHigherInt}`
    );
  }
  updateResult();
});
document.getElementById("current-exp").addEventListener("change", function () {
  const currentExp = parseFloat(this.value);
  if (!Number.isInteger(currentExp)) {
    const nearestLowerInt = Math.floor(currentExp);
    const nearestHigherInt = Math.ceil(currentExp);
    window.alert(
      `Please enter a valid integer value. Nearest valid values: ${nearestLowerInt} or ${nearestHigherInt}`
    );
  }
  updateResult();
});
document.getElementById("target-ar").addEventListener("change", function () {
  const targetAR = parseFloat(this.value);
  if (!Number.isInteger(targetAR)) {
    const nearestLowerInt = Math.floor(targetAR);
    const nearestHigherInt = Math.ceil(targetAR);
    window.alert(
      `Please enter a valid integer value. Nearest valid values: ${nearestLowerInt} or ${nearestHigherInt}`
    );
  }
  updateResult();
});

// Initial update
updateResult();
