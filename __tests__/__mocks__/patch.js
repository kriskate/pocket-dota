export default {
  "7.07b": {
    "version_date": "2017-11-05",
    "changes_short": [
      "Nerfed <img src=\"heroes/antimage\"> <img src=\"heroes/beastmaster\"> <img src=\"heroes/dark_willow\"> <img src=\"heroes/kunkka\"> <img src=\"heroes/spirit_breaker\"> <img src=\"heroes/sven\"> <img src=\"heroes/vengefulspirit\">",
      "Buffed <img src=\"heroes/lone_druid\"> <img src=\"heroes/morphling\"> <img src=\"heroes/pangolier\"> <img src=\"heroes/templar_assassin\"> <img src=\"heroes/tiny\"> <img src=\"heroes/visage\">"
    ],
    "heroes": [
      {
        "name": "antimage",
        "stats": [
          "Strength gain reduced from 1.5 to 1.3",
          "Base Intelligence reduced from 15 to 12"
        ],
        "abilities": [
          {
            "name": "antimage_spell_shield",
            "description": [
              "Spell Shield reduced from 26/34/42/50% to 20/30/40/50%"
            ]
          }
        ],
        "talents": [
          "Level 15 Talent changed from Blink Uncontrollable Illusion to +15 Agility",
          "Level 20 Talent changed from +10 All Stats to Blink Uncontrollable Illusion",
          "Level 25 Talent reduced from +30% Spell Shield to +25%",
          "Illusion talent incoming damage increased from 250% to 300%",
          "Fixed the illusion talent being able to be placed inside of your hero"
        ]
      },
      {
        "name": "bane",
        "stats": [],
        "abilities": [],
        "talents": [
          "Level 10 Talent changed from Enfeeble Steals Damage to +100 Cast Range",
          "Level 15 Talent changed from +150 Cast Range to Enfeeble Steals Damage"
        ]
      },
      {
        "name": "beastmaster",
        "stats": [],
        "abilities": [
          {
            "name": "beastmaster_wild_axes",
            "description": [
              "Wild Axes manacost increased from 60/65/70/75 to 80"
            ]
          },
          {
            "name": "beastmaster_call_of_the_wild",
            "description": [
              "Boar damage reduced from 20/30/40/50 to 16/24/32/40"
            ]
          }
        ],
        "talents": [
          "Level 20 Talent reduced from +120 Wild Axes Damage to +100"
        ]
      },
      {
        "name": "dark_willow",
        "stats": [],
        "abilities": [
          {
            "name": "dark_willow_bramble_maze",
            "description": [
              "Bramble maze now does its damage over time (on 0.5 second intervals)"
            ]
          },
          {
            "name": "dark_willow_bedlam",
            "description": [
              "Bedlam cooldown rescaled from 20 to 40/30/20",
              "Bedlam damage reduced from 75/150/225 to 60/140/220"
            ]
          },
          {
            "name": "dark_willow_cursed_crown",
            "description": [
              "Cursed Crown cast range reduced from 800 to 600"
            ]
          }
        ],
        "talents": []
      },
      {
        "name": "dragon_knight",
        "stats": [],
        "abilities": [],
        "talents": [
          "Level 15 Talent changed from +40% XP Gain to +35 Damage"
        ]
      },
      {
        "name": "drow_ranger",
        "stats": [],
        "abilities": [
          {
            "name": "drow_ranger_trueshot",
            "description": [
              "Precision Aura reduced from 20/26/32/38% to 16/22/28/34%"
            ]
          }
        ],
        "talents": [
          "Level 20 Talent increased from +1.5s Gust Duration to +2s"
        ]
      },
      {
        "name": "lone_druid",
        "stats": [],
        "abilities": [
          {
            "name": "lone_druid_spirit_bear",
            "description": [
              "Spirit Bear HP regen increased from 2/3/4/5 to 4/5/6/7"
            ]
          }
        ],
        "talents": []
      },
      {
        "name": "medusa",
        "stats": [
          "Strength gain reduced from 1.95 to 1.5"
        ],
        "abilities": [
          {
            "name": "medusa_split_shot",
            "description": [
              "Split Shot damage from 35/50/65/80% to 30/45/60/75%"
            ]
          }
        ],
        "talents": [
          "Level 10 Talent increased from 10% Evasion to +12%",
          "Level 15 Talent increased from 10% Mystic Snake Mana Steal to +15%",
          "Level 20 Talent increased from +2s Stone Gaze Duration to +2.5s"
        ]
      },
      {
        "name": "mirana",
        "stats": [
          "Agility from 20 + 3.6 to 18 + 3.2"
        ],
        "abilities": [],
        "talents": []
      },
      {
        "name": "morphling",
        "stats": [
          "Restored in Captain's Mode"
        ],
        "abilities": [
          {
            "name": "morphling_adaptive_strike_agi",
            "description": [
              "Adaptive Strike (Agility) min damage multiplier increased from 0.25 to 0.5",
              "Adaptive Strike (Agility) max damage multiplier increased from 0.5/1.0/1.5/2.0 to 1.0/1.5/2.0/2.5"
            ]
          },
          {
            "name": "morphling_adaptive_strike_str",
            "description": [
              "Adaptive Strike (Strength) min stun increased from 0.25 to 0.5"
            ]
          },
          {
            "name": "morphling_morph_agi",
            "description": [
              "Attribute Shift Bonus Agility increased from 3/4/5/6 to 4/5/6/7"
            ]
          },
          {
            "name": "morphling_morph_str",
            "description": [
              "Attribute Shift Bonus Strength increased from 3/4/5/6 to 4/5/6/7"
            ]
          }
        ],
        "talents": [
          "Level 10 Talent changed from +20 Movement Speed to +300 Waveform Range",
          "Level 25 Talent changed from +800 Waveform Range to 2 Waveform Charges"
        ]
      },
      {
        "name": "kunkka",
        "stats": [],
        "abilities": [],
        "talents": [
          "Level 25 Talent reduced from 4 Ghost Ships to 3"
        ]
      },
      {
        "name": "pangolier",
        "stats": [],
        "abilities": [
          {
            "name": "pangolier_swashbuckle",
            "description": [
              "Swashbuckle now changes your attack damage to 24/42/60/78 rather than just dealing physical damage as an independent nuke (this means the listed amount can now proc for lifesteal, crit, etc)",
              "Fixed Swashbuckle attacks not affecting Spell Immune units"
            ]
          },
          {
            "name": "pangolier_shield_crash",
            "description": [
              "Shield Crash damage reduction increased from 8/10/12/14 to 9/12/15/18%",
              "Shield Crash now causes you to move forward 225 units (can traverse terrain with it)"
            ]
          },
          {
            "name": "pangolier_gyroshell",
            "description": [
              "Rolling Thunder now has a 1.2s cast time rather than a 1.2s channel period",
              "Rolling Thunder turn rate increased from 105/110/115 to 120",
              "Rolling Thunder speed increased from 550/575/600 to 600",
              "Rolling Thunder speed is now fixed",
              "Rolling Thunder damage increased from 200/250/300 to 200/275/350"
            ]
          }
        ],
        "talents": [
          "Level 25 Talent increased from -12s Rolling Thunder to -16s"
        ]
      },
      {
        "name": "riki",
        "stats": [
          "Base agility reduced from 34 to 30"
        ],
        "abilities": [],
        "talents": [
          "Level 15 Talent increased from -4s Smokescreen Cooldown to -5s"
        ]
      },
      {
        "name": "spirit_breaker",
        "stats": [],
        "abilities": [
          {
            "name": "spirit_breaker_nether_strike",
            "description": [
              "Nether Strike cooldown rescaled from 80/70/60 to 100/80/60"
            ]
          }
        ],
        "talents": []
      },
      {
        "name": "sven",
        "stats": [],
        "abilities": [
          {
            "name": "sven_gods_strength",
            "description": [
              "God's Strength reduced from 12/24/36 to 10/20/30"
            ]
          }
        ],
        "talents": [
          "Level 25 Talent increased from -8s Stormhammer Cooldown to -9s"
        ]
      },
      {
        "name": "templar_assassin",
        "stats": [],
        "abilities": [
          {
            "name": "templar_assassin_psionic_trap",
            "description": [
              "Psionic Traps bonus damage increased from 100/125/150 to 175/250/325"
            ]
          }
        ],
        "talents": [
          "Level 10 Talent increased from +200 Health to +250"
        ]
      },
      {
        "name": "tiny",
        "stats": [
          "Base strength increased by 4"
        ],
        "abilities": [
          {
            "name": "tiny_craggy_exterior",
            "description": [
              "Tree Grab cooldown from 40/32/24/16 to 15",
              "Tree Grab splash damage from 70% to 100%",
              "Tree Grab unit bonus damage increased from 25% to 30%",
              "Tree Grab attack count increased from 2/3/4/5 to 2/3/4/6"
            ]
          },
          {
            "name": "tiny_grow",
            "description": [
              "Grow attack speed reduction rescaled from -30 to -20/25/30"
            ]
          },
          {
            "name": "tiny_toss",
            "description": [
              "Tossed unit bonus damage increased from 20% to 30%"
            ]
          }
        ],
        "talents": [
          "Level 10 Talent increased from +25 Damage to +30",
          "Level 10 Talent increased from +15% Magic Resistance to +20%"
        ]
      },
      {
        "name": "vengefulspirit",
        "stats": [
          "Base damage reduced by 3"
        ],
        "abilities": [
          {
            "name": "vengefulspirit_command_aura",
            "description": [
              "Allied Death Illusion duration reduced from 7 to 6"
            ]
          }
        ],
        "talents": []
      },
      {
        "name": "visage",
        "stats": [],
        "abilities": [
          {
            "name": "visage_summon_familiars",
            "description": [
              "Familiar attack damage increased from 25/40/55 to 30/45/60"
            ]
          }
        ],
        "talents": []
      }
    ],
    "items": [
      {
        "name": "item_aeon_disk",
        "description": [
          "Recipe cost reduced from 1750 to 1675"
        ]
      },
      {
        "name": "item_mask_of_madness",
        "description": [
          "Armor reduction increased from 6 to 7"
        ]
      },
      {
        "name": "item_bfury",
        "description": [
          "Battle Fury damage reduced from 50 to 45"
        ]
      },
      {
        "name": "item_meteor_hammer",
        "description": [
          "DPS reduced from 60/115 to 50/90 (building/units)",
          "Now deals 75/150 impact damage (buildings/units)"
        ]
      }
    ],
    "general": [
      {
        "name": "General",
        "description": "Backdoor Protection damage reduction increased from 25% to 40%"
      }
    ]
  },
}