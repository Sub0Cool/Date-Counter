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
  const query =
    normalizeCodeInput(rawValue) ||
    resolveCommonNameToCode(rawValue, { allowedCodes: ["PC", "WIC"] });

  if (!query) {
    lookupResult.hidden = false;
    lookupResult.dataset.kind = "invalid";
    lookupIcon.textContent = "?";
    lookupStatus.textContent = "Enter a code section or common offense name";
    lookupSummary.textContent = "Try 242, PC 242, battery, criminal threats, or 368(b).";
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


const exposureForm = document.querySelector("#exposure-form");
const exposureLookup = document.querySelector("#exposure-lookup");
const exposureResult = document.querySelector("#exposure-result");
const exposureCode = document.querySelector("#exposure-code");
const exposureName = document.querySelector("#exposure-name");
const exposureBadge = document.querySelector("#exposure-badge");
const exposureJail = document.querySelector("#exposure-jail");
const exposureBasis = document.querySelector("#exposure-basis");
const exposureNote = document.querySelector("#exposure-note");
const exposureSource = document.querySelector("#exposure-source");

const LEGI_BASE = "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml";

function legiUrl(lawCode, section) {
  return LEGI_BASE + "?lawCode=" + encodeURIComponent(lawCode) + "&sectionNum=" + encodeURIComponent(section + ".");
}

const CENTRAL_MISDEMEANOR_EXPOSURE = (window.EXPEDITER_OFFENSE_DATA || [])
  .filter((offense) => offense.misdemeanorExposure)
  .map((offense) => ({
    code: offense.code,
    section: offense.section,
    name: offense.name,
    jail: offense.misdemeanorExposure.jail,
    basis: offense.misdemeanorExposure.basis,
    law: offense.misdemeanorExposure.law,
    source: offense.misdemeanorExposure.source,
    note: offense.misdemeanorExposure.note,
  }));

const MISDEMEANOR_EXPOSURE = [
  ...CENTRAL_MISDEMEANOR_EXPOSURE,
];



const COMMON_OFFENSE_ALIASES = [
  { terms:["assault","simple assault"], code:"PC", section:"240" },
  { terms:["battery","simple battery"], code:"PC", section:"242" },
  { terms:["domestic battery","dv battery","domestic violence battery","spousal battery"], code:"PC", section:"243", subdivisions:["e","1"], exposureSection:"243(e)(1)" },
  { terms:["battery on peace officer","battery on protected person"], code:"PC", section:"243", subdivisions:["b"], exposureSection:"243(b)" },
  { terms:["battery causing serious bodily injury","serious bodily injury battery"], code:"PC", section:"243", subdivisions:["d"], exposureSection:"243(d)" },
  { terms:["corporal injury","corporal injury spouse","corporal injury cohabitant","domestic violence corporal injury","dv corporal injury"], code:"PC", section:"273.5" },
  { terms:["restraining order violation","protective order violation","violation of protective order","dv restraining order violation"], code:"PC", section:"273.6" },
  { terms:["contempt protective order","stay away order violation","stay-away order violation"], code:"PC", section:"166", subdivisions:["c","1"], exposureSection:"166(c)(1)" },
  { terms:["criminal threats","criminal threat","terrorist threats","terrorist threat"], code:"PC", section:"422" },
  { terms:["brandishing","brandishing a weapon","brandishing weapon"], code:"PC", section:"417" },
  { terms:["brandishing firearm","brandishing a firearm"], code:"PC", section:"417" },
  { terms:["adw","assault with deadly weapon","assault with a deadly weapon"], code:"PC", section:"245", subdivisions:["a","1"], exposureSection:"245(a)(1)" },
  { terms:["assault likely gbi","assault by means likely to produce great bodily injury","force likely gbi"], code:"PC", section:"245", subdivisions:["a","4"], exposureSection:"245(a)(4)" },
  { terms:["shoplifting"], code:"PC", section:"459.5" },
  { terms:["burglary tools","possession of burglary tools"], code:"PC", section:"466" },
  { terms:["petty theft","theft"], code:"PC", section:"484" },
  { terms:["grand theft"], code:"PC", section:"487" },
  { terms:["receiving stolen property","rsp"], code:"PC", section:"496" },
  { terms:["false personation","false impersonation"], code:"PC", section:"529" },
  { terms:["mail theft"], code:"PC", section:"530.5", subdivisions:["e"], exposureSection:"530.5(e)" },
  { terms:["defrauding an innkeeper","dine and dash"], code:"PC", section:"537", subdivisions:["a","1"], exposureSection:"537(a)(1)" },
  { terms:["vandalism"], code:"PC", section:"594" },
  { terms:["trespass","trespassing"], code:"PC", section:"602" },
  { terms:["business interference","interference with business"], code:"PC", section:"602.1" },
  { terms:["unauthorized entry dwelling","unauthorized entry into dwelling"], code:"PC", section:"602.5" },
  { terms:["disorderly conduct"], code:"PC", section:"647" },
  { terms:["concealed dirk or dagger","dirk or dagger"], code:"PC", section:"21310" },
  { terms:["concealed firearm","carrying concealed firearm","carrying a concealed firearm"], code:"PC", section:"25400" },
  { terms:["switchblade","switchblade knife"], code:"PC", section:"21510", subdivisions:["b"], exposureSection:"21510(b)" },
  { terms:["child endangerment"], code:"PC", section:"273a" },
  { terms:["elder abuse"], code:"PC", section:"368" },
  { terms:["animal cruelty"], code:"PC", section:"597", subdivisions:["a"] },
  { terms:["evading","evading a peace officer","misdemeanor evading"], code:"VC", section:"2800.1" },
  { terms:["driving on suspended license","driving on a suspended license","suspended license","driving while suspended"], code:"VC", section:"14601" },
  { terms:["hit and run property damage","property damage hit and run","misdemeanor hit and run"], code:"VC", section:"20002" },
  { terms:["hit and run injury","injury hit and run","felony hit and run"], code:"VC", section:"20001" },
  { terms:["speed contest","street racing","exhibition of speed"], code:"VC", section:"23109" },
  { terms:["drug possession","possession controlled substance"], code:"HS", section:"11350" },
  { terms:["meth possession","possession methamphetamine"], code:"HS", section:"11377" },
  { terms:["marijuana possession","cannabis possession"], code:"HS", section:"11357" },
  { terms:["drug paraphernalia","possession of drug paraphernalia","paraphernalia"], code:"HS", section:"11364" },
  { terms:["under the influence drugs","under influence controlled substance","drug under the influence"], code:"HS", section:"11550" },
];

function normalizeCommonName(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function resolveCommonNameAlias(value, { allowedCodes = null } = {}) {
  const normalized = normalizeCommonName(value);
  if (!normalized) return null;

  const matches = COMMON_OFFENSE_ALIASES
    .filter((entry) => !allowedCodes || allowedCodes.includes(entry.code))
    .filter((entry) =>
      entry.terms.some((term) => {
        const normalizedTerm = normalizeCommonName(term);
        return normalized === normalizedTerm ||
          normalized.includes(normalizedTerm) ||
          normalizedTerm.includes(normalized);
      }),
    )
    .sort((a, b) => {
      const aBest = Math.max(...a.terms.map((term) => normalizeCommonName(term).length));
      const bBest = Math.max(...b.terms.map((term) => normalizeCommonName(term).length));
      return bBest - aBest;
    });

  return matches[0] || null;
}

function resolveCommonNameToCode(value, options = {}) {
  const alias = resolveCommonNameAlias(value, options);
  if (!alias) return null;

  return {
    code: alias.code,
    section: alias.section,
    subdivisions: alias.subdivisions || [],
  };
}

function resolveCommonNameToExposure(value) {
  const alias = resolveCommonNameAlias(value);
  if (alias) {
    const section = alias.exposureSection ||
      alias.section + (alias.subdivisions || []).map((part) => "(" + part + ")").join("");

    const exact = MISDEMEANOR_EXPOSURE.find(
      (entry) => entry.code === alias.code && entry.section.toLowerCase() === section.toLowerCase(),
    );
    if (exact) return exact;

    const broad = MISDEMEANOR_EXPOSURE.find(
      (entry) => entry.code === alias.code && entry.section.toLowerCase() === alias.section.toLowerCase(),
    );
    if (broad) return broad;
  }

  const normalized = normalizeCommonName(value);
  if (!normalized) return null;

  const nameMatches = MISDEMEANOR_EXPOSURE
    .filter((entry) => {
      const name = normalizeCommonName(entry.name);
      return name === normalized || name.includes(normalized) || normalized.includes(name);
    })
    .sort((a, b) => normalizeCommonName(a.name).length - normalizeCommonName(b.name).length);

  return nameMatches[0] || null;
}

function normalizeExposureInput(value) {
  let text = value.trim().toLowerCase();
  if (!text) return null;

  let code = "PC";
  if (/\b(vc|vehicle\s+code)\b/.test(text)) code = "VC";
  if (/\b(hs|hsc|health\s*(and|&)\s*safety(?:\s+code)?)\b/.test(text)) code = "HS";
  if (/\b(pc|penal\s+code)\b/.test(text)) code = "PC";

  text = text
    .replace(/california/g, " ")
    .replace(/penal\s+code/g, " ")
    .replace(/vehicle\s+code/g, " ")
    .replace(/health\s*(and|&)\s*safety(?:\s+code)?/g, " ")
    .replace(/\b(pc|vc|hs|hsc)\b/g, " ")
    .replace(/\b(section|sec\.?|code)\b/g, " ")
    .replace(/§/g, " ")
    .replace(/,/g, " ")
    .trim();

  const sectionMatch = text.match(/\d+(?:\.\d+)?s?/);
  if (!sectionMatch) return null;

  const base = sectionMatch[0];
  const after = text.slice((sectionMatch.index || 0) + base.length);
  const subdivisions = [...after.matchAll(/\(([a-z0-9]+)\)/g)].map((m) => m[1]);

  let section = base;
  if (subdivisions.length) {
    section += subdivisions.map((part) => "(" + part + ")").join("");
  }

  return { code, section };
}

function findExposureEntry(query) {
  const exact = MISDEMEANOR_EXPOSURE.find(
    (entry) => entry.code === query.code && entry.section.toLowerCase() === query.section.toLowerCase(),
  );
  if (exact) return exact;

  const base = query.section.match(/^\d+(?:\.\d+)?s?/i)?.[0];
  if (!base) return null;

  return MISDEMEANOR_EXPOSURE.find(
    (entry) => entry.code === query.code && entry.section.toLowerCase() === base.toLowerCase(),
  ) || null;
}

function renderExposure(entry, query) {
  exposureResult.hidden = false;

  if (!entry) {
    const prefix = query ? query.code : "";
    const section = query ? query.section : "";
    exposureResult.dataset.kind = "unknown";
    exposureCode.textContent = prefix && section ? prefix + " § " + section : "No section recognized";
    exposureName.textContent = "Not yet in this lookup table";
    exposureBadge.textContent = "Not loaded";
    exposureJail.textContent = "—";
    exposureBasis.textContent = "—";
    exposureNote.textContent =
      "This does not mean the offense has no jail exposure; it only means it is not in the current starter list.";
    exposureSource.removeAttribute("href");
    exposureSource.hidden = true;
    return;
  }

  exposureResult.dataset.kind = entry.jail === "Varies" ? "varies" : "loaded";
  exposureCode.textContent = entry.code + " § " + entry.section;
  exposureName.textContent = entry.name;
  exposureBadge.textContent = entry.jail === "Varies" ? "Needs details" : "Loaded";
  exposureJail.textContent = entry.jail;
  exposureBasis.textContent = entry.basis;
  exposureNote.textContent = entry.note;
  exposureSource.href = legiUrl(entry.law, entry.source);
  exposureSource.hidden = false;
}

exposureForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = normalizeExposureInput(exposureLookup.value);
  if (query) {
    renderExposure(findExposureEntry(query), query);
    return;
  }

  const commonNameEntry = resolveCommonNameToExposure(exposureLookup.value);
  if (commonNameEntry) {
    renderExposure(commonNameEntry, {
      code: commonNameEntry.code,
      section: commonNameEntry.section,
    });
    return;
  }

  renderExposure(null, null);
});


