export interface TextItem {
  id: number
  content: string
  clickable: boolean
  isFraud: boolean
}

export const gameTexts: TextItem[] = [
  {
    id: 1,
    content: "Welcome to our comprehensive guide on digital security and fraud prevention.",
    clickable: false,
    isFraud: false
  },
  {
    id: 2,
    content: "In today's interconnected world, it's essential to understand the various threats that exist online.",
    clickable: false,
    isFraud: false
  },
  {
    id: 3,
    content: "Recently, I received an email from a Nigerian prince who needs my help transferring $10 million dollars to the United States.",
    clickable: true,
    isFraud: true
  },
  {
    id: 4,
    content: "This type of scam, known as advance fee fraud, has been around for decades and continues to target unsuspecting individuals.",
    clickable: true,
    isFraud: false
  },
  {
    id: 5,
    content: "The perpetrators often pose as wealthy individuals, government officials, or lottery organizations.",
    clickable: true,
    isFraud: false
  },
  {
    id: 6,
    content: "Another common tactic involves urgent messages claiming that your bank account has been compromised and requesting immediate verification of your login credentials.",
    clickable: true,
    isFraud: true
  },
  {
    id: 7,
    content: "Legitimate banks and financial institutions will never ask for sensitive information via email or text messages.",
    clickable: true,
    isFraud: false
  },
  {
    id: 8,
    content: "They have secure channels for communication and verification processes.",
    clickable: false,
    isFraud: false
  },
  {
    id: 9,
    content: "Yesterday, while browsing social media, I saw an advertisement promising a free iPhone 15 Pro Max with just one click - no strings attached!",
    clickable: true,
    isFraud: true
  },
  {
    id: 10,
    content: "These 'free' offers are rarely genuine and often lead to data harvesting or subscription traps.",
    clickable: true,
    isFraud: false
  },
  {
    id: 11,
    content: "When something seems too good to be true, it usually is.",
    clickable: true,
    isFraud: false
  },
  {
    id: 12,
    content: "Phishing emails have become increasingly sophisticated, mimicking the design and language of legitimate companies.",
    clickable: true,
    isFraud: false
  },
  {
    id: 13,
    content: "They often create a sense of urgency to pressure recipients into quick action.",
    clickable: true,
    isFraud: false
  },
  {
    id: 14,
    content: "I was told that my PayPal account would be suspended immediately unless I verify my information by clicking on a provided link.",
    clickable: true,
    isFraud: true
  },
  {
    id: 15,
    content: "Always verify such claims by logging into your account directly through the official website rather than clicking links in emails.",
    clickable: true,
    isFraud: false
  },
  {
    id: 16,
    content: "Check the sender's email address carefully for any irregularities.",
    clickable: true,
    isFraud: false
  },
  {
    id: 17,
    content: "Lottery scams are another prevalent form of fraud.",
    clickable: false,
    isFraud: false
  },
  {
    id: 18,
    content: "Victims are informed they've won a substantial prize in a lottery they never entered.",
    clickable: true,
    isFraud: false
  },
  {
    id: 19,
    content: "Congratulations! You've won $50,000 in the International Email Lottery! Simply pay a processing fee of $500 to claim your winnings.",
    clickable: true,
    isFraud: true
  },
  {
    id: 20,
    content: "Legitimate lotteries do not require upfront payments to claim winnings.",
    clickable: true,
    isFraud: false
  },
  {
    id: 21,
    content: "This is a clear red flag that should alert anyone to the fraudulent nature of such communications.",
    clickable: true,
    isFraud: false
  },
  {
    id: 22,
    content: "Online shopping scams have also increased significantly, especially on social media platforms and fake e-commerce websites.",
    clickable: true,
    isFraud: false
  },
  {
    id: 23,
    content: "Scammers create professional-looking sites to steal payment information.",
    clickable: true,
    isFraud: false
  },
  {
    id: 24,
    content: "Romance scams target individuals seeking companionship online.",
    clickable: true,
    isFraud: false
  },
  {
    id: 25,
    content: "Scammers create fake profiles and build emotional relationships before requesting money for emergencies or travel expenses.",
    clickable: true,
    isFraud: false
  },
  {
    id: 26,
    content: "My grandmother fell victim to a phone scam where someone claimed to be her grandson in jail, needing bail money urgently.",
    clickable: true,
    isFraud: true
  },
  {
    id: 27,
    content: "These emergency scams prey on people's emotions and desire to help loved ones.",
    clickable: true,
    isFraud: false
  },
  {
    id: 28,
    content: "Always verify such claims by contacting the person directly through known phone numbers.",
    clickable: true,
    isFraud: false
  },
  {
    id: 29,
    content: "Technology support scams involve cold calls claiming there are issues with your computer or software that need immediate attention.",
    clickable: true,
    isFraud: false
  },
  {
    id: 30,
    content: "The caller often requests remote access to your device.",
    clickable: true,
    isFraud: false
  },
  {
    id: 31,
    content: "A representative from Microsoft called me saying my computer was infected with viruses and offered to fix it remotely for a fee.",
    clickable: true,
    isFraud: true
  },
  {
    id: 32,
    content: "Microsoft and other major tech companies do not make unsolicited calls about computer problems.",
    clickable: true,
    isFraud: false
  },
  {
    id: 33,
    content: "Such calls are always scams designed to gain access to your system or steal money.",
    clickable: true,
    isFraud: false
  },
  {
    id: 34,
    content: "Investment scams promise unrealistic returns with little to no risk.",
    clickable: true,
    isFraud: false
  },
  {
    id: 35,
    content: "They often use terms like 'guaranteed profits' or 'exclusive opportunities' to attract victims.",
    clickable: true,
    isFraud: false
  },
  {
    id: 36,
    content: "I was offered an exclusive cryptocurrency investment opportunity with guaranteed 300% returns within 30 days by a financial advisor I met online.",
    clickable: true,
    isFraud: true
  },
  {
    id: 37,
    content: "Remember that all investments carry risk, and legitimate investment opportunities are properly regulated and do not guarantee unrealistic returns.",
    clickable: true,
    isFraud: false
  },
  {
    id: 38,
    content: "Social engineering attacks manipulate people into divulging confidential information.",
    clickable: true,
    isFraud: false
  },
  {
    id: 39,
    content: "These attacks rely on human psychology rather than technical vulnerabilities.",
    clickable: true,
    isFraud: false
  },
  {
    id: 40,
    content: "Education and awareness are the best defenses against fraud.",
    clickable: false,
    isFraud: false
  },
  {
    id: 41,
    content: "Stay informed about new scam tactics, trust your instincts, and always verify suspicious communications through official channels.",
    clickable: true,
    isFraud: false
  },
  {
    id: 42,
    content: "The local police department called asking for a donation to support officers' families, requesting immediate payment via gift cards.",
    clickable: true,
    isFraud: true
  },
  {
    id: 43,
    content: "Legitimate charities and organizations do not request payments through gift cards or wire transfers.",
    clickable: true,
    isFraud: false
  },
  {
    id: 44,
    content: "These payment methods are preferred by scammers because they're difficult to trace and reverse.",
    clickable: true,
    isFraud: false
  },
  {
    id: 45,
    content: "By being vigilant and informed, you can protect yourself and others from falling victim to these increasingly sophisticated fraud schemes.",
    clickable: true,
    isFraud: false
  }
]
