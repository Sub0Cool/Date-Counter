// Central offense data for Expediter Tool Kit.
//
// This file is intentionally small for the first migration. It contains only
// offenses that were already present in the Toolkit; no new UCC offenses are
// introduced here. Additional legal attributes can be added to each offense
// over time without duplicating the same offense across multiple tools.

window.EXPEDITER_OFFENSE_DATA = [
  {
    code: "PC",
    section: "240",
    name: "Assault",
    misdemeanorExposure: {
      jail: "6 months",
      basis: "PC § 241(a)",
      law: "PEN",
      source: "241",
      note: "PC § 240 defines assault; punishment for ordinary assault is supplied by PC § 241(a)."
    }
  },
  {
    code: "PC",
    section: "242",
    name: "Battery",
    misdemeanorExposure: {
      jail: "6 months",
      basis: "PC § 243(a)",
      law: "PEN",
      source: "243",
      note: "PC § 242 defines battery; punishment for ordinary battery is supplied by PC § 243(a)."
    }
  },
  {
    code: "PC",
    section: "243(e)(1)",
    name: "Domestic battery",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 243(e)(1)",
      law: "PEN",
      source: "243",
      note: "Battery against a spouse, cohabitant, co-parent, former spouse, fiancé(e), or current/former dating partner is punishable by up to one year in county jail. A qualifying prior can trigger a 48-hour minimum if probation is granted, absent good cause."
    }
  },
  {
    code: "PC",
    section: "273.5",
    name: "Corporal injury to spouse or cohabitant",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 273.5(a)",
      law: "PEN",
      source: "273.5",
      note: "The misdemeanor alternative is county jail not exceeding one year; felony punishment is also authorized. Qualifying recent priors can affect felony terms and probation conditions."
    }
  },
  {
    code: "PC",
    section: "273.6",
    name: "Violation of protective order",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 273.6(a)",
      law: "PEN",
      source: "273.6",
      note: "A knowing and intentional violation is punishable by up to one year in county jail. Injury and qualifying repeat violations can trigger mandatory minimum custody and/or felony exposure."
    }
  },
  {
    code: "PC",
    section: "166(c)(1)",
    name: "Violation of specified protective or stay-away order",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 166(c)(1)",
      law: "PEN",
      source: "166",
      note: "A willful and knowing violation of the specified protective or stay-away orders is punishable by up to one year in county jail. Physical injury triggers at least 48 hours of jail under subdivision (c)(2)."
    }
  },
  {
    code: "PC",
    section: "245(a)(1)",
    name: "Assault with a deadly weapon other than a firearm",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 245(a)(1)",
      law: "PEN",
      source: "245",
      note: "The misdemeanor alternative is county jail not exceeding one year; felony punishment is also authorized."
    }
  },
  {
    code: "PC",
    section: "422",
    name: "Criminal threats",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 422(a)",
      law: "PEN",
      source: "422",
      note: "The misdemeanor alternative is county jail not exceeding one year; felony punishment is also authorized."
    }
  },
  {
    code: "VC",
    section: "2800.1",
    name: "Misdemeanor evading a peace officer",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "VC § 2800.1",
      law: "VEH",
      source: "2800.1",
      note: "The statute expressly provides county jail for not more than one year."
    }
  },
  {
    code: "VC",
    section: "20002",
    name: "Hit and run — property damage",
    misdemeanorExposure: {
      jail: "6 months",
      basis: "VC § 20002(c)",
      law: "VEH",
      source: "20002",
      note: "The statute expressly provides county jail not exceeding six months."
    }
  },
  {
    code: "HS",
    section: "11364",
    name: "Possession of drug paraphernalia",
    misdemeanorExposure: {
      jail: "180 days",
      basis: "HSC §§ 11364 & 11374",
      law: "HSC",
      source: "11364",
      note: "HSC § 11374 supplies the default penalty for violations in the division when no different penalty is provided: 15 to 180 days, plus the statutory fine range."
    }
  },
  {
    code: "HS",
    section: "11550",
    name: "Under the influence of a controlled substance",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "HSC § 11550(a)",
      law: "HSC",
      source: "11550",
      note: "The misdemeanor maximum is one year; the statute also contains a 90-day minimum subject to statutory exceptions and treatment provisions."
    }
  }
];