COMMON_OFFENSE_ALIASES.push(
  { terms:["dui","driving under the influence","drunk driving"], code:"VC", section:"23152" },
  { terms:["child endangerment","child abuse"], code:"PC", section:"273a" }
);

const probationForm = document.querySelector("#probation-form");
const probationLookup = document.querySelector("#probation-lookup");
const probationResult = document.querySelector("#probation-result");
const probationCode = document.querySelector("#probation-code");
const probationName = document.querySelector("#probation-name");
const probationBadge = document.querySelector("#probation-badge");
const probationStatus = document.querySelector("#probation-status");
const probationTerm = document.querySelector("#probation-term");
const probationTermsWrap = document.querySelector("#probation-terms-wrap");
const probationTerms = document.querySelector("#probation-terms");
const probationNote = document.querySelector("#probation-note");
const probationLinks = document.querySelector("#probation-links");

const PROBATION_RULES = (window.EXPEDITER_OFFENSE_DATA || [])
  .filter((offense) => offense.probation)
  .sort((a, b) => a.probation.order - b.probation.order)
  .map((offense) => ({
    code: offense.code,
    section: offense.section,
    name: offense.name,
    status: offense.probation.status,
    term: offense.probation.term,
    terms: offense.probation.terms,
    note: offense.probation.note,
    sources: offense.probation.sources,
  }));

