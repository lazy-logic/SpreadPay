# Moovon Website Refresh — extracted spec

Sources, in order of authority:

1. **`new-content.md`** — the text reference. It states explicitly that engineering
   should use it as the source for page copy, because the illustrations "may contain
   placeholder or distorted micro-copy".
2. **`Moovon_Website_Page_Illustrations_Engineer_Pack.docx`** — 10 page illustrations,
   for **layout and direction only**. The pack calls them "directional templates, not
   pixel-for-pixel instructions" and grants engineering autonomy to simplify, combine,
   reposition or improve, *provided the brand, customer journey and regulatory
   distinctions are preserved*.

Readable copies of all 10 illustrations are in `illustrations/`.

---

## Non-negotiables (stated as rules, not suggestions)

These are the constraints the pack says must survive any layout changes.

| # | Rule | Source |
|---|------|--------|
| R1 | Insurance is **provided and underwritten by participating insurers** licensed by the NIC. Moovon must not be presented as an insurer. | pack + text |
| R2 | Moovon **does not handle claims**. Policy/claim matters stay with the customer's insurer. | pack + text |
| R3 | Premium financing is provided **in partnership with licensed and regulated financial institutions** — not by Moovon alone. | pack + text |
| R4 | **The customer chooses the insurer.** Moovon must not recommend, rank or decide. No "recommended", "best", rankings or comparative claims. | pack + text |
| R5 | **Rates, fees and changing product parameters should not be unnecessarily hard-coded** into public marketing pages. | pack |
| R6 | Detailed **rates, fees, credit rules, reconciliation, settlement procedures and internal controls must not be published publicly** — Partner Sign In only. | text §06 |
| R7 | Real **API docs, credentials, endpoints and infrastructure stay authenticated**. Any endpoints shown in visuals are illustrative placeholders. | pack + text §10 |
| R8 | Core palette is **navy, red, white**. Do not introduce additional brand colours — **specifically no green** — except third-party brand marks, which keep their own colours. | pack + text |
| R9 | Mr. Moovon stays consistent as a character but **must not overcrowd every page**. | pack |
| R10 | A compact **"Follow Mr. Moovon"** social section used consistently across public pages. | pack + text |

**Site-wide regulatory footer** (verbatim intent):
> Moovon SpreadPay™ facilitates the premium-financing journey in partnership with licensed
> and regulated financial institutions. Insurance policies are provided and underwritten by
> participating insurance companies licensed by the National Insurance Commission of Ghana.
> Eligibility, product availability and applicable terms and conditions apply.

---

## Information architecture

Nav across the illustrations (varies slightly page to page):

`How It Works` · `Participating Partners` · `For Customers` · `For Partners` ·
`FAQs` · `News & Insights` · `About Moovon` · `Contact`
→ actions: `Partner Sign In`, and `Find a Partner` (customer) / `Become a Partner` (B2B)

| # | Page | Status today |
|---|------|--------------|
| 01 | Home | exists |
| 02 | How SpreadPay Works | exists |
| 03 | Find a Partner / Participating Partners | exists (`partners`) |
| 04 | For Customers | exists (`products`) |
| 05 | Partner with Moovon | exists (`for-partners`) |
| 06 | FAQs | exists |
| 07 | Contact / Mr. Moovon's HelpDesk | exists (`contact`) |
| 08 | What's Mooving? / News & Insights | **missing** |
| 09 | About Moovon | **missing** |
| 10 | Developers & Integrations | **missing** |

---

## Per-page content

### 01 — Home
- Hero: **Protect Your Journey.** / **Be SpreadPay Protected™.**
- Flexible premium financing for eligible motor insurance.
- Choose your preferred insurer from our participating insurance companies and ask for Moovon SpreadPay™.
- Primary CTA **Get SpreadPay** · secondary **How SpreadPay Works**
- Participating partner logos — clean, updateable; "Our participating network continues to grow…"
- Simple customer journey (6 steps, below)
- Core benefits: annual premium is paid / payments are spread · flexible options · simple digital journey · real support via Mr. Moovon's HelpDesk
- Follow Mr. Moovon

### 02 — How SpreadPay Works
- Hero: **One Annual Premium. Flexible Ways to Pay.**
- **The 6-step journey** (this is the canonical sequence):
  1. **Choose your insurance** — select an eligible motor policy from a participating insurer, broker or authorised agent
  2. **Ask for SpreadPay™** — tell your partner you'd like to use Moovon SpreadPay™
  3. **Complete your details** — application, identity and eligibility information
  4. **Pay your agreed deposit** — the applicable upfront amount in your arrangement
  5. **Your insurer activates/issues your policy** — provided and underwritten by the insurer
  6. **Make your agreed payments** — manage the remaining balance per agreed terms
- **Who Does What?** — Insurance Company (provides/underwrites) · Moovon SpreadPay™ (journey, account admin, payment experience) · Licensed & Regulated Financial Institution (provides/participates in the financing)
- Key line: *Your annual premium is paid. Your payments are spread.*

### 03 — Find a Partner
- Hero: **Find a Participating Insurance Partner.** / **The choice is yours.**
- Search + neutral, non-ranked partner cards; CTA per partner: *Ask for SpreadPay™* / *View Partner*
- Filters in the illustration: All · Private Motor · Commercial Motor · Fleet
- Growing network note + "Don't see your preferred insurer yet? Chat with Mr. Moovon's HelpDesk to check current SpreadPay availability."
- **R4 applies hard here** — no rankings or comparative language.

