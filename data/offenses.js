// Central offense data for Reference Desk.
//
// These records were migrated from the Toolkit's existing lookup tables.
// No new legal rules are introduced here. Maximum Exposure and the
// offense-specific Probation Lookup read shared records from this file.
//
// Each record also carries provenance/source metadata. The metadata added in
// this migration documents the authorities already referenced by the Toolkit;
// it does not represent a new legal verification pass.

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
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "241",
          "label": "PC § 241(a)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
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
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "243",
          "label": "PC § 243(a)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
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
    },
    probation: {
      order: 0,
      status: "Eligible",
      term: "Minimum 36 months",
      terms: [
        "Criminal protective order protecting the victim.",
        "Booking within one week of sentencing if the defendant has not already been booked.",
        "$500 domestic-violence program fee, subject to the statute's ability-to-pay reduction or waiver provisions.",
        "Successful completion of a batterer's program for at least one year, with required progress reporting.",
        "Appropriate community service.",
        "A qualifying prior PC § 243(e)(1) or § 273.5 conviction triggers at least 48 hours in jail if probation is granted, unless the court finds good cause not to impose it."
      ],
      note: "PC § 1203.097 supplies the mandatory domestic-violence probation terms. PC § 243(e)(1) adds the prior-related custody provision.",
      sources: [["PEN","1203.097","PC § 1203.097"],["PEN","243","PC § 243(e)(1)"]]
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "243",
          "label": "PC § 243(e)(1)"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "1203.097",
          "label": "PC § 1203.097"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
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
    },
    probation: {
      order: 1,
      status: "Eligible",
      term: "Minimum 36 months",
      terms: [
        "Probation must be imposed consistently with PC § 1203.097, including its protective-order, batterer's-program, booking, fee, and community-service requirements.",
        "One qualifying prior listed in PC § 273.5(f) within seven years: at least 15 days county jail as a probation condition, absent a good-cause finding.",
        "Two or more qualifying priors within seven years: at least 60 days county jail as a probation condition, absent a good-cause finding."
      ],
      note: "PC § 273.5 expressly incorporates § 1203.097 when probation is granted.",
      sources: [["PEN","273.5","PC § 273.5(g)-(h)"],["PEN","1203.097","PC § 1203.097"]]
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "273.5",
          "label": "PC § 273.5(a)"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "273.5",
          "label": "PC § 273.5(g)-(h)"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "1203.097",
          "label": "PC § 1203.097"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
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
    },
    probation: {
      order: 3,
      status: "Generally eligible",
      term: "Depends on order / victim relationship",
      terms: [
        "If the offense is a crime in which the victim is a person defined in Family Code § 6211, PC § 1203.097 requires the domestic-violence probation conditions, including a minimum 36-month term.",
        "Injury, repeat violations, and the type of protective order can create additional custody consequences."
      ],
      note: "Because § 273.6 covers multiple kinds of protective orders, the probation conditions cannot be determined from the section number alone.",
      sources: [["PEN","1203.097","PC § 1203.097"]]
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "273.6",
          "label": "PC § 273.6(a)"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "1203.097",
          "label": "PC § 1203.097"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
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
    },
    probation: {
      order: 2,
      status: "Eligible",
      term: "Minimum 36 months",
      terms: [
        "Probation must be imposed consistently with PC § 1203.097.",
        "If the violation results in physical injury, PC § 166(c)(2) requires at least 48 hours in county jail whether a fine or imprisonment is imposed or the sentence is suspended."
      ],
      note: "PC § 166(e)(1) expressly requires § 1203.097-compliant probation for a conviction under subdivision (c).",
      sources: [["PEN","166","PC § 166(c), (e)"],["PEN","1203.097","PC § 1203.097"]]
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "166",
          "label": "PC § 166(c)(1)"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "166",
          "label": "PC § 166(c), (e)"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "1203.097",
          "label": "PC § 1203.097"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
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
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "245",
          "label": "PC § 245(a)(1)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
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
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "422",
          "label": "PC § 422(a)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
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
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "VEH",
          "section": "2800.1",
          "label": "VC § 2800.1"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
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
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "VEH",
          "section": "20002",
          "label": "VC § 20002(c)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
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
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "HSC",
          "section": "11364",
          "label": "HSC §§ 11364 & 11374"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
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
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "HSC",
          "section": "11550",
          "label": "HSC § 11550(a)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "69",
    name: "Resisting or deterring an executive officer",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 69(a)",
      law: "PEN",
      source: "69",
      note: "Misdemeanor alternative is county jail not exceeding one year; the offense may also be punished as a felony."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "69",
          "label": "PC § 69(a)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "136.1",
    name: "Dissuading a witness or victim",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 136.1(a)-(b)",
      law: "PEN",
      source: "136.1",
      note: "The misdemeanor forms in subdivisions (a) and (b) carry up to one year. Subdivision (c) circumstances make the offense a felony."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "136.1",
          "label": "PC § 136.1(a)-(b)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "148",
    name: "Resisting, delaying, or obstructing",
    misdemeanorExposure: {
      jail: "Varies",
      basis: "PC § 148",
      law: "PEN",
      source: "148",
      note: "PC § 148(a) carries up to one year. Other subdivisions can be wobblers or felony-only, so use the subdivision for a precise answer."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "148",
          "label": "PC § 148"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "148.9",
    name: "False identification to a peace officer",
    misdemeanorExposure: {
      jail: "6 months",
      basis: "PC §§ 148.9 & 19",
      law: "PEN",
      source: "148.9",
      note: "Section 148.9 declares the offense a misdemeanor but provides no separate jail maximum; the general misdemeanor maximum in PC § 19 applies."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "148.9",
          "label": "PC §§ 148.9 & 19"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "243(b)",
    name: "Battery on specified protected person",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 243(b)",
      law: "PEN",
      source: "243",
      note: "Applies when the protected-person and knowledge requirements of subdivision (b) are met."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "243",
          "label": "PC § 243(b)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "243(c)",
    name: "Battery on specified protected person causing injury",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 243(c)",
      law: "PEN",
      source: "243",
      note: "The misdemeanor alternative is up to one year; qualifying conduct may also be punished as a felony."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "243",
          "label": "PC § 243(c)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "243(d)",
    name: "Battery causing serious bodily injury",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 243(d)",
      law: "PEN",
      source: "243",
      note: "The misdemeanor alternative is up to one year; the offense is a wobbler."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "243",
          "label": "PC § 243(d)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "245(a)(4)",
    name: "Assault by means likely to produce great bodily injury",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 245(a)(4)",
      law: "PEN",
      source: "245",
      note: "The misdemeanor alternative is county jail not exceeding one year; felony punishment is also authorized."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "245",
          "label": "PC § 245(a)(4)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "417",
    name: "Brandishing a weapon",
    misdemeanorExposure: {
      jail: "Varies",
      basis: "PC § 417",
      law: "PEN",
      source: "417",
      note: "Exposure depends on the weapon, location, victim, and subdivision. Misdemeanor maximums within § 417 range up to one year, and mandatory minimum terms can apply."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "417",
          "label": "PC § 417"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "417(a)(2)(A)",
    name: "Brandishing a concealable firearm in a public place",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 417(a)(2)(A)",
      law: "PEN",
      source: "417",
      note: "County jail is not less than three months and not more than one year."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "417",
          "label": "PC § 417(a)(2)(A)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "417.4",
    name: "Brandishing an imitation firearm",
    misdemeanorExposure: {
      jail: "6 months",
      basis: "PC §§ 417.4 & 19",
      law: "PEN",
      source: "417.4",
      note: "Section 417.4 requires at least 30 days; PC § 19 supplies the general six-month misdemeanor ceiling where no different maximum is stated."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "417.4",
          "label": "PC §§ 417.4 & 19"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "452(d)",
    name: "Recklessly causing a fire of property",
    misdemeanorExposure: {
      jail: "6 months",
      basis: "PC §§ 452(d) & 19",
      law: "PEN",
      source: "452",
      note: "Subdivision (d) is a misdemeanor and does not state a separate maximum; PC § 19 supplies the general six-month maximum."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "452",
          "label": "PC §§ 452(d) & 19"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "459.5",
    name: "Shoplifting",
    misdemeanorExposure: {
      jail: "6 months",
      basis: "PC §§ 459.5 & 19",
      law: "PEN",
      source: "459.5",
      note: "Ordinary shoplifting is a misdemeanor; specified serious/violent or registrable priors can permit felony punishment."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "459.5",
          "label": "PC §§ 459.5 & 19"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "466",
    name: "Possession of burglary tools",
    misdemeanorExposure: {
      jail: "6 months",
      basis: "PC §§ 466 & 19",
      law: "PEN",
      source: "466",
      note: "Section 466 declares a misdemeanor without a separate jail maximum, so PC § 19 applies."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "466",
          "label": "PC §§ 466 & 19"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "484",
    name: "Theft",
    misdemeanorExposure: {
      jail: "6 months",
      basis: "PC §§ 484 & 490",
      law: "PEN",
      source: "490",
      note: "This result is for petty theft. Value, property type, and other facts can make the offense grand theft or trigger a different statute."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "490",
          "label": "PC §§ 484 & 490"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "484e",
    name: "Access-card theft offenses",
    misdemeanorExposure: {
      jail: "Varies",
      basis: "PC §§ 484e, 489 & 490",
      law: "PEN",
      source: "484e",
      note: "Subdivision (c) is petty theft (up to six months). Subdivisions (a), (b), and (d) are grand theft and can carry up to one year as a misdemeanor alternative. Enter the subdivision for precision."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "484e",
          "label": "PC §§ 484e, 489 & 490"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "487",
    name: "Grand theft",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 489(c)",
      law: "PEN",
      source: "489",
      note: "Most grand theft has a misdemeanor alternative of up to one year. Theft of a firearm is punished as a felony under PC § 489(a)."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "489",
          "label": "PC § 489(c)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "496",
    name: "Receiving stolen property",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 496(a)",
      law: "PEN",
      source: "496",
      note: "When punishable as a misdemeanor, the maximum county-jail term is one year; value and specified priors affect classification."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "496",
          "label": "PC § 496(a)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "529",
    name: "False personation",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 529(b)",
      law: "PEN",
      source: "529",
      note: "The statute authorizes either county jail up to one year or felony punishment."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "529",
          "label": "PC § 529(b)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "530.5(e)",
    name: "Mail theft",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 530.5(e)",
      law: "PEN",
      source: "530.5",
      note: "Subdivision (e) authorizes county jail not exceeding one year."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "530.5",
          "label": "PC § 530.5(e)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "537(a)(1)",
    name: "Defrauding an innkeeper — $950 or less",
    misdemeanorExposure: {
      jail: "6 months",
      basis: "PC § 537(a)(1)",
      law: "PEN",
      source: "537",
      note: "Applies when the value of the food, fuel, services, credit, or accommodations is $950 or less."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "537",
          "label": "PC § 537(a)(1)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "537(a)(2)",
    name: "Defrauding an innkeeper — over $950",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 537(a)(2)",
      law: "PEN",
      source: "537",
      note: "The misdemeanor alternative is county jail not more than one year; state-prison punishment is also authorized."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "537",
          "label": "PC § 537(a)(2)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "594",
    name: "Vandalism",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 594(b)",
      law: "PEN",
      source: "594",
      note: "The misdemeanor jail maximum is up to one year. Damage amount and prior vandalism convictions affect classification and fines."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "594",
          "label": "PC § 594(b)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "602",
    name: "Trespass",
    misdemeanorExposure: {
      jail: "Varies",
      basis: "PC § 602",
      law: "PEN",
      source: "602",
      note: "Section 602 contains many forms of trespass with different consequences. Many misdemeanor forms use the general six-month maximum, while some specified conduct or repeat violations can carry up to one year. Enter the subdivision when known."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "602",
          "label": "PC § 602"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "602.1",
    name: "Interference with a business or public agency",
    misdemeanorExposure: {
      jail: "90 days",
      basis: "PC § 602.1(a)-(b)",
      law: "PEN",
      source: "602.1",
      note: "The misdemeanor forms in subdivisions (a) and (b) carry up to 90 days."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "602.1",
          "label": "PC § 602.1(a)-(b)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "602.5",
    name: "Unauthorized entry into a dwelling",
    misdemeanorExposure: {
      jail: "Varies",
      basis: "PC § 602.5",
      law: "PEN",
      source: "602.5",
      note: "Subdivision (a) is a misdemeanor subject to the general six-month maximum; aggravated trespass under subdivision (b) carries up to one year."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "602.5",
          "label": "PC § 602.5"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "647",
    name: "Disorderly conduct",
    misdemeanorExposure: {
      jail: "Varies",
      basis: "PC § 647",
      law: "PEN",
      source: "647",
      note: "Exposure depends heavily on the subdivision and facts. Many base misdemeanor forms use the general six-month maximum, while specified repeat, minor-victim, or other circumstances can carry up to one year or felony punishment."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "647",
          "label": "PC § 647"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "21310",
    name: "Carrying a concealed dirk or dagger",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 21310",
      law: "PEN",
      source: "21310",
      note: "The misdemeanor alternative is county jail not exceeding one year; felony punishment is also authorized."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "21310",
          "label": "PC § 21310"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "25400",
    name: "Carrying a concealed firearm",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "PC § 25400(c)",
      law: "PEN",
      source: "25400",
      note: "Misdemeanor exposure can reach one year. Some circumstances make the offense a wobbler or felony-only, so the facts and paragraph of subdivision (c) matter."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "25400",
          "label": "PC § 25400(c)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "21510(b)",
    name: "Carrying a switchblade knife",
    misdemeanorExposure: {
      jail: "6 months",
      basis: "PC §§ 21510(b) & 19",
      law: "PEN",
      source: "21510",
      note: "Section 21510 makes the offense a misdemeanor without a separate jail maximum; PC § 19 supplies the general six-month maximum."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "21510",
          "label": "PC §§ 21510(b) & 19"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "VC",
    section: "4462.5",
    name: "Registration-document offense with intent to evade registration requirements",
    misdemeanorExposure: {
      jail: "6 months",
      basis: "VC §§ 4462.5 & 42002",
      law: "VEH",
      source: "4462.5",
      note: "VC § 4462.5 declares a misdemeanor; VC § 42002 supplies the general six-month misdemeanor maximum where no different penalty is provided."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "VEH",
          "section": "4462.5",
          "label": "VC §§ 4462.5 & 42002"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "VC",
    section: "14601s",
    name: "Driving on a suspended/revoked license — § 14601 series",
    misdemeanorExposure: {
      jail: "Varies",
      basis: "VC §§ 14601 et seq.",
      law: "VEH",
      source: "14601",
      note: "This is treated as a series lookup. Exposure varies by the exact section and prior history. For example, VC § 14601 carries up to six months on a first conviction and up to one year for a qualifying repeat."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "VEH",
          "section": "14601",
          "label": "VC §§ 14601 et seq."
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "VC",
    section: "14601",
    name: "Driving while privilege suspended or revoked",
    misdemeanorExposure: {
      jail: "6 months / 1 year repeat",
      basis: "VC § 14601(b)",
      law: "VEH",
      source: "14601",
      note: "First conviction: up to six months. A qualifying new offense within five years of a specified prior: up to one year."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "VEH",
          "section": "14601",
          "label": "VC § 14601(b)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "VC",
    section: "20001",
    name: "Hit and run involving injury or death",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "VC § 20001(b)",
      law: "VEH",
      source: "20001",
      note: "The misdemeanor alternative is up to one year. Death or permanent serious injury carries a 90-day minimum if punished in county jail, subject to the statute's interests-of-justice provision."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "VEH",
          "section": "20001",
          "label": "VC § 20001(b)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "VC",
    section: "23109",
    name: "Speed contest / exhibition of speed",
    misdemeanorExposure: {
      jail: "Varies",
      basis: "VC § 23109",
      law: "VEH",
      source: "23109",
      note: "Subdivision and facts matter. A basic first speed contest under subdivision (a) carries up to 90 days; injury, repeat offenses, or serious injury can increase misdemeanor exposure up to six months or one year."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "VEH",
          "section": "23109",
          "label": "VC § 23109"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "HS",
    section: "11350",
    name: "Possession of specified controlled substances",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "HSC § 11350(a)",
      law: "HSC",
      source: "11350",
      note: "Ordinary misdemeanor possession carries county jail not more than one year; specified serious/violent or registrable priors can permit felony punishment."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "HSC",
          "section": "11350",
          "label": "HSC § 11350(a)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "HS",
    section: "11357",
    name: "Cannabis possession",
    misdemeanorExposure: {
      jail: "Varies",
      basis: "HSC § 11357",
      law: "HSC",
      source: "11357",
      note: "Age, amount, and location control. For an adult possessing more than 28.5 grams of cannabis or more than 8 grams of concentrated cannabis, the misdemeanor maximum is six months; other forms may be infractions or carry lower exposure."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "HSC",
          "section": "11357",
          "label": "HSC § 11357"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "HS",
    section: "11377",
    name: "Possession of specified controlled substances",
    misdemeanorExposure: {
      jail: "1 year",
      basis: "HSC § 11377(a)",
      law: "HSC",
      source: "11377",
      note: "Ordinary misdemeanor possession carries county jail not more than one year; specified serious/violent or registrable priors can permit felony punishment."
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "HSC",
          "section": "11377",
          "label": "HSC § 11377(a)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "PC",
    section: "273a",
    name: "Child endangerment",
    probation: {
      order: 4,
      status: "Eligible",
      term: "Minimum 48 months if probation is granted",
      terms: [
        "Criminal protective order protecting the victim from further violence or threats, with stay-away or residence-exclusion conditions if appropriate.",
        "Successful completion of at least one year of an approved child-abuser treatment counseling program.",
        "If the offense was committed while under the influence of drugs or alcohol: abstention during probation and random drug testing.",
        "The court may waive a listed minimum condition if it finds the condition would not be in the interests of justice and states its reasons on the record."
      ],
      note: "These conditions are stated in PC § 273a(c).",
      sources: [["PEN","273a","PC § 273a(c)"]]
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "PEN",
          "section": "273a",
          "label": "PC § 273a(c)"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    code: "VC",
    section: "23152",
    name: "Driving under the influence",
    probation: {
      order: 5,
      status: "Eligible",
      term: "3 to 5 years",
      terms: [
        "No driving with any measurable amount of alcohol in the blood.",
        "If arrested for DUI, no refusal to submit to the chemical testing required by law.",
        "No commission of any criminal offense.",
        "For a first-offense probation sentence under VC § 23538: statutory fine and, where an approved program is available, enrollment in and completion of the required DUI program.",
        "First offender with BAC below 0.20%: at least a three-month licensed DUI program; BAC 0.20% or more or chemical-test refusal: at least a nine-month program."
      ],
      note: "VC § 23600 supplies the core DUI probation terms; VC § 23538 supplies additional first-offender probation conditions.",
      sources: [["VEH","23600","VC § 23600"],["VEH","23538","VC § 23538"]]
    },
    metadata: {
      provenance: "Existing Reference Desk lookup data",
      authorities: [
        {
          "type": "statute",
          "law": "VEH",
          "section": "23600",
          "label": "VC § 23600"
        },
        {
          "type": "statute",
          "law": "VEH",
          "section": "23538",
          "label": "VC § 23538"
        }
      ],
      verification: {
        status: "not reverified during metadata migration",
        checkedThrough: null
      }
    }
  },
  {
    "code": "PC",
    "section": "30305",
    "name": "Prohibited person in possession of ammunition",
    "misdemeanorExposure": {
      "jail": "Varies",
      "basis": "PC §§ 30305 & 19",
      "law": "PEN",
      "source": "30305",
      "note": "Subdivision (a) is a wobbler with a misdemeanor alternative of up to one year in county jail. Subdivision (b) is a misdemeanor; because it states no separate jail term, the general six-month misdemeanor maximum in PC § 19 applies."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "30305",
          "label": "PC § 30305"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "19",
          "label": "PC § 19"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "236",
    "name": "False imprisonment",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC §§ 236 & 237(a)",
      "law": "PEN",
      "source": "237",
      "note": "Ordinary false imprisonment is punishable by up to one year in county jail. If effected by violence, menace, fraud, or deceit, the offense is felony punishable under PC § 1170(h)."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "236",
          "label": "PC § 236"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "237",
          "label": "PC § 237(a)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "VC",
    "section": "23103",
    "name": "Reckless driving",
    "misdemeanorExposure": {
      "jail": "5–90 days",
      "basis": "VC § 23103(c)",
      "law": "VEH",
      "source": "23103",
      "note": "Reckless driving carries a statutory county-jail range of not less than five days and not more than 90 days, except where VC §§ 23104 or 23105 apply."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "VEH",
          "section": "23103",
          "label": "VC § 23103(c)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "VC",
    "section": "23103.5",
    "name": "Wet reckless — reckless driving in satisfaction of DUI",
    "misdemeanorExposure": {
      "jail": "5–90 days",
      "basis": "VC §§ 23103(c) & 23103.5",
      "law": "VEH",
      "source": "23103.5",
      "note": "VC § 23103.5 is a DUI-related disposition resulting in a conviction under VC § 23103; the underlying reckless-driving jail range is five to 90 days."
    },
    "probation": {
      "order": 6,
      "status": "Generally eligible",
      "term": "Generally up to 1 year",
      "terms": [
        "If the § 23103 conviction qualifies as a prior under VC § 23103.5 and probation is granted, the court must order enrollment in a licensed alcohol-and-drug education program and completion of at least its educational component, unless the statute's compelling-circumstances exception applies.",
        "If the qualifying wet-reckless offense occurred within 10 years of a separate qualifying wet reckless, DUI, or DUI-with-injury conviction, probation requires a licensed program of nine months or longer with at least 60 hours of program activities.",
        "For the operative version through January 1, 2033, the court may order an ignition-interlock-device restriction for a qualifying conviction."
      ],
      "note": "VC § 23103.5 adds DUI-related probation consequences to a § 23103 disposition. The basic custody exposure remains the § 23103(c) five-to-90-day range.",
      "sources": [
        [
          "VEH",
          "23103.5",
          "VC § 23103.5(e)-(g)"
        ],
        [
          "VEH",
          "23103",
          "VC § 23103(c)"
        ],
        [
          "PEN",
          "1203a",
          "PC § 1203a"
        ]
      ]
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "VEH",
          "section": "23103.5",
          "label": "VC § 23103.5"
        },
        {
          "type": "statute",
          "law": "VEH",
          "section": "23103",
          "label": "VC § 23103(c)"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "1203a",
          "label": "PC § 1203a"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "148.4",
    "name": "Tampering with fire protection equipment / false fire alarm",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC § 148.4(a)",
      "law": "PEN",
      "source": "148.4",
      "note": "Subdivision (a) is a misdemeanor punishable by up to one year in county jail. A false fire alarm causing great bodily injury or death is a felony under subdivision (b)."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "148.4",
          "label": "PC § 148.4(a)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "647(h)",
    "name": "Loitering or prowling on private property",
    "misdemeanorExposure": {
      "jail": "6 months",
      "basis": "PC §§ 647(h) & 19",
      "law": "PEN",
      "source": "647",
      "note": "PC § 647(h) is disorderly conduct, a misdemeanor. No separate jail term is stated for subdivision (h), so PC § 19 supplies the general six-month misdemeanor maximum."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "647",
          "label": "PC § 647(h)"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "19",
          "label": "PC § 19"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "25850(a)",
    "name": "Carrying a loaded firearm in public",
    "misdemeanorExposure": {
      "jail": "Varies",
      "basis": "PC § 25850(c)",
      "law": "PEN",
      "source": "25850",
      "note": "The charging conduct is stated in subdivision (a), but punishment depends on subdivision (c). Paragraphs (c)(5) and (c)(6) are wobblers with a misdemeanor alternative up to one year; (c)(7) is a misdemeanor up to one year; (c)(1)-(4) are felonies."
    },
    "probation": {
      "order": 13,
      "status": "Depends on punishment and priors",
      "term": "Generally up to 1 year if misdemeanor probation is available",
      "terms": [
        "A defendant with a prior offense enumerated in PC § 23515 or a crime punishable under a provision listed in PC § 16580 must ordinarily serve at least three months in county jail, including as a condition of probation or a suspended sentence.",
        "The court may depart from the three-month minimum in an unusual case when the interests of justice would be best served, but must state the circumstances on the record."
      ],
      "note": "PC § 25850(d) creates a prior-based minimum custody rule that can apply even when probation is granted. The applicable punishment paragraph under § 25850(c) must be identified.",
      "sources": [
        [
          "PEN",
          "25850",
          "PC § 25850(c)-(d)"
        ]
      ]
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "25850",
          "label": "PC § 25850(a), (c)-(d)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "243.6",
    "name": "Battery on a school employee",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC § 243.6",
      "law": "PEN",
      "source": "243.6",
      "note": "Battery on a qualifying school employee is punishable by up to one year in county jail. If injury is inflicted, felony punishment is also authorized."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "243.6",
          "label": "PC § 243.6"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "241(c)",
    "name": "Assault on specified protected person",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC § 241(c)",
      "law": "PEN",
      "source": "241",
      "note": "Applies to assault on the protected persons listed in subdivision (c), when the statutory duty-status and knowledge requirements are met."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "241",
          "label": "PC § 241(c)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "VC",
    "section": "4461(c)",
    "name": "Misuse of disabled person placard",
    "misdemeanorExposure": {
      "jail": "6 months",
      "basis": "VC § 4461(c)",
      "law": "VEH",
      "source": "4461",
      "note": "Displaying a disabled-person placard not issued to the person, or one that has been canceled or revoked, may be handled as a parking violation or as a misdemeanor carrying up to six months in county jail."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "VEH",
          "section": "4461",
          "label": "VC § 4461(c)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "368(b)(1)",
    "name": "Elder/dependent adult abuse — likely GBI or death",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC § 368(b)(1)",
      "law": "PEN",
      "source": "368",
      "note": "This offense is a wobbler. The misdemeanor alternative is up to one year in county jail; felony punishment is two, three, or four years, with possible additional terms for great bodily injury or death."
    },
    "probation": {
      "order": 7,
      "status": "Eligible",
      "term": "Generally up to 1 year if misdemeanor probation is granted",
      "terms": [
        "The court may require appropriate counseling as a condition of probation under PC § 368(k).",
        "Upon conviction under subdivision (b), the sentencing court must consider a no-contact restraining order protecting the victim, potentially for up to 10 years."
      ],
      "note": "PC § 368(k)-(l) supplies offense-specific probation/sentencing considerations.",
      "sources": [
        [
          "PEN",
          "368",
          "PC § 368(k)-(l)"
        ]
      ]
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "368",
          "label": "PC § 368(b)(1), (k)-(l)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "368(c)",
    "name": "Elder/dependent adult abuse — not likely GBI or death",
    "misdemeanorExposure": {
      "jail": "6 months first / 1 year repeat",
      "basis": "PC §§ 368(c) & 19",
      "law": "PEN",
      "source": "368",
      "note": "Subdivision (c) is a misdemeanor. A first violation has no separate jail term and therefore uses the six-month maximum in PC § 19; a second or subsequent violation may be punished by up to one year in county jail."
    },
    "probation": {
      "order": 8,
      "status": "Eligible",
      "term": "Generally up to 1 year",
      "terms": [
        "The court may require appropriate counseling as a condition of probation under PC § 368(k).",
        "Upon conviction under subdivision (c), the sentencing court must consider a no-contact restraining order protecting the victim, potentially for up to 10 years."
      ],
      "note": "PC § 368(k)-(l) supplies offense-specific probation/sentencing considerations.",
      "sources": [
        [
          "PEN",
          "368",
          "PC § 368(c), (k)-(l)"
        ],
        [
          "PEN",
          "19",
          "PC § 19"
        ]
      ]
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "368",
          "label": "PC § 368(c), (k)-(l)"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "19",
          "label": "PC § 19"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "368(d)(1)",
    "name": "Elder/dependent adult theft or fraud — noncaretaker, over $950",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC § 368(d)(1)",
      "law": "PEN",
      "source": "368",
      "note": "For property or identifying information valued over $950, subdivision (d)(1) is a wobbler with a misdemeanor alternative of up to one year in county jail."
    },
    "probation": {
      "order": 9,
      "status": "Eligible",
      "term": "Generally up to 1 year if misdemeanor probation is granted",
      "terms": [
        "The court may require appropriate counseling as a condition of probation under PC § 368(k).",
        "The sentencing court must consider a no-contact restraining order protecting the victim, potentially for up to 10 years."
      ],
      "note": "PC § 368(k)-(l) supplies offense-specific probation/sentencing considerations.",
      "sources": [
        [
          "PEN",
          "368",
          "PC § 368(d)(1), (k)-(l)"
        ]
      ]
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "368",
          "label": "PC § 368(d)(1), (k)-(l)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "368(d)(2)",
    "name": "Elder/dependent adult theft or fraud — noncaretaker, $950 or less",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC § 368(d)(2)",
      "law": "PEN",
      "source": "368",
      "note": "For property or identifying information valued at $950 or less, subdivision (d)(2) is a misdemeanor punishable by up to one year in county jail."
    },
    "probation": {
      "order": 10,
      "status": "Eligible",
      "term": "Generally up to 1 year",
      "terms": [
        "The court may require appropriate counseling as a condition of probation under PC § 368(k).",
        "The sentencing court must consider a no-contact restraining order protecting the victim, potentially for up to 10 years."
      ],
      "note": "PC § 368(k)-(l) supplies offense-specific probation/sentencing considerations.",
      "sources": [
        [
          "PEN",
          "368",
          "PC § 368(d)(2), (k)-(l)"
        ]
      ]
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "368",
          "label": "PC § 368(d)(2), (k)-(l)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "368(e)(1)",
    "name": "Elder/dependent adult theft or fraud — caretaker, over $950",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC § 368(e)(1)",
      "law": "PEN",
      "source": "368",
      "note": "For a caretaker and property or identifying information valued over $950, subdivision (e)(1) is a wobbler with a misdemeanor alternative of up to one year in county jail."
    },
    "probation": {
      "order": 11,
      "status": "Eligible",
      "term": "Generally up to 1 year if misdemeanor probation is granted",
      "terms": [
        "The court may require appropriate counseling as a condition of probation under PC § 368(k).",
        "The sentencing court must consider a no-contact restraining order protecting the victim, potentially for up to 10 years."
      ],
      "note": "PC § 368(k)-(l) supplies offense-specific probation/sentencing considerations.",
      "sources": [
        [
          "PEN",
          "368",
          "PC § 368(e)(1), (k)-(l)"
        ]
      ]
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "368",
          "label": "PC § 368(e)(1), (k)-(l)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "368(e)(2)",
    "name": "Elder/dependent adult theft or fraud — caretaker, $950 or less",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC § 368(e)(2)",
      "law": "PEN",
      "source": "368",
      "note": "For a caretaker and property or identifying information valued at $950 or less, subdivision (e)(2) is a misdemeanor punishable by up to one year in county jail."
    },
    "probation": {
      "order": 12,
      "status": "Eligible",
      "term": "Generally up to 1 year",
      "terms": [
        "The court may require appropriate counseling as a condition of probation under PC § 368(k).",
        "The sentencing court must consider a no-contact restraining order protecting the victim, potentially for up to 10 years."
      ],
      "note": "PC § 368(k)-(l) supplies offense-specific probation/sentencing considerations.",
      "sources": [
        [
          "PEN",
          "368",
          "PC § 368(e)(2), (k)-(l)"
        ]
      ]
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "368",
          "label": "PC § 368(e)(2), (k)-(l)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "508",
    "name": "Embezzlement by clerk, agent, or servant",
    "misdemeanorExposure": {
      "jail": "Varies",
      "basis": "PC §§ 508, 514, 489 & 490",
      "law": "PEN",
      "source": "508",
      "note": "PC § 514 punishes embezzlement according to the value or kind of property embezzled. Ordinary petty-theft-level conduct is punishable by up to six months; ordinary grand-theft-level conduct may be punished as a misdemeanor by up to one year, subject to special property categories and other statutes."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "508",
          "label": "PC § 508"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "514",
          "label": "PC § 514"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "489",
          "label": "PC § 489"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "490",
          "label": "PC § 490"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "452(a)",
    "name": "Recklessly causing fire — great bodily injury",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC § 452(a)",
      "law": "PEN",
      "source": "452",
      "note": "A wobbler. The misdemeanor alternative is county jail not exceeding one year; felony punishment is two, four, or six years."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "452",
          "label": "PC § 452(a)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "452(b)",
    "name": "Recklessly causing fire — inhabited structure or property",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC § 452(b)",
      "law": "PEN",
      "source": "452",
      "note": "A wobbler. The misdemeanor alternative is county jail not exceeding one year; felony punishment is two, three, or four years."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "452",
          "label": "PC § 452(b)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "452(c)",
    "name": "Recklessly causing fire — structure or forest land",
    "misdemeanorExposure": {
      "jail": "6 months",
      "basis": "PC § 452(c)",
      "law": "PEN",
      "source": "452",
      "note": "A wobbler. The misdemeanor alternative is county jail not exceeding six months; felony punishment is 16 months, two years, or three years."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "452",
          "label": "PC § 452(c)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "602(m)",
    "name": "Trespass — entering and occupying property",
    "misdemeanorExposure": {
      "jail": "6 months",
      "basis": "PC §§ 602(m) & 19",
      "law": "PEN",
      "source": "602",
      "note": "PC § 602(m) is a misdemeanor form of trespass. Because no separate jail term is specified for subdivision (m), PC § 19 supplies the general six-month misdemeanor maximum."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "602",
          "label": "PC § 602(m)"
        },
        {
          "type": "statute",
          "law": "PEN",
          "section": "19",
          "label": "PC § 19"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "502(c)(7)",
    "name": "Unauthorized computer access",
    "misdemeanorExposure": {
      "jail": "Varies",
      "basis": "PC § 502(d)(3)",
      "law": "PEN",
      "source": "502",
      "note": "A first violation with no injury is an infraction. A violation involving victim expenditure not greater than $5,000, or a second/subsequent violation, may be a misdemeanor with up to one year in county jail. Victim expenditure over $5,000 can make the offense a wobbler, still with a misdemeanor alternative up to one year."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "502",
          "label": "PC § 502(c)(7), (d)(3)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "243.25",
    "name": "Battery on elder or dependent adult",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC § 243.25",
      "law": "PEN",
      "source": "243.25",
      "note": "Battery on an elder or dependent adult, with the required knowledge of the victim's status, is punishable by up to one year in county jail."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "243.25",
          "label": "PC § 243.25"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "587(b)",
    "name": "Placing obstruction on railroad track",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC § 587(b)",
      "law": "PEN",
      "source": "587",
      "note": "A wobbler punishable by up to one year in county jail or by felony imprisonment under PC § 1170(h)."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "587",
          "label": "PC § 587(b)"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  },
  {
    "code": "PC",
    "section": "22210",
    "name": "Possession / manufacture / transfer of billy, blackjack, sap, or similar weapon",
    "misdemeanorExposure": {
      "jail": "1 year",
      "basis": "PC § 22210",
      "law": "PEN",
      "source": "22210",
      "note": "A wobbler punishable by up to one year in county jail or by felony imprisonment under PC § 1170(h), subject to statutory exceptions."
    },
    "metadata": {
      "provenance": "Added to Reference Desk after statute review",
      "authorities": [
        {
          "type": "statute",
          "law": "PEN",
          "section": "22210",
          "label": "PC § 22210"
        }
      ],
      "verification": {
        "status": "verified against current California statutory text",
        "checkedThrough": "2026-10-02"
      }
    }
  }
];
