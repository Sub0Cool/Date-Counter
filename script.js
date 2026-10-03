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

const SECTION_29805_EFFECTS = [
  "10-year prohibition following the misdemeanor conviction.",
  "10-year prohibition following the misdemeanor conviction.",
  "For misdemeanor convictions on or after January 1, 2019, § 29805(b) imposes a prohibition without the 10-year limitation stated in subdivision (a)(1).",
  "Only subdivision (d) is listed.",
  "Only subdivision (f) is listed.",
  "Paragraph (1) of subdivision (a) is listed.",
  "Subdivisions (b) and (d) are listed.",
  "Listed only when the property taken was a firearm.",
  "The conduct punished in subdivision (c) is listed.",
  "These Welfare and Institutions Code sections are expressly listed.",
  "Applies to firearm-related offenses pursuant to these Welfare and Institutions Code sections.",
  "Applies to misdemeanor convictions on or after January 1, 2020; 10-year prohibition.",
  "Applies to misdemeanor convictions on or after January 1, 2023; 10-year prohibition.",
  "Only subdivisions (b) and (c), for misdemeanor convictions on or after January 1, 2023; 10-year prohibition.",
  "Only subdivisions (e) and (f), for misdemeanor convictions on or after January 1, 2023; 10-year prohibition.",
  "A misdemeanor conviction of § 29805 on or after January 1, 2024 triggers a 10-year prohibition.",
  "Paragraphs (5), (6), and (7) of subdivision (c), for misdemeanor convictions on or after January 1, 2024; 10-year prohibition.",
  "Paragraphs (5), (6), and (7) of subdivision (c), for misdemeanor convictions on or after January 1, 2024; 10-year prohibition.",
  "Subdivision (a), for misdemeanor convictions on or after January 1, 2024; 10-year prohibition.",
  "Subdivision (a), for misdemeanor convictions on or after January 1, 2024; 10-year prohibition.",
  "Subdivision (a), for misdemeanor convictions on or after January 1, 2025; 10-year prohibition.",
  "Applies to misdemeanor convictions on or after January 1, 2026; 10-year prohibition."
];

