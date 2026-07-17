/**
 * Lightweight content for the non-Forms chapters. Deliberately minimal — "some
 * content" to surf, dark and consistent, ready for fuller detail later. Each
 * route is a thin wrapper around <SectionPage data={sections.x} />, so adding
 * detail later means editing data here, not touching layout.
 */

export interface SectionPoint {
  tamil?: string;
  title: string;
  body: string;
  verify?: boolean;
}

export interface SectionContent {
  /** Matches the route slug, e.g. "powers" → /powers. */
  slug: string;
  num: string;
  eyebrow: string;
  tamil: string;
  title: string;
  lead: string;
  points: SectionPoint[];
  /** Optional belief/verify footnote. */
  note?: string;
}

export const sections: Record<string, SectionContent> = {
  powers: {
    slug: "powers",
    num: "03",
    eyebrow: "The Powers",
    tamil: "சக்திகள்",
    title: "Powers & Abilities",
    lead: "His powers are devotional attributes, not a fixed canon — held by those who keep his worship, and named here as devotees name them.",
    note: "Folk-deity attributes, per tradition.",
    points: [
      { tamil: "காவல்", title: "Guardianship", body: "Shields villages, homes and communities from evil spirits and negative energy — stationed where the wild meets the village." },
      { tamil: "நீதி", title: "Justice & Retribution", body: "Finds and punishes wrongdoers and senses deceit. It is said that crooks cannot escape him." },
      { tamil: "மந்திரம்", title: "Against Black Magic", body: "Invoked to lift curses and turn away the evil eye." },
      { tamil: "அருள்வாக்கு", title: "The Oracle's Voice", body: "Speaks through a chosen oracle in trance — Swami Aadudhal — to settle disputes and answer the faithful." },
      { tamil: "வரம்", title: "Boon-Granting", body: "Fulfils vows when honoured, repaying devotion with protection and grace." },
      { tamil: "வீரம்", title: "Strength & Valour", body: "Martial power and fearless force, symbolised by the aruval at his side." },
    ],
  },

  iconography: {
    slug: "iconography",
    num: "04",
    eyebrow: "Iconography",
    tamil: "சின்னங்கள்",
    title: "The Symbols He Bears",
    lead: "Every attribute he carries holds meaning. Read the guardian like a sentence written in fire and iron.",
    points: [
      { tamil: "அருவாள்", title: "The Aruval", body: "The curved sickle-sword — strength turned to justice. Sometimes hung with bells, sometimes a bow or spear." },
      { tamil: "கண்", title: "Fiery Eyes", body: "Wide, fierce and fiery-red — the unblinking vigilance of a guardian who never sleeps." },
      { tamil: "குடுமி", title: "The Warrior Bun", body: "Long hair tied in a side-bun — a Nayaka-era martial style." },
      { title: "Ash & Kumkum", body: "Thiruneeru, the sacred ash, and a red kumkum mark on the brow — the sign of sanctity." },
      { title: "Chains & Garlands", body: "Heavy chains, rings and flower garlands — power worn alongside devotion." },
      { title: "Horse & Hound", body: "A white horse and a lean hunting dog, the vettai naai — companions of the martial guardian.", verify: true },
    ],
  },

  worship: {
    slug: "worship",
    num: "05",
    eyebrow: "Worship",
    tamil: "வழிபாடு",
    title: "Rituals & the Oracle",
    lead: "His worship is folk and oral — non-Vedic, non-Agamic, kept by local hereditary lineages and sung rather than written.",
    points: [
      { title: "The Priesthood", body: "Non-Brahmin, hereditary local priests, outside the Vedic-Agamic order." },
      { title: "Folk Arts", body: "His history is performed: villu paattu, karakattam, koothu, and the oral ballads of the village." },
      { title: "Offerings", body: "Milk, ghee, camphor and cloves; in some traditions alcohol, cigars, and animal sacrifice. Handled here factually and with respect." },
      { tamil: "சாமி ஆடுதல்", title: "The Oracle", body: "He descends into a chosen oracle in trance — Swami Aadudhal — to speak, judge and bless." },
    ],
  },

  festivals: {
    slug: "festivals",
    num: "06",
    eyebrow: "Festivals",
    tamil: "திருவிழா",
    title: "The Annual Rite",
    lead: "Once a year the village turns inward — flag, fire, trance and procession — and the guardian walks among his people.",
    points: [
      { title: "Flag Hoisting", body: "The raising of the flag opens the festival and calls the god to the ground." },
      { title: "Three Days", body: "Typically three days, through which the villagers remain within the village.", verify: true },
      { title: "The Trance", body: "The oracle enters trance and the god speaks — disputes are settled, vows are heard." },
      { title: "Fire & Procession", body: "Theemithi fire-walking, aruval rites and night processions to the beat of the parai drum.", verify: true },
    ],
  },

  temples: {
    slug: "temples",
    num: "07",
    eyebrow: "Temples",
    tamil: "கோயில்கள்",
    title: "Shrines of the Guardian",
    lead: "From the hills near Madurai to shrines across the seas — an editorial atlas of principal places held in devotional memory.",
    points: [
      { title: "Azhagar Koil, Madurai", body: "Considered the original shrine — other temples are said to take their soil from here.", verify: true },
      { title: "Mettukulam, Coimbatore", body: "A temple dedicated solely to Karuppu." },
      { title: "Tiruverkadu, Chennai", body: "Honoured alongside Bhadrakali and Shiva." },
      { title: "Thirumalaiyam Palayam, Salem", body: "A regional shrine of the guardian." },
      { title: "Sabarimala", body: "Cited in popular sources as a guardian of the premises — to be confirmed.", verify: true },
    ],
  },

  diaspora: {
    slug: "diaspora",
    num: "08",
    eyebrow: "Diaspora",
    tamil: "புலம்பெயர்",
    title: "Karuppu Across the Seas",
    lead: "Carried across the kala pani — the dark waters — by Tamil migrants, the guardian took new names on far shores.",
    points: [
      { title: "Malaysia & Singapore", body: "Sangili Karuppan, bound in chains — among the most beloved of the diaspora forms." },
      { title: "Sri Lanka", body: "Worshipped alongside the island's Tamil folk deities." },
      { title: "The Indo-Caribbean", body: "Sanganie Baba and Dee Baba in Trinidad, Guyana, Suriname, Guadeloupe and Martinique." },
      { title: "Across the Oceans", body: "Honoured too in Mauritius, Réunion, Fiji, Seychelles and South Africa." },
    ],
  },

  gallery: {
    slug: "gallery",
    num: "09",
    eyebrow: "Gallery",
    tamil: "காட்சியகம்",
    title: "The Hall of Motion",
    lead: "A veiled hall of six forms, each shadow opening into its own room of identity, place and devotional memory.",
    points: [
      { title: "The Stills", body: "Consecrated portraits of each form, revealed only once you enter his sanctum." },
      { title: "The Motion", body: "Scroll-scrubbed reveals where each guardian performs his divine act — arriving with the motion baseline." },
      { title: "Enter a Fire", body: "Until then, descend the Threshold and step through a sigil to witness a god." },
    ],
  },

  about: {
    slug: "about",
    num: "10",
    eyebrow: "About",
    tamil: "பற்றி",
    title: "Sources & Disclaimer",
    lead: "A living faith, told with honesty — devotional belief kept distinct from scholarship, so the telling stays both faithful and true.",
    points: [
      { title: "Belief vs Fact", body: "BELIEF marks devotional tradition; VERIFY marks claims to confirm against primary or temple sources before publishing." },
      { title: "Sources", body: "Folk-religion scholarship and devotional accounts — the latter treated as belief where they reach beyond what scholarship can confirm." },
      { title: "Inspiration", body: "The cinematic concept draws on Anniyan (2005) and the 2026 film Karuppu — their gravitas, never their violence." },
      { title: "Still to Verify", body: "Temple coordinates, the 108 forms, the Sabarimala claim, festival spellings and the companion animals.", verify: true },
    ],
  },
};
