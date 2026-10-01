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


const lookupForm = document.querySelector("#lookup-form");
const codeLookup = document.querySelector("#code-lookup");
const lookupResult = document.querySelector("#lookup-result");
const lookupIcon = document.querySelector("#lookup-icon");
const lookupStatus = document.querySelector("#lookup-status");
const lookupSummary = document.querySelector("#lookup-summary");
const showWhereButton = document.querySelector("#show-where");
const lookupDetails = document.querySelector("#lookup-details");

const SECTION_29805_RULES = [
  {
    code: "PC",
    sections: ["71","76","136.1","136.5","140","171b","171d","186.28","240","241","242","243","243.4","244.5","245","245.5","246.3","247","273.6","417","417.6","422","422.6","626.9","646.9","830.95","17500","17510","25300","25800","30315","32625","27510"],
    subdivision: null,
    citation: "PC § 29805(a)(1)",
    effect: "10-year prohibition following the misdemeanor conviction.",
  },
  {
    code: "PC", sections: ["273.5"], subdivision: null,
    citation: "PC § 29805(a)(1)",
    effect: "10-year prohibition following the misdemeanor conviction.",
  },
  {
    code: "PC", sections: ["273.5"], subdivision: null,
    citation: "PC § 29805(b)",
    effect: "For misdemeanor convictions on or after January 1, 2019, § 29805(b) imposes a prohibition without the 10-year limitation stated in subdivision (a)(1).",
  },
  {
    code: "PC", sections: ["148"], subdivision: ["d"],
    citation: "PC § 29805(a)(1)",
    effect: "Only subdivision (d) is listed.",
  },
  {
    code: "PC", sections: ["148.5"], subdivision: ["f"],
    citation: "PC § 29805(a)(1)",
    effect: "Only subdivision (f) is listed.",
  },
  {
    code: "PC", sections: ["171c"], subdivision: ["a","1"],
    citation: "PC § 29805(a)(1)",
    effect: "Paragraph (1) of subdivision (a) is listed.",
  },
  {
    code: "PC", sections: ["26100"], subdivisionAny: [["b"],["d"]],
    citation: "PC § 29805(a)(1)",
    effect: "Subdivisions (b) and (d) are listed.",
  },
  {
    code: "PC", sections: ["487"], subdivision: null, conditional: true,
    citation: "PC § 29805(a)(1)",
    effect: "Listed only when the property taken was a firearm.",
  },
  {
    code: "PC", sections: ["27590"], subdivision: ["c"],
    citation: "PC § 29805(a)(1)",
    effect: "The conduct punished in subdivision (c) is listed.",
  },
  {
    code: "WIC", sections: ["8100","8101","8103"], subdivision: null,
    citation: "PC § 29805(a)(1)",
    effect: "These Welfare and Institutions Code sections are expressly listed.",
  },
  {
    code: "WIC", sections: ["871.5","1001.5"], subdivision: null, conditional: true,
    citation: "PC § 29805(a)(1)",
    effect: "Applies to firearm-related offenses pursuant to these Welfare and Institutions Code sections.",
  },
  {
    code: "PC", sections: ["25100","25135","25200"], subdivision: null,
    citation: "PC § 29805(c)",
    effect: "Applies to misdemeanor convictions on or after January 1, 2020; 10-year prohibition.",
  },
  {
    code: "PC", sections: ["273a"], subdivision: null,
    citation: "PC § 29805(d)",
    effect: "Applies to misdemeanor convictions on or after January 1, 2023; 10-year prohibition.",
  },
  {
    code: "PC", sections: ["368"], subdivisionAny: [["b"],["c"]],
    citation: "PC § 29805(d)",
    effect: "Only subdivisions (b) and (c), for misdemeanor convictions on or after January 1, 2023; 10-year prohibition.",
  },
  {
    code: "PC", sections: ["29180"], subdivisionAny: [["e"],["f"]],
    citation: "PC § 29805(d)",
    effect: "Only subdivisions (e) and (f), for misdemeanor convictions on or after January 1, 2023; 10-year prohibition.",
  },
  {
    code: "PC", sections: ["29805"], subdivision: null,
    citation: "PC § 29805(e)",
    effect: "A misdemeanor conviction of § 29805 on or after January 1, 2024 triggers a 10-year prohibition.",
  },
  {
    code: "PC", sections: ["25400"], subdivisionAny: [["c","5"],["c","6"],["c","7"]],
    citation: "PC § 29805(f)",
    effect: "Paragraphs (5), (6), and (7) of subdivision (c), for misdemeanor convictions on or after January 1, 2024; 10-year prohibition.",
  },
  {
    code: "PC", sections: ["25850"], subdivisionAny: [["c","5"],["c","6"],["c","7"]],
    citation: "PC § 29805(f)",
    effect: "Paragraphs (5), (6), and (7) of subdivision (c), for misdemeanor convictions on or after January 1, 2024; 10-year prohibition.",
  },
  {
    code: "PC", sections: ["26350"], subdivision: ["a"],
    citation: "PC § 29805(f)",
    effect: "Subdivision (a), for misdemeanor convictions on or after January 1, 2024; 10-year prohibition.",
  },
  {
    code: "PC", sections: ["26400"], subdivision: ["a"],
    citation: "PC § 29805(f)",
    effect: "Subdivision (a), for misdemeanor convictions on or after January 1, 2024; 10-year prohibition.",
  },
  {
    code: "PC", sections: ["597"], subdivision: ["a"],
    citation: "PC § 29805(g)",
    effect: "Subdivision (a), for misdemeanor convictions on or after January 1, 2025; 10-year prohibition.",
  },
  {
    code: "PC", sections: ["24610","27530","29185","29186","30605","30610","32900","33215","33600"], subdivision: null,
    citation: "PC § 29805(h)",
    effect: "Applies to misdemeanor convictions on or after January 1, 2026; 10-year prohibition.",
  },
];