const SECTION_29805_RULES = (window.REFERENCE_DESK_29805_RULES || []).map((rule) => ({
  ...rule,
  effect: SECTION_29805_EFFECTS[rule.id],
}));

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
    maximumPenalFine: offense.maximumPenalFine || null,
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
  { terms:["child endangerment likely gbi","child endangerment likely great bodily harm","felony child endangerment"], code:"PC", section:"273a", subdivisions:["a"], exposureSection:"273a(a)" },
  { terms:["child endangerment not likely gbi","child endangerment misdemeanor","misdemeanor child endangerment"], code:"PC", section:"273a", subdivisions:["b"], exposureSection:"273a(b)" },
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
  { terms:["ammunition prohibited person","prohibited person ammunition","felon ammunition possession"], code:"PC", section:"30305", exposureSection:"30305" },
  { terms:["false imprisonment"], code:"PC", section:"236", exposureSection:"236" },
  { terms:["reckless driving"], code:"VC", section:"23103", exposureSection:"23103" },
  { terms:["wet reckless","dui reckless","reckless reduced from dui"], code:"VC", section:"23103.5", exposureSection:"23103.5" },
  { terms:["false fire alarm","tampering fire equipment","fire alarm tampering"], code:"PC", section:"148.4", exposureSection:"148.4" },
  { terms:["prowling","loitering private property","loitering or prowling"], code:"PC", section:"647", subdivisions:["h"], exposureSection:"647(h)" },
  { terms:["loaded firearm","carrying loaded firearm","loaded gun in public"], code:"PC", section:"25850", subdivisions:["a"], exposureSection:"25850(a)" },
  { terms:["battery on school employee","school employee battery"], code:"PC", section:"243.6", exposureSection:"243.6" },
  { terms:["assault on peace officer","assault on firefighter","assault on emt","assault protected person"], code:"PC", section:"241", subdivisions:["c"], exposureSection:"241(c)" },
  { terms:["disabled placard misuse","misuse disabled placard","disabled parking placard misuse"], code:"VC", section:"4461", subdivisions:["c"], exposureSection:"4461(c)" },
  { terms:["elder abuse likely gbi","dependent adult abuse likely gbi"], code:"PC", section:"368", subdivisions:["b","1"], exposureSection:"368(b)(1)" },
  { terms:["elder abuse not likely gbi","dependent adult abuse not likely gbi"], code:"PC", section:"368", subdivisions:["c"], exposureSection:"368(c)" },
  { terms:["elder theft noncaretaker over 950"], code:"PC", section:"368", subdivisions:["d","1"], exposureSection:"368(d)(1)" },
  { terms:["elder theft noncaretaker 950 or less"], code:"PC", section:"368", subdivisions:["d","2"], exposureSection:"368(d)(2)" },
  { terms:["elder theft caretaker over 950"], code:"PC", section:"368", subdivisions:["e","1"], exposureSection:"368(e)(1)" },
  { terms:["elder theft caretaker 950 or less"], code:"PC", section:"368", subdivisions:["e","2"], exposureSection:"368(e)(2)" },
  { terms:["employee embezzlement","clerk embezzlement","agent embezzlement"], code:"PC", section:"508", exposureSection:"508" },
  { terms:["reckless fire gbi","reckless burning gbi"], code:"PC", section:"452", subdivisions:["a"], exposureSection:"452(a)" },
  { terms:["reckless fire inhabited structure","reckless burning inhabited structure"], code:"PC", section:"452", subdivisions:["b"], exposureSection:"452(b)" },
  { terms:["reckless fire structure","reckless fire forest land","reckless burning forest land"], code:"PC", section:"452", subdivisions:["c"], exposureSection:"452(c)" },
  { terms:["entering and occupying","trespass entering and occupying"], code:"PC", section:"602", subdivisions:["m"], exposureSection:"602(m)" },
  { terms:["unauthorized computer access","computer access without permission"], code:"PC", section:"502", subdivisions:["c","7"], exposureSection:"502(c)(7)" },
  { terms:["battery elder","battery dependent adult","elder battery"], code:"PC", section:"243.25", exposureSection:"243.25" },
  { terms:["railroad obstruction","obstruction railroad track"], code:"PC", section:"587", subdivisions:["b"], exposureSection:"587(b)" },
  { terms:["billy club","blackjack","sap weapon","slungshot"], code:"PC", section:"22210", exposureSection:"22210" },
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
const probationMaxFine = document.querySelector("#probation-max-fine");
const probationFineSource = document.querySelector("#probation-fine-source");
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
    maximumPenalFine: offense.maximumPenalFine || null,
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
  probationFineSource.hidden = true;
  probationFineSource.removeAttribute("href");

  const renderFine = (fine) => {
    if (!fine) {
      probationMaxFine.textContent = "Not loaded";
      return;
    }
    probationMaxFine.textContent = fine.display;
    probationFineSource.textContent = fine.label;
    probationFineSource.href = legiUrl(fine.law, fine.section);
    probationFineSource.hidden = false;
  };

  if (rule) {
    probationResult.dataset.kind = rule.status === "Eligible" ? "loaded" : "varies";
    probationCode.textContent = displayProbationCode(rule.code, rule.section);
    probationName.textContent = rule.name;
    probationBadge.textContent = rule.status;
    probationStatus.textContent = rule.status;
    probationTerm.textContent = rule.term;
    renderFine(rule.maximumPenalFine);

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
      renderFine(exposureEntry.maximumPenalFine);
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
  probationMaxFine.textContent = "—";
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


// Future Date Calculator
const futureDateForm = document.querySelector("#future-date-form");
const futureDateInput = document.querySelector("#future-date-input");
const futureDateToday = document.querySelector("#future-date-today");
const futureDateResult = document.querySelector("#future-date-result");
const futureDateOutput = document.querySelector("#future-date-output");
const futureDateSummary = document.querySelector("#future-date-summary");
const futureDateError = document.querySelector("#future-date-error");

function localCalendarToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function formatCalendarDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function addCalendarMonths(date, months) {
  const originalDay = date.getDate();
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(originalDay, lastDay));
  return target;
}

function parseFutureOffset(value) {
  let normalized = value.trim().toLowerCase();
  normalized = normalized.replace(/^in\s+/, "").replace(/\s+from\s+(today|now)$/, "");

  const match = normalized.match(
    /^(\d+)\s*(d|day|days|w|week|weeks|mo|mos|month|months|y|yr|yrs|year|years)$/
  );
  if (!match) return null;

  const amount = Number(match[1]);
  if (!Number.isSafeInteger(amount) || amount < 0) return null;

  const unit = match[2];
  if (["d", "day", "days"].includes(unit)) return { amount, unit: "day" };
  if (["w", "week", "weeks"].includes(unit)) return { amount, unit: "week" };
  if (["mo", "mos", "month", "months"].includes(unit)) return { amount, unit: "month" };
  return { amount, unit: "year" };
}

