const DAY_IN_MS = 24 * 60 * 60 * 1000;

const rangesContainer = document.querySelector("#ranges");
const rangeTemplate = document.querySelector("#range-template");
const addRangeButton = document.querySelector("#add-range");
const resetRangesButton = document.querySelector("#reset-ranges");
const grandTotal = document.querySelector("#grand-total");
const totalNote = document.querySelector("#total-note");

const fourDayThreshold = document.querySelector("#four-day-threshold");
const actualCreditDays = document.querySelector("#actual-credit-days");
const conductCreditDays = document.querySelector("#conduct-credit-days");
const totalCreditDays = document.querySelector("#total-credit-days");
const creditFormulaNote = document.querySelector("#credit-formula-note");

function dateToUtc(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

function inclusiveDays(start, end) {
  return Math.floor((end - start) / DAY_IN_MS) + 1;
}

function renumberRanges() {
  [...rangesContainer.children].forEach((row, index) => {
    const number = index + 1;
    row.querySelector(".range-number").textContent = number;
    row.querySelector(".start-date").id = `start-date-${number}`;
    row.querySelector(".end-date").id = `end-date-${number}`;
    row.querySelector("label:first-of-type").htmlFor = `start-date-${number}`;
    row.querySelectorAll("label")[1].htmlFor = `end-date-${number}`;
    row.querySelector(".remove-button").setAttribute(
      "aria-label",
      `Remove date range ${number}`,
    );
  });
}

function calculateSection4019(actualDays) {
  if (actualDays <= 0 || !fourDayThreshold.checked) {
    return { actual: actualDays, conduct: 0, total: actualDays };
  }

  // Standard current § 4019 formula: two conduct days for each complete
  // two-day block of actual custody. An unpaired odd day earns no extra day.
  const conduct = Math.floor(actualDays / 2) * 2;

  return {
    actual: actualDays,
    conduct,
    total: actualDays + conduct,
  };
}

function renderCustodyCredits(actualDays) {
  const credits = calculateSection4019(actualDays);

  actualCreditDays.textContent = credits.actual.toLocaleString();
  conductCreditDays.textContent = credits.conduct.toLocaleString();
  totalCreditDays.textContent = credits.total.toLocaleString();

  if (actualDays === 0) {
    creditFormulaNote.textContent = "Add a complete custody range to calculate credits.";
    return;
  }

  if (!fourDayThreshold.checked) {
    creditFormulaNote.textContent =
      "No § 4019 conduct credit added because the four-day commitment requirement is marked as not satisfied.";
    return;
  }

  if (actualDays % 2 === 0) {
    creditFormulaNote.textContent =
      `${actualDays} actual + ${credits.conduct} conduct = ${credits.total} total days of credit.`;
  } else {
    creditFormulaNote.textContent =
      `${actualDays} actual + ${credits.conduct} conduct = ${credits.total} total days of credit. The final unpaired actual day does not generate an additional conduct day.`;
  }
}

function calculateTotals() {
  const validIntervals = [];

  [...rangesContainer.children].forEach((row) => {
    const startValue = row.querySelector(".start-date").value;
    const endValue = row.querySelector(".end-date").value;
    const result = row.querySelector(".range-days");
    const error = row.querySelector(".range-error");

    error.textContent = "";

    if (!startValue || !endValue) {
      result.textContent = "—";
      return;
    }

    const start = dateToUtc(startValue);
    const end = dateToUtc(endValue);

    if (end < start) {
      result.textContent = "—";
      error.textContent = "The end date must be on or after the start date.";
      return;
    }

    result.textContent = inclusiveDays(start, end);
    validIntervals.push({ start, end });
  });

  validIntervals.sort((a, b) => a.start - b.start);

  const mergedIntervals = [];
  validIntervals.forEach((interval) => {
    const previous = mergedIntervals.at(-1);

    if (!previous || interval.start > previous.end + DAY_IN_MS) {
      mergedIntervals.push({ ...interval });
    } else {
      previous.end = Math.max(previous.end, interval.end);
    }
  });

  const uniqueDays = mergedIntervals.reduce(
    (total, interval) => total + inclusiveDays(interval.start, interval.end),
    0,
  );

  grandTotal.textContent = uniqueDays.toLocaleString();
  renderCustodyCredits(uniqueDays);

  if (validIntervals.length === 0) {
    totalNote.textContent = "Add a complete range to see your total.";
  } else if (validIntervals.length === 1) {
    totalNote.textContent = "From 1 complete date range.";
  } else {
    totalNote.textContent = `Across ${validIntervals.length} complete ranges, with overlaps removed.`;
  }
}

function addRange({ focus = false } = {}) {
  const row = rangeTemplate.content.firstElementChild.cloneNode(true);
  rangesContainer.append(row);
  renumberRanges();

  if (focus) {
    row.querySelector(".start-date").focus();
  }
}

addRangeButton.addEventListener("click", () => addRange({ focus: true }));

resetRangesButton.addEventListener("click", () => {
  rangesContainer.replaceChildren();
  addRange({ focus: true });
  calculateTotals();
});

fourDayThreshold.addEventListener("change", calculateTotals);

rangesContainer.addEventListener("input", calculateTotals);
rangesContainer.addEventListener("change", calculateTotals);
rangesContainer.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-button");
  if (!removeButton) return;

  removeButton.closest(".range-row").remove();
  renumberRanges();
  calculateTotals();
});

addRange();
calculateTotals();
