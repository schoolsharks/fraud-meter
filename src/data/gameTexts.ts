export interface TextItem {
  id: number;
  content: string;
  clickable: boolean;
  isFraud: boolean;
  percentage?: number;
}

export const gameTexts: TextItem[] = [
  {
    id: 1,
    content: "Let me tell you a story about Ritika.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 2,
    content:
      "She was the kind of relationship manager every bank wanted on their team — sharp, observant, and someone who rarely took anything at face value.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 3,
    content:
      "At MetroBank, she'd seen her fair share of quirky clients: the ones who sent voice notes instead of emails, the ones who panicked over passbooks, even a guy who wanted his current account to come with 'festive cashback.'",
    clickable: false,
    isFraud: false,
  },
  {
    id: 4,
    content: "But Apex Exports? They were something else.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 5,
    content:
      "When they first came on board, they looked clean. A modest business trading in mobile accessories.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 6,
    content:
      "Nothing extravagant. Just a few small payments here and there. Ritika onboarded them without a second thought.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 7,
    content: "Then, one morning, her phone buzzed.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 8,
    content:
      "'Hey Ritika! Quick update — we've shuffled our directors and changed the authorized signatories. Fresh faces, fresh thinking, you know?' said Aryan Mehta, the young founder, with the kind of cheer that usually came with good coffee or great sales.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 9,
    content: "He didn't stop there.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 10,
    content:
      "'Also, we'd like to get started on a few trade transactions. Big ones, actually.'",
    clickable: false,
    isFraud: false,
  },
  {
    id: 11,
    content:
      "A sudden leadership change followed by a request for large trade deals?",
    clickable: true,
    isFraud: false,
  },
  {
    id: 12,
    content:
      "Unusual, yes. But companies evolve. She noted it but didn't jump to conclusions.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 13,
    content:
      "A few days later, Aryan was back — this time with a request for advance payment.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 14,
    content:
      "'We're importing used luxury cars from Europe. Exciting times!' he beamed.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 15,
    content: "'Accessories today, Audis tomorrow!'",
    clickable: false,
    isFraud: false,
  },
  {
    id: 16,
    content: "He was clearly pleased with the punchline. Ritika wasn't.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 17,
    content: "Mobile accessories to used cars?",
    clickable: true,
    isFraud: false,
  },
  {
    id: 18,
    content:
      "A sharp pivot, but not unheard of. Businesses do diversify — sometimes rapidly. Still, she asked for trade contracts and supplier details.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 19,
    content:
      "What she received was a one-page invoice and a vague explanation about a 'digital connection' with the supplier, who just happened to be based in a high-risk country.",
    clickable: true,
    isFraud: true,
    percentage:40
  },
  {
    id: 20,
    content:
      "That was the first time Ritika hesitated. Something didn't sit right.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 21,
    content: "She didn't process the payment.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 22,
    content: "Then, the transaction patterns changed.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 23,
    content:
      "Apex Exports started moving money through multiple bank accounts across different branches. The amounts were structured and small — never quite large enough to raise automatic alerts.",
    clickable: true,
    isFraud: true,
    percentage:30
  },
  {
    id: 24,
    content: "When she asked, Aryan brushed it off.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 25,
    content:
      "'Oh, our CA suggested it. Keeps things cleaner, apparently. And they're all our accounts!'",
    clickable: true,
    isFraud: true,
    percentage:23
  },
  {
    id: 26,
    content: "Again, not completely off. But now there was a pattern forming.",
    clickable: true,
    isFraud: false,
  },
  {
    id: 27,
    content: "Next came the invoices. Ritika took a closer look —",
    clickable: false,
    isFraud: false,
  },
  {
    id: 28,
    content:
      "they listed basic goods at abnormally high prices. Cleaning cloths. Spare cables. All priced like premium imports.",
    clickable: true,
    isFraud: true,
    percentage:19
  },
  {
    id: 29,
    content:
      "'We like to pay extra to avoid hassle,' Aryan joked. 'Premium peace of mind.'",
    clickable: true,
    isFraud: true,
    percentage:60
  },
  {
    id: 30,
    content: "She smiled politely. But inside, her instincts flared.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 31,
    content: "And then — the final piece.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 32,
    content:
      "Ritika spotted several inward payments from unrelated third parties, with no supporting documents.",
    clickable: true,
    isFraud: true,
    percentage:15
  },
  {
    id: 33,
    content:
      "'Oh, just old business friends helping us out. Global trade runs on trust!' Aryan explained, grinning.",
    clickable: true,
    isFraud: true,
    percentage:20
  },
  {
    id: 34,
    content: "That did it.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 35,
    content: "One or two oddities? Maybe. But this many?",
    clickable: false,
    isFraud: false,
  },
  {
    id: 36,
    content: "Ritika sat back and reviewed the full picture:",
    clickable: false,
    isFraud: false,
  },
  {
    id: 37,
    content: "• A sudden change in leadership.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 38,
    content: "• A shift in business activity that made little strategic sense.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 39,
    content: "• Vague trade documentation.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 40,
    content: "• Structured payments across multiple accounts.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 41,
    content: "• Over-invoiced goods.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 42,
    content: "• And unrelated third-party remittances.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 43,
    content:
      "Individually, they could be explained away. Together? They told a different story.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 44,
    content:
      "Ritika flagged the account and submitted a detailed report to the Compliance team.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 45,
    content:
      "A week later, the findings came in: a likely case of trade-based money laundering, potentially part of a broader network using small, clean-looking businesses as a front.",
    clickable: false,
    isFraud: false,
  },
  {
    id: 46,
    content: "Her gut had been right. Again.",
    clickable: false,
    isFraud: false,
  },
];