function calculateFutureDate(start, offset) {
  if (offset.unit === "month") return addCalendarMonths(start, offset.amount);
  if (offset.unit === "year") return addCalendarMonths(start, offset.amount * 12);

  const result = new Date(start);
  result.setDate(result.getDate() + offset.amount * (offset.unit === "week" ? 7 : 1));
  return result;
}

function updateFutureDateToday() {
  futureDateToday.textContent = formatCalendarDate(localCalendarToday());
}

if (futureDateForm) {
  updateFutureDateToday();

  futureDateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const offset = parseFutureOffset(futureDateInput.value);
    futureDateError.hidden = true;
    futureDateResult.hidden = true;

    if (!offset) {
      futureDateError.textContent =
        "Enter a whole number followed by days, weeks, months, or years — for example, “10 days” or “6 months.”";
      futureDateError.hidden = false;
      return;
    }

    const today = localCalendarToday();
    const result = calculateFutureDate(today, offset);
    const unitLabel = offset.amount === 1 ? offset.unit : offset.unit + "s";

    futureDateOutput.textContent = formatCalendarDate(result);
    futureDateSummary.textContent =
      offset.amount + " " + unitLabel + " from " + formatCalendarDate(today) + ".";
    futureDateResult.hidden = false;
  });
}


// Reference Desk dashboard navigation.
const toolTiles = [...document.querySelectorAll("[data-tool-target]")];
const toolViews = [...document.querySelectorAll("[data-tool-view]")];
const activeToolTitle = document.querySelector("#active-tool-title");

const toolTitles = {
  dates: "Dates & Penal Code § 4019 Credits",
  "future-date": "Future Date Calculator",
  exposure: "Maximum Exposure Lookup",
  probation: "Probation Eligibility & Mandatory Terms",
  firearms: "Penal Code § 29805 Check",
  bac: "Blood Alcohol Estimator",
};

function showTool(toolName) {
  toolTiles.forEach((tile) => {
    const active = tile.dataset.toolTarget === toolName;
    tile.classList.toggle("is-active", active);
    tile.setAttribute("aria-pressed", String(active));
  });

  toolViews.forEach((view) => {
    view.hidden = view.dataset.toolView !== toolName;
  });

  if (activeToolTitle && toolTitles[toolName]) {
    activeToolTitle.textContent = toolTitles[toolName];
  }
}

toolTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    showTool(tile.dataset.toolTarget);
  });
});

showTool("dates");


// Blood Alcohol Estimator
const BAC_METHODS = window.REFERENCE_DESK_BAC_METHODS;
const bacModeButtons = [...document.querySelectorAll("[data-bac-mode]")];
const bacModePanels = [...document.querySelectorAll("[data-bac-panel]")];
const methodDialog = document.querySelector("#method-dialog");
const methodDialogTitle = document.querySelector("#method-dialog-title");
const methodDialogBody = document.querySelector("#method-dialog-body");

function setBacMode(mode) {
  bacModeButtons.forEach((button) => {
    const active = button.dataset.bacMode === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  bacModePanels.forEach((panel) => {
    panel.hidden = panel.dataset.bacPanel !== mode;
  });
}

bacModeButtons.forEach((button) => {
  button.addEventListener("click", () => setBacMode(button.dataset.bacMode));
});

document.addEventListener("click", (event) => {
  const badge = event.target.closest("[data-method-definition]");
  if (!badge || !methodDialog || !BAC_METHODS) return;

  const definition = BAC_METHODS.definitions[badge.dataset.methodDefinition];
  if (!definition) return;

  methodDialogTitle.textContent = definition.title;
  methodDialogBody.textContent = definition.body;
  methodDialog.showModal();
});

function hoursBetween(earlier, later) {
  return (later.getTime() - earlier.getTime()) / 3600000;
}

function fmt(value, digits = 3) {
  return Number(value).toFixed(digits);
}

function renderParagraphs(container, lines) {
  container.replaceChildren();
  lines.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    container.append(p);
  });
}

