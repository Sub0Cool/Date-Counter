// Blood alcohol calculation methods for Reference Desk.
// Source: ANSI/ASB Best Practice Recommendation 122, First Edition, 2024.
// This file contains only calculation constants, method descriptions, and source metadata.

window.REFERENCE_DESK_BAC_METHODS = {
  version: "1.0",
  source: {
    title: "ANSI/ASB Best Practice Recommendation 122, First Edition, 2024",
    label: "ANSI/ASB BPR 122",
    url: "https://www.aafs.org/asb-standard/best-practice-recommendation-performing-alcohol-calculations-forensic-toxicology",
    pdfUrl: "https://www.aafs.org/sites/default/files/media/documents/122_BPR_e1.pdf"
  },
  constants: {
    ethanolDensityGPerMl: 0.789,
    mlPerOz: 29.6,
    kgPerLb: 0.454,
    cmPerIn: 2.54,
    eliminationRateMin: 0.010,
    eliminationRateMax: 0.025,
    retrogradeMinimumAc: 0.020,
    serumPlasmaRatioMin: 1.13,
    serumPlasmaRatioMax: 1.19,
    fixedVd: {
      male: [0.58, 0.83],
      female: [0.43, 0.73],
      sexIndependent: [0.45, 0.81]
    },
    individualizedVd: {
      maleCv: 0.0986,
      femaleCv: 0.15,
      maleTbwCautionLiters: 30,
      femaleTbwCautionLiters: 23
    }
  },
  definitions: {
    fixed: {
      label: "ASB 122 — Fixed Vd",
      title: "Fixed volume of distribution (Vd)",
      body: "Uses an ASB-recommended population range for alcohol volume of distribution instead of calculating a person-specific value. Reference Desk uses 0.58–0.83 L/kg for males, 0.43–0.73 L/kg for females, and 0.45–0.81 L/kg when sex assigned at birth is not known. A range is used because a single fixed Vd is not appropriate for the population."
    },
    individualized: {
      label: "ASB 122 — Individualized Vd",
      title: "Individualized volume of distribution (Vd)",
      body: "Uses the Watson total-body-water equations and the Maskell Vd calculation when the needed anthropometric information is available. Reference Desk then applies the ASB-recommended variability range: ±9.86% for males and ±15.00% for females. It remains an estimate, not a measurement of the individual's actual Vd."
    },
    sexIndependent: {
      label: "ASB 122 — Sex-independent Vd",
      title: "Sex-independent volume of distribution",
      body: "Uses the broader ASB-recommended 0.45–0.81 L/kg range when sex assigned at birth is not supplied. This permits a theoretical estimate without assuming missing information, but the resulting BAC range is wider."
    },
    retrograde: {
      label: "ASB 122 — Retrograde extrapolation",
      title: "Retrograde BAC estimate",
      body: "Estimates a range of alcohol concentrations at an earlier known time from a later measured concentration. Reference Desk uses the ASB minimum elimination-rate range of 0.010–0.025 g/dL/hour. The method assumes linear elimination and must address whether the subject was post-absorptive."
    }
  }
};
