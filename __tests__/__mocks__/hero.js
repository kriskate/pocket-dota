export default {
  "tag": "pugna",
  "name": "Pugna",
  "bio": "In the realm of Pugna's birth, near the vents of the Nether Reaches, there stood a lamasery devoted to the Arts of Oblivion, which drew its power from the nether energies. The Grandmaster of the temple compound had himself passed into Oblivion several years prior, leaving his academy without a leader. From the moment of their master's death, the regents of the temple began rites of divination to identify their master's reincarnation, and eventually all signs converged on the immediate neighborhood. Several villages squatted in the shadow of the temple, their alleys and plazas full of the laughter of squalling children.  Pugna, a mere thirteen months of age, was but one candidate among the local brats, and on the appointed day he was presented at the temple alongside two other promising tots. The lamas offered a jumble of worn relics to the children, treasured possessions of their former grandmaster. One boy reached for a porphyry wand that had belonged to the lama...and put it in his nostril. An impish girl pulled out an amulet that had also been the lama's, and immediately swallowed it. Pugna regarded the other two coolly, gave a merry laugh, and blasted them with gouts of emerald flame, reducing them to ashes in an instant. He then snatched up the wand and amulet, saying 'Mine!' The regents hoisted the beaming Pugna on their shoulders, wrapped him in their grandmaster's vestments, and rushed him to the throne before his mood could change. Within five years, the temple itself was another pile of ash, which pleased Pugna to no end.",
  "hype": "A crafty trickster, Pugna turns the enemy's power against itself as he blasts their defenses. While his nether ward strikes nearby foes that dare to cast a spell, he drains life from enemies to ensure he will be ready for the next assault.",
  "item_builds": {
    "DOTA_Item_Build_Starting_Items": [
      "item_branches",
      "item_branches",
      "item_enchanted_mango",
      "item_tango",
      "item_flask"
    ],
    "DOTA_Item_Build_Starting_Items_Secondary": [],
    "DOTA_Item_Build_Early_Game": [
      "item_magic_stick",
      "item_boots"
    ],
    "DOTA_Item_Build_Early_Game_Secondary": [],
    "DOTA_Item_Build_Core_Items": [],
    "DOTA_Item_Build_Core_Items_Secondary": [],
    "DOTA_Item_Build_Mid_Items": [
      "item_magic_wand",
      "item_arcane_boots",
      "item_aether_lens"
    ],
    "DOTA_Item_Build_Late_Items": [
      "item_kaya",
      "item_ultimate_scepter",
      "item_black_king_bar"
    ],
    "DOTA_Item_Build_Other_Items": [
      "item_guardian_greaves",
      "item_rod_of_atos",
      "item_sheepstick",
      "item_shivas_guard",
      "item_dagon_5",
      "item_ancient_janggo",
      "item_veil_of_discord",
      "item_force_staff",
      "item_cyclone",
      "item_glimmer_cape",
      "item_octarine_core",
      "item_sphere",
      "item_invis_sword",
      "item_ghost",
      "item_lotus_orb",
      "item_heart",
      "item_urn_of_shadows",
      "item_hand_of_midas"
    ],
    "DOTA_Item_Build_Luxury": []
  },
  "abilities": [
    {
      "tag": "pugna_nether_blast",
      "name": "Nether Blast",
      "affects": " ABILITY: Point Target, AOE<br /> DAMAGE TYPE: <font color=\"#3498db\">Magical</font><br /> PIERCES SPELL IMMUNITY: <font color=\"#e74c3c\">No</font><br /> ",
      "description": " An exploding pulse deals damage to enemies and structures in the area. Deals half damage to structures.<br/><br/> ",
      "notes": "Damage is delayed by 0.9 seconds.",
      "attrib": "RADIUS: <font color=\"#bdc3c7\">400,400,400,400</font><br/>BLAST DELAY: <font color=\"#bdc3c7\">0.9,0.9,0.9,0.9</font><br/>BLAST DAMAGE: <font color=\"#bdc3c7\">100,175,250,325</font>",
      "cooldown": "5",
      "manacost": "85 105 125 145",
      "lore": "The Arts of Oblivion include a deafening blast of emerald flames from the Nether Reaches."
    },
    {
      "tag": "pugna_decrepify",
      "name": "Decrepify",
      "affects": " ABILITY: Unit Target<br /> PIERCES SPELL IMMUNITY: <font color=\"#e74c3c\">No</font><br /> DISPELLABLE: Yes ",
      "description": " A powerful banishing spell that slows a unit and renders it unable to attack or be attacked. Afflicted units take extra magic damage.<br/><br/> ",
      "notes": "Only magical and pure damage can affect a unit under the effects of Decrepify.<br/>Doesn't slow allied units.<br/>Can be used on your Nether Ward.",
      "attrib": "%ENEMY INCREASED MAGIC DAMAGE: <font color=\"#bdc3c7\">-30,-40,-50,-60</font><br/>%ALLY INCREASED MAGIC DAMAGE: <font color=\"#bdc3c7\">-25</font><br/>%ENEMY MOVE SLOW: <font color=\"#bdc3c7\">-30,-40,-50,-60</font><br/>DURATION: <font color=\"#bdc3c7\">3.5</font>",
      "cooldown": "15.0 12.0 9.0 6.0",
      "manacost": "60",
      "lore": "A now-mastered relic from his childhood, Pugna delights in banishing others into the Nether Realm, whether for good, evil, or simple enjoyment."
    },
    {
      "tag": "pugna_nether_ward",
      "name": "Nether Ward",
      "affects": " ABILITY: Point Target<br /> DAMAGE TYPE: <font color=\"#3498db\">Magical</font><br /> PIERCES SPELL IMMUNITY: <font color=\"#2ecc71\">Yes</font><br /> ",
      "description": " Pugna places a Nether Ward at the target location. The ward reduces the mana regeneration of nearby enemy heroes, and will fire at any enemy hero who casts a spell. Nether Ward deals damage equal to the damage multiplier times the mana spent by the enemy hero.<br/><br/> ",
      "notes": "Nether Ward deals damage before the actual spell is cast, so if the caster dies the spell will have no effect.<br/>Nether Ward can be decrepified.<br/>Nether Ward has 4 HP. Heroes attack it for 1 damage, while illusions and non-hero units deal 0.25 damage.",
      "attrib": "WARD ATTACK RANGE: <font color=\"#bdc3c7\">1600</font><br/>DAMAGE PER MANA: <font color=\"#bdc3c7\">1.25,1.5,1.75,2</font><br/>MANA REGEN REDUCTION: <font color=\"#bdc3c7\">0.25,0.5,0.75,1</font><br/>ATTACKS TO DESTROY: <font color=\"#bdc3c7\">4,4,4,4</font><br/>WARD DURATION: <font color=\"#bdc3c7\">30</font>",
      "cooldown": "35.0 35.0 35.0 35.0",
      "manacost": "80 80 80 80",
      "lore": "While at the lamasery for the Arts of Oblivion, Pugna learned to dominate his classmates with a simple ward charged with Nether magic."
    },
    {
      "tag": "pugna_life_drain",
      "name": "Life Drain",
      "affects": " ABILITY: Unit Target, Channeled<br /> AFFECTS: Units Heroes, Units Creeps<br /> DAMAGE TYPE: <font color=\"#3498db\">Magical</font><br /> PIERCES SPELL IMMUNITY: <font color=\"#2ecc71\">Yes</font><br /> DISPELLABLE: No ",
      "description": " CHANNELED - When cast on an enemy, Pugna drains health from the target enemy unit to heal himself and granting vision over the target. If Pugna has full HP, and the enemy target is a Hero, Life Drain will restore mana instead.\\n\\nWhen cast on an ally, Pugna will drain his own health into his ally.\\n\\nUpgradable by Aghanim's Scepter.<br/><br/> <font color=\"#3498db\">Aghanim's Scepter Upgrade: Removes cooldown.</font> ",
      "notes": "HP drained depends on the actual damage dealt.<br/>Illusions are destroyed on the first tick of damage.",
      "attrib": "DRAIN PER SECOND: <font color=\"#bdc3c7\">150,225,300</font><br/>CAST RANGE: <font color=\"#bdc3c7\">700</font><br/>MAX DURATION: <font color=\"#bdc3c7\">10</font>",
      "cooldown": "22.0 22.0 22.0",
      "manacost": "125 175 225",
      "lore": "Pugna has truly become more powerful than even the grandmaster of Oblivion.",
      "HasScepterUpgrade": "1"
    }
  ],
  "talents": [
    {
      "tag": "special_bonus_movement_speed_25",
      "name": "+25 Movement Speed",
      "position": "right"
    },
    {
      "tag": "special_bonus_hp_225",
      "name": "+225 Health",
      "position": "left"
    },
    {
      "tag": "special_bonus_unique_pugna_4",
      "name": "-1s Netherblast Cooldown",
      "position": "right"
    },
    {
      "tag": "special_bonus_unique_pugna_6",
      "name": "+3 Nether Ward Health",
      "position": "left"
    },
    {
      "tag": "special_bonus_unique_pugna_1",
      "name": "+25% Life Drain Heal",
      "position": "right"
    },
    {
      "tag": "special_bonus_unique_pugna_5",
      "name": "+2s Decrepify Duration",
      "position": "left"
    },
    {
      "tag": "special_bonus_unique_pugna_2",
      "name": "+200 Nether Blast Damage",
      "position": "right"
    },
    {
      "tag": "special_bonus_unique_pugna_3",
      "name": "+1.75 Netherward Damage Per Mana",
      "position": "left"
    }
  ],
  "attributes": {
    "AttributePrimary": "DOTA_ATTRIBUTE_INTELLECT",
    "AttributeBaseAgility": "16",
    "AttributeAgilityGain": "1.000000",
    "AttributeBaseStrength": "19",
    "AttributeStrengthGain": "1.800000",
    "AttributeBaseIntelligence": "24",
    "AttributeIntelligenceGain": "4.50000",
    "ArmorPhysical": "0",
    "MagicalResistance": "25",
    "StatusHealth": "200",
    "StatusHealthRegen": "1.5000",
    "StatusMana": "75",
    "StatusManaRegen": "0.9",
    "MovementSpeed": "335",
    "MovementTurnRate": "0.500000",
    "VisionDaytimeRange": "1800",
    "VisionNighttimeRange": "800",
    "AttackCapabilities": "DOTA_UNIT_CAP_RANGED_ATTACK",
    "AttackDamageMin": "19",
    "AttackDamageMax": "27",
    "AttackRate": "1.700000",
    "AttackAnimationPoint": "0.500000",
    "AttackAcquisitionRange": "800",
    "AttackRange": "630",
    "ProjectileSpeed": "900",
    "Role": "Nuker,Pusher",
    "Rolelevels": "2,2",
    "Complexity": "2",
    "Team": "Bad",
    "HeroID": "45"
  },
  "abilities_aghs": [],
  "abilities_special": [],
  "abilities_hidden": []
}