const retrogradeForm = document.querySelector("#retrograde-form");
const retroResult = document.querySelector("#retro-result");
const retroRange = document.querySelector("#retro-range");
const retroQuality = document.querySelector("#retro-quality");
const retroWarning = document.querySelector("#retro-warning");
const retroCalculation = document.querySelector("#retro-calculation");

retrogradeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const c = BAC_METHODS.constants;
  const measured = Number(document.querySelector("#retro-bac").value);
  const specimen = document.querySelector("#retro-specimen").value;
  const testTime = new Date(document.querySelector("#retro-test-time").value);
  const targetTime = new Date(document.querySelector("#retro-target-time").value);
  const lastDrinkRaw = document.querySelector("#retro-last-drink").value;
  const lastDrink = lastDrinkRaw ? new Date(lastDrinkRaw) : null;

  retroResult.hidden = false;
  retroWarning.hidden = true;
  retroWarning.textContent = "";

  if (!Number.isFinite(measured) || measured < c.retrogradeMinimumAc) {
    retroRange.textContent = "Not calculated";
    retroQuality.textContent = "ASB 122 does not recommend retrograde extrapolation below 0.020 g/dL.";
    renderParagraphs(retroCalculation, ["No estimate was produced."]);
    return;
  }

  if (specimen === "urine") {
    retroRange.textContent = "Not calculated";
    retroQuality.textContent = "Urine alcohol results are not amenable to retrograde extrapolation under ASB 122.";
    renderParagraphs(retroCalculation, ["No estimate was produced from the urine result."]);
    return;
  }

  if (Number.isNaN(testTime.getTime()) || Number.isNaN(targetTime.getTime()) || targetTime >= testTime) {
    retroRange.textContent = "Check times";
    retroQuality.textContent = "The target time must be earlier than the test or draw time.";
    renderParagraphs(retroCalculation, ["No estimate was produced."]);
    return;
  }

  const elapsed = hoursBetween(targetTime, testTime);
  let testLow = measured;
  let testHigh = measured;
  let conversionLine = "No specimen conversion was required.";

  if (specimen === "serum" || specimen === "plasma") {
    testLow = measured / c.serumPlasmaRatioMax;
    testHigh = measured / c.serumPlasmaRatioMin;
    conversionLine =
      "The reported " + specimen + " value was converted to a whole-blood-equivalent range using serum/plasma-to-blood ratios of " +
      c.serumPlasmaRatioMin + "–" + c.serumPlasmaRatioMax + ".";

    if (testLow < c.retrogradeMinimumAc) {
      retroRange.textContent = "Not calculated";
      retroQuality.textContent = "The converted whole-blood-equivalent range extends below 0.020 g/dL.";
      renderParagraphs(retroCalculation, [
        conversionLine,
        "ASB 122 does not recommend retrograde extrapolation below 0.020 g/dL, so no estimate was produced."
      ]);
      return;
    }
  }

  const low = testLow + c.eliminationRateMin * elapsed;
  const high = testHigh + c.eliminationRateMax * elapsed;

  const unit = specimen === "breath" ? "g/210 L" : "g/dL";
  retroRange.textContent = fmt(low) + "–" + fmt(high) + " " + unit;

  let quality = "Estimate quality: Limited — absorption status not established.";
  let absorptionStatus = "Post-absorptive status NOT assumed.";
  const warnings = [];

  if (lastDrink) {
    const targetSinceDrink = hoursBetween(lastDrink, targetTime);

    if (targetSinceDrink >= 2) {
      quality = "Estimate quality: Standard range — reported drinking cessation was at least 2 hours before the target time.";
      absorptionStatus = "Post-absorptive status ASSUMED based on the reported last drink occurring at least 2 hours before the target time.";
    } else if (targetSinceDrink >= 0) {
      absorptionStatus = "Post-absorptive status NOT assumed because the reported last drink was less than 2 hours before the target time.";
      warnings.push("Continued absorption may still have been occurring at the target time. The displayed range is the mathematical post-absorptive extrapolation and should be interpreted with this limitation.");
    } else {
      absorptionStatus = "Post-absorptive status NOT assumed because the reported last-drink time is after the target time.";
      warnings.push("The reported last-drink time is after the target time, indicating possible post-incident drinking or an inconsistent timeline.");
    }
  } else {
    warnings.push("No last-drink time was provided. ASB 122 states that when drinking history is unknown, it is not reasonable to assume the subject was post-absorptive.");
  }

  retroQuality.textContent = quality + " " + absorptionStatus;
  if (warnings.length) {
    retroWarning.hidden = false;
    retroWarning.textContent = warnings.join(" ");
  }

  renderParagraphs(retroCalculation, [
    "Measured result: " + fmt(measured) + " " + unit + ".",
    conversionLine,
    "Elapsed time: " + elapsed.toFixed(2) + " hours.",
    "Elimination-rate range: " + c.eliminationRateMin.toFixed(3) + "–" + c.eliminationRateMax.toFixed(3) + " g/dL/hour.",
    "Absorption assumption: " + absorptionStatus,
    "Equation: earlier concentration = test concentration + (elimination rate × elapsed time).",
    "Estimated earlier concentration: " + fmt(low) + "–" + fmt(high) + " " + unit + "."
  ]);
});