function normalizeProbationQuery(value) {
  const codeQuery = normalizeExposureInput(value);
  if (codeQuery) return codeQuery;

  const alias = resolveCommonNameAlias(value);
  if (!alias) return null;

  return {
    code: alias.code,
    section: alias.exposureSection ||
      alias.section + (alias.subdivisions || []).map((part) => "(" + part + ")").join(""),
  };
}

function findProbationRule(query) {
  const exact = PROBATION_RULES.find(
    (rule) => rule.code === query.code && rule.section.toLowerCase() === query.section.toLowerCase(),
  );
  if (exact) return exact;

  const base = query.section.match(/^\d+(?:\.\d+)?/i)?.[0];
  if (!base) return null;

  return PROBATION_RULES.find(
    (rule) => rule.code === query.code && rule.section.toLowerCase() === base.toLowerCase(),
  ) || null;
}

function displayProbationCode(code, section) {
  return code + " § " + section;
}

function addProbationLink(law, section, label) {
  const link = document.createElement("a");
  link.href = legiUrl(law, section);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;
  probationLinks.append(link);
}

function renderProbation(rule, query) {
  probationResult.hidden = false;
  probationTerms.replaceChildren();
  probationLinks.replaceChildren();

  if (rule) {
    probationResult.dataset.kind = rule.status === "Eligible" ? "loaded" : "varies";
    probationCode.textContent = displayProbationCode(rule.code, rule.section);
    probationName.textContent = rule.name;
    probationBadge.textContent = rule.status;
    probationStatus.textContent = rule.status;
    probationTerm.textContent = rule.term;

    rule.terms.forEach((term) => {
      const item = document.createElement("li");
      item.textContent = term;
      probationTerms.append(item);
    });

    probationTermsWrap.hidden = rule.terms.length === 0;
    probationNote.textContent = rule.note;
    rule.sources.forEach(([law, section, label]) => addProbationLink(law, section, label));
    return;
  }

  if (query) {
    const exposureEntry = findExposureEntry(query);

    if (exposureEntry) {
      probationResult.dataset.kind = "varies";
      probationCode.textContent = displayProbationCode(query.code, query.section);
      probationName.textContent = exposureEntry.name;
      probationBadge.textContent = "Generally eligible";
      probationStatus.textContent = "Generally eligible";
      probationTerm.textContent = "Usually up to 1 year";
      probationTermsWrap.hidden = false;

      const item = document.createElement("li");
      item.textContent =
        "PC § 1203a generally authorizes misdemeanor probation for up to one year unless the offense has a specific probation length or another statute changes the rule.";
      probationTerms.append(item);

      probationNote.textContent =
        "No offense-specific probation condition is loaded for this charge yet. Check the governing offense statute and any applicable sentencing provisions before relying on this result.";
      addProbationLink("PEN", "1203a", "PC § 1203a");
      return;
    }
  }

  probationResult.dataset.kind = "unknown";
  probationCode.textContent = query ? displayProbationCode(query.code, query.section) : "No offense recognized";
  probationName.textContent = "Not yet in the probation quick-reference table";
  probationBadge.textContent = "Not loaded";
  probationStatus.textContent = "Unknown";
  probationTerm.textContent = "—";
  probationTermsWrap.hidden = true;
  probationNote.textContent =
    "This does not mean probation is unavailable. The offense simply is not yet covered by this quick-reference table.";
}

probationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = normalizeProbationQuery(probationLookup.value);

  if (!query) {
    renderProbation(null, null);
    return;
  }

  renderProbation(findProbationRule(query), query);
});