### 04 — For Customers
- Hero: **Keep Moving.** / Your annual premium is paid. Your payments are spread.
- Flexible ways to pay:
  - GH₵330–GH₵1,500 (**SpreadPay Essential™**) — deposit + spread over up to 3 months
  - **Minimum upfront from GH₵125** (customers may pay a larger deposit)
  - GH₵1,501–GH₵15,000 (**SpreadPay Flex™**) — up to 6 months, subject to terms
  - Larger eligible premiums (**SpreadPay Fixed™**) — structured arrangements, subject to terms
- Responsible payment: more upfront = less to spread · clear within the 4-week period and no late-payment penalty applies · charges may apply beyond it per agreement
- Know before you agree: deposit, fees, schedule and **total amount payable presented before agreeing**
- Choice: *Your insurer. Your policy. Your choice.* Moovon does not choose the insurer.

### 05 — Partner with Moovon
- Hero: **Let's Move Insurance Forward.**
- One Annual Premium. Flexible Customer Payments. Premium settled to the insurer following successful completion of the transaction, per the partnership arrangement.
- Who we work with: Insurance Companies · Brokers & Authorised Agents · Licensed & Regulated Financial Institutions
- Benefits: policy conversion · digital journey · partner support · secure portal · efficient processing and reporting
- **Operational detail lives behind Partner Sign In** (R6)

### 06 — FAQs
- Hero: **Questions? Mr. Moovon Can Help.**
- Categories: Getting Started · Using SpreadPay · Payments · Insurance · Security & Privacy · Help & Support
- 10 core questions listed in `new-content.md` §07
- Role clarity: Moovon does not handle claims (R2)

### 07 — Contact / Mr. Moovon's HelpDesk
- Hero: **Let's Keep Mooving.**
- Four routes: I'm a Customer → HelpDesk · I'm an Insurance Partner → Partner Support · I Want to Become a Partner → Partnerships · General Enquiries
- HelpDesk is **WhatsApp-first**; quick links My SpreadPay | Payments | Find a Partner | FAQs
- "Who should I contact?" routing table — SpreadPay/payments → Moovon; policy/claim → your insurer

### 08 — What's Mooving? (new)
- Hero: **What's Mooving?** — clean, Mr. Moovon only, no floating logos or news cards in the hero
- Streams: Featured Story · Latest from Moovon & Our Partners · Around the Industry · Latest from Mr. Moovon
- Industry items must show **source + date and link out** rather than reproduce articles

### 09 — About Moovon (new)
- Hero: **Moving Ghana Forward.** / **Built in Ghana. Built for Africa.**
- Why we exist · What Moovon does (the 4-party ecosystem) · Mission & Vision · Growth (Ghana → West Africa → Africa)
- Values in the illustration: Customer First · Integrity · Innovation · Partnership · Excellence

### 10 — Developers & Integrations (new)
- Hero: **Build with Moovon.**
- Public page shows **high-level capabilities only** + Request Developer Access / Developer Sign In
- Everything real (API reference, auth, credentials, webhooks, schemas, error codes, rate limits, settlement logic) is **authenticated-only** (R7)

---

## Conflicts with the site as currently built

Ordered by risk. These are contradictions, not preferences.

| Area | Live now | Pack requires |
|------|----------|---------------|
| **Who finances** | "Moovon remits 100% of the annual premium upfront", "We pay the full premium" — Moovon as the financier | Financing provided **in partnership with licensed and regulated financial institutions** (R3) |
| **Published credit terms** | Public: 3.5%/month on original financed amount, 4% after Month 3, GH₵50 flat penalty, GH₵900 facility fee, 2% setup, 40% deposit, RM approval above GH₵50,000 financed | Rates/fees/credit rules **not published publicly** (R5, R6) |
| **Operations guide** | `for-partners` publishes the full settlement/underwriting guide, labelled "Confidential" | Behind **Partner Sign In** (R6) |
| **Minimum upfront** | GH₵100 | **GH₵125** for Essential |
| **Journey length** | 4-step (home + how-it-works) and 5-step operational | **6 steps**, ending "Make your agreed payments" |
| **Partner neutrality** | Cards carry "Ghana's Leading Motor Insurer", "Solid Protection & Fleet Financing" etc. | **No comparative or promotional claims** (R4) |
| **Green** | WhatsApp green used for buttons, status dots, the chat widget | Navy/red/white only; green only as a third-party mark (R8) |
| **Primary CTA** | "Find a Participating Partner" | **Get SpreadPay** |
| **Missing pages** | — | About Moovon, What's Mooving?, Developers |
| **Fixed tier** | Publishes GH₵15,001–50,000+ with full fee breakdown | "Eligible larger premiums… structured arrangements, subject to terms" |

---

## Notes

- The 6-step journey supersedes both the 4-step homepage flow and the 5-step operational
  grid. Step 5 ("your insurer activates/issues the policy") is the one currently missing —
  and it is the step that carries R1.
- `new-content.md` wins over the illustrations wherever they disagree, by its own instruction.
- The illustrations show a footer with Customers / Partners / Company / Legal columns plus
  the NIC regulatory strip — richer than the current footer.