const drinkRows = document.querySelector("#drink-rows");
const drinkTemplate = document.querySelector("#drink-row-template");
const addDrinkButton = document.querySelector("#add-drink");

function addDrinkRow() {
  const row = drinkTemplate.content.firstElementChild.cloneNode(true);
  drinkRows.append(row);
}

addDrinkButton.addEventListener("click", addDrinkRow);
drinkRows.addEventListener("click", (event) => {
  const remove = event.target.closest(".remove-drink");
  if (!remove) return;
  if (drinkRows.children.length === 1) return;
  remove.closest(".drink-row").remove();
});
addDrinkRow();

function getVdEstimate(sex, weightKg, heightIn, age) {
  const c = BAC_METHODS.constants;

  if (sex === "male" && heightIn && age) {
    const heightCm = heightIn * c.cmPerIn;
    const tbw = 2.447 - (0.09516 * age) + (0.1074 * heightCm) + (0.3362 * weightKg);
    const vd = tbw / (weightKg * 0.825);
    const delta = vd * c.individualizedVd.maleCv;
    return {
      kind: "individualized",
      low: vd - delta,
      high: vd + delta,
      tbw,
      caution: tbw < c.individualizedVd.maleTbwCautionLiters,
      quality: "More individualized",
      missing: []
    };
  }

  if (sex === "female" && heightIn) {
    const heightCm = heightIn * c.cmPerIn;
    const tbw = -2.097 + (0.1069 * heightCm) + (0.2466 * weightKg);
    const vd = tbw / (weightKg * 0.838);
    const delta = vd * c.individualizedVd.femaleCv;
    return {
      kind: "individualized",
      low: vd - delta,
      high: vd + delta,
      tbw,
      caution: tbw < c.individualizedVd.femaleTbwCautionLiters,
      quality: "More individualized",
      missing: []
    };
  }

  if (sex === "male" || sex === "female") {
    const range = c.fixedVd[sex];
    const missing = [];
    if (!heightIn) missing.push("height");
    if (sex === "male" && !age) missing.push("age");
    return {
      kind: "fixed",
      low: range[0],
      high: range[1],
      tbw: null,
      caution: false,
      quality: "Standard",
      missing
    };
  }

  return {
    kind: "sexIndependent",
    low: c.fixedVd.sexIndependent[0],
    high: c.fixedVd.sexIndependent[1],
    tbw: null,
    caution: false,
    quality: "Broad",
    missing: ["sex assigned at birth", ...(heightIn ? [] : ["height"]), ...(age ? [] : ["age"])]
  };
}

const maximumForm = document.querySelector("#maximum-bac-form");
const maximumResult = document.querySelector("#maximum-bac-result");
const maximumRange = document.querySelector("#maximum-bac-range");
const maximumQuality = document.querySelector("#maximum-quality");
const maximumWarning = document.querySelector("#maximum-warning");
const maximumEthanol = document.querySelector("#maximum-ethanol");
const maximumVd = document.querySelector("#maximum-vd");
const maximumCalculation = document.querySelector("#maximum-calculation");
const maximumMethodBadge = document.querySelector("#maximum-method-badge");
const maximumComparison = document.querySelector("#maximum-comparison");
const maximumComparisonStatus = document.querySelector("#maximum-comparison-status");
const maximumComparisonCopy = document.querySelector("#maximum-comparison-copy");

maximumForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const c = BAC_METHODS.constants;
  const weightLb = Number(document.querySelector("#max-weight").value);
  const sex = document.querySelector("#max-sex").value;
  const ageRaw = document.querySelector("#max-age").value;
  const heightRaw = document.querySelector("#max-height").value;
  const lastDrinkRaw = document.querySelector("#max-last-drink").value;
  const observedRaw = document.querySelector("#max-observed-bac").value;
  const observedSpecimen = document.querySelector("#max-observed-specimen").value;
  const observedTimeRaw = document.querySelector("#max-observed-time").value;
  const age = ageRaw ? Number(ageRaw) : null;
  const heightIn = heightRaw ? Number(heightRaw) : null;
  const lastDrinkTime = lastDrinkRaw ? new Date(lastDrinkRaw) : null;
  const observedTime = observedTimeRaw ? new Date(observedTimeRaw) : null;
  const observedValue = observedRaw ? Number(observedRaw) : null;

  if (!Number.isFinite(weightLb) || weightLb <= 0) return;
  const weightKg = weightLb * c.kgPerLb;

  let grams = 0;
  const drinkDescriptions = [];

  [...drinkRows.children].forEach((row, index) => {
    const name = row.querySelector(".drink-name").value.trim() || ("Beverage " + (index + 1));
    const volume = Number(row.querySelector(".drink-volume").value);
    const abv = Number(row.querySelector(".drink-abv").value);
    const quantity = Number(row.querySelector(".drink-quantity").value);

    if (!Number.isFinite(volume) || !Number.isFinite(abv) || !Number.isFinite(quantity)) return;

    const rowGrams = volume * quantity * c.mlPerOz * (abv / 100) * c.ethanolDensityGPerMl;
    grams += rowGrams;
    drinkDescriptions.push(
      name + ": " + quantity + " × " + volume + " oz at " + abv + "% ABV = " + rowGrams.toFixed(1) + " g ethanol"
    );
  });

  maximumResult.hidden = false;
  maximumWarning.hidden = true;
  maximumWarning.textContent = "";
  maximumComparison.hidden = true;
  maximumComparisonStatus.textContent = "";
  maximumComparisonCopy.textContent = "";

  if (grams <= 0) {
    maximumRange.textContent = "Check beverages";
    maximumQuality.textContent = "Enter at least one valid beverage.";
    return;
  }

  const vd = getVdEstimate(sex, weightKg, heightIn, age);

  const bacLow = grams / (vd.high * weightKg * 10);
  const bacHigh = grams / (vd.low * weightKg * 10);

  maximumRange.textContent = fmt(bacLow) + "–" + fmt(bacHigh) + " g/dL";
  maximumEthanol.textContent = grams.toFixed(1) + " g";
  maximumVd.textContent = vd.low.toFixed(3) + "–" + vd.high.toFixed(3) + " L/kg";

  maximumMethodBadge.dataset.methodDefinition = vd.kind;
  maximumMethodBadge.textContent = BAC_METHODS.definitions[vd.kind].label;

  let qualityText = "Estimate quality: " + vd.quality + ".";
  if (vd.missing.length) {
    qualityText += " Missing information: " + [...new Set(vd.missing)].join(", ") + ".";
  }
  maximumQuality.textContent = qualityText;

  const warnings = [];
  if (vd.caution) {
    warnings.push("The individualized total-body-water estimate is below the ASB caution threshold and should be evaluated carefully.");
  }
  if (vd.kind !== "individualized") {
    warnings.push("A population Vd range was used because the information needed for an individualized calculation was not complete.");
  }
  if (warnings.length) {
    maximumWarning.hidden = false;
    maximumWarning.textContent = warnings.join(" ");
  }

  let comparisonSummary = null;
  let observedLow = null;
  let observedHigh = null;
  let observedUnit = observedSpecimen === "breath" ? "g/210 L" : "g/dL";

  if (observedValue !== null && Number.isFinite(observedValue) && observedValue >= 0) {
    observedLow = observedValue;
    observedHigh = observedValue;

    if (observedSpecimen === "serum" || observedSpecimen === "plasma") {
      observedLow = observedValue / c.serumPlasmaRatioMax;
      observedHigh = observedValue / c.serumPlasmaRatioMin;
      observedUnit = "g/dL whole-blood equivalent";
    }

    const exceedsMaximum = observedLow > bacHigh;
    maximumComparison.hidden = false;

    if (exceedsMaximum) {
      maximumComparisonStatus.textContent = "Reported drinking history does not account for the observed result under this model.";
      maximumComparisonCopy.textContent =
        "Even the low end of the observed-result range (" + fmt(observedLow) + " " + observedUnit +
        ") exceeds the high end of the theoretical maximum from the reported drinks (" + fmt(bacHigh) +
        " g/dL). Under the ASB 122 assumptions used here, the reported amount of alcohol is insufficient to account for the observed result. This does not identify why the history differs.";
      comparisonSummary = "Observed comparison: the observed result exceeds the theoretical maximum from the reported drinking history.";
    } else {
      maximumComparisonStatus.textContent = "Observed result is not excluded by the reported drinking history.";
      maximumComparisonCopy.textContent =
        "The observed result falls at or below the theoretical maximum range from the reported drinks. This means the reported amount is not ruled out by this calculation; it does not prove the drinking history is accurate.";
      comparisonSummary = "Observed comparison: the observed result does not exceed the theoretical maximum from the reported drinking history.";
    }

    if (lastDrinkTime && observedTime && !Number.isNaN(lastDrinkTime.getTime()) && !Number.isNaN(observedTime.getTime())) {
      const hoursAfterLastDrink = hoursBetween(lastDrinkTime, observedTime);
      if (hoursAfterLastDrink >= 0) {
        const timingSentence =
          " The observed test was " + hoursAfterLastDrink.toFixed(2) + " hours after the reported last drink.";
        maximumComparisonCopy.textContent += timingSentence;

        if (hoursAfterLastDrink >= 2) {
          maximumComparisonCopy.textContent +=
            " Because this is at least 2 hours after reported drinking cessation, ASB 122 considers it reasonable to assume the subject was post-absorptive at the test time, absent contrary case information.";
        } else {
          maximumComparisonCopy.textContent +=
            " Because this is less than 2 hours after reported drinking cessation, incomplete absorption remains possible.";
        }
      } else {
        maximumComparisonCopy.textContent +=
          " The observed test time is earlier than the reported last-drink time, so the reported timeline should be checked.";
      }
    } else if (lastDrinkTime || observedTime) {
      maximumComparisonCopy.textContent +=
        " A complete last-drink/test-time pair was not provided, so Reference Desk did not make a timing-based absorption assumption for this comparison.";
    }
  }

  const lines = [
    ...drinkDescriptions,
    "Total ethanol dose: " + grams.toFixed(1) + " g.",
    "Body weight: " + weightLb.toFixed(1) + " lb = " + weightKg.toFixed(1) + " kg.",
    "Distribution method: " + BAC_METHODS.definitions[vd.kind].label + ".",
    "Vd range used: " + vd.low.toFixed(3) + "–" + vd.high.toFixed(3) + " L/kg."
  ];

  if (lastDrinkTime && !Number.isNaN(lastDrinkTime.getTime())) {
    lines.push("Reported last-drink time: " + lastDrinkTime.toLocaleString() + ".");
  }

  if (observedValue !== null && Number.isFinite(observedValue)) {
    lines.push(
      "Observed result entered: " + fmt(observedValue) + " " +
      (observedSpecimen === "breath" ? "g/210 L" : "g/dL") + " (" + observedSpecimen + ")."
    );
    if (observedLow !== observedHigh) {
      lines.push(
        "Observed serum/plasma result converted to whole-blood-equivalent range: " +
        fmt(observedLow) + "–" + fmt(observedHigh) + " g/dL."
      );
    }
    if (observedTime && !Number.isNaN(observedTime.getTime())) {
      lines.push("Observed test/draw time: " + observedTime.toLocaleString() + ".");
    }
    if (comparisonSummary) lines.push(comparisonSummary);
  }

  if (vd.tbw !== null) {
    lines.push("Calculated total body water: " + vd.tbw.toFixed(1) + " L.");
  }

  lines.push(
    "Equation: BAC = ethanol dose ÷ (Vd × body weight × 10).",
    "Theoretical maximum BAC: " + fmt(bacLow) + "–" + fmt(bacHigh) + " g/dL.",
    "Assumptions: complete absorption and no alcohol elimination before the theoretical maximum.",
    "The observed-result comparison is a consistency screen, not a determination that a person was truthful, deceptive, or impaired."
  );

  renderParagraphs(maximumCalculation, lines);
});

setBacMode("retrograde");