function normalizeCodeInput(value) {
  let text = value.trim().toLowerCase();
  if (!text) return null;

  let code = "PC";
  if (/\b(wic|w&i|welfare\s*(and|&)\s*institutions?)\b/.test(text)) {
    code = "WIC";
  }

  text = text
    .replace(/california/g, " ")
    .replace(/penal\s+code/g, " ")
    .replace(/welfare\s*(and|&)\s*institutions?\s+code/g, " ")
    .replace(/\b(pc|wic|w&i)\b/g, " ")
    .replace(/\b(section|sec\.?|code)\b/g, " ")
    .replace(/§/g, " ")
    .replace(/,/g, " ")
    .trim();

  const sectionMatch = text.match(/\d+(?:\.\d+)?/);
  if (!sectionMatch) return null;

  const section = sectionMatch[0];
  const afterSection = text.slice((sectionMatch.index || 0) + section.length);
  const subdivisions = [];

  for (const match of afterSection.matchAll(/\(([a-z0-9]+)\)/g)) {
    subdivisions.push(match[1]);
  }

  if (subdivisions.length === 0) {
    const looseTokens = afterSection
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    subdivisions.push(...looseTokens);
  }

  return { code, section, subdivisions };
}

function startsWithSubdivision(input, target) {
  if (input.length < target.length) return false;
  return target.every((part, index) => input[index] === part);
}

function ruleMatch(rule, query) {
  if (rule.code !== query.code || !rule.sections.includes(query.section)) return "none";

  if (rule.subdivision === null && !rule.subdivisionAny) {
    return rule.conditional ? "conditional" : "match";
  }

  const targets = rule.subdivisionAny || [rule.subdivision];

  if (query.subdivisions.length === 0) return "needs-subdivision";

  return targets.some((target) => startsWithSubdivision(query.subdivisions, target))
    ? "match"
    : "wrong-subdivision";
}

function formatQuery(query) {
  const prefix = query.code === "WIC" ? "WIC" : "PC";
  return prefix + " § " + query.section + query.subdivisions.map((part) => "(" + part + ")").join("");
}

function renderLookupResult(kind, query, matchingRules, relatedRules = []) {
  lookupResult.hidden = false;
  lookupResult.dataset.kind = kind;
  lookupDetails.hidden = true;
  showWhereButton.textContent = "Show where in § 29805";

  const display = formatQuery(query);

  if (kind === "yes") {
    lookupIcon.textContent = "✓";
    lookupStatus.textContent = "Yes — listed in Penal Code § 29805";
    lookupSummary.textContent = display + " appears in the current statute.";
  } else if (kind === "conditional") {
    lookupIcon.textContent = "!";
    lookupStatus.textContent = "It depends — § 29805 includes a condition";
    lookupSummary.textContent = display + " is referenced, but the statute adds a factual limitation.";
  } else if (kind === "needs-info") {
    lookupIcon.textContent = "?";
    lookupStatus.textContent = "More information needed";
    lookupSummary.textContent = display + " is referenced only in specified subdivisions. Enter the subdivision for a definitive lookup.";
  } else {
    lookupIcon.textContent = "×";
    lookupStatus.textContent = "Not listed in Penal Code § 29805";
    lookupSummary.textContent = display + " was not found in the current § 29805 list. This does not rule out another firearm prohibition.";
  }

  const detailRules = matchingRules.length ? matchingRules : relatedRules;
  showWhereButton.hidden = detailRules.length === 0;

  lookupDetails.replaceChildren();
  detailRules.forEach((rule) => {
    const item = document.createElement("div");
    item.className = "lookup-detail-item";

    const cite = document.createElement("strong");
    cite.textContent = rule.citation;

    const explanation = document.createElement("p");
    explanation.textContent = rule.effect;

    item.append(cite, explanation);
    lookupDetails.append(item);
  });
}

function lookupSection29805(rawValue) {
  const query = normalizeCodeInput(rawValue);

  if (!query) {
    lookupResult.hidden = false;
    lookupResult.dataset.kind = "invalid";
    lookupIcon.textContent = "?";
    lookupStatus.textContent = "Enter a code section";
    lookupSummary.textContent = "Try 242, PC 242, Penal Code section 242, or 368(b).";
    showWhereButton.hidden = true;
    lookupDetails.hidden = true;
    return;
  }

  const sectionRules = SECTION_29805_RULES.filter(
    (rule) => rule.code === query.code && rule.sections.includes(query.section),
  );

  if (sectionRules.length === 0) {
    renderLookupResult("no", query, []);
    return;
  }

  const evaluated = sectionRules.map((rule) => ({ rule, status: ruleMatch(rule, query) }));
  const matches = evaluated.filter((item) => item.status === "match").map((item) => item.rule);
  const conditional = evaluated.filter((item) => item.status === "conditional").map((item) => item.rule);
  const needsSubdivision = evaluated.filter((item) => item.status === "needs-subdivision").map((item) => item.rule);

  if (matches.length > 0) {
    renderLookupResult("yes", query, matches);
  } else if (conditional.length > 0) {
    renderLookupResult("conditional", query, conditional);
  } else if (needsSubdivision.length > 0) {
    renderLookupResult("needs-info", query, [], needsSubdivision);
  } else {
    renderLookupResult("no", query, [], sectionRules);
  }
}

lookupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  lookupSection29805(codeLookup.value);
});

showWhereButton.addEventListener("click", () => {
  const willShow = lookupDetails.hidden;
  lookupDetails.hidden = !willShow;
  showWhereButton.textContent = willShow
    ? "Hide statutory location"
    : "Show where in § 29805";
});
