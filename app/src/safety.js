// Independent safety layer. Runs regardless of the persona/prompt. This is layer 2.

const CRISIS_PATTERNS = [
  /\b(kill myself|end my life|suicide|suicidal|want to die|don'?t want to live|self.?harm|hurt myself|cut myself)\b/i,
  /\b(marna chahta|mar jaun|jeena nahi|khudkushi|zindagi khatam)\b/i,
];

const BLOCKED_PATTERNS = [
  { tag: "appearance", re: /\b(my face|my body|my weight|how i look|fat|ugly|skin colou?r)\b/i },
  { tag: "regional",   re: /\b(bihar|madrasi|punjabi|gujju|south indian|regional|caste)\b/i },
  { tag: "religion",   re: /\b(hindu|muslim|christian|sikh|religion|god|allah|jesus|temple|mosque)\b/i },
  { tag: "sexual",     re: /\b(sex|bdsm|nude|dirty joke|innuendo)\b/i },
  { tag: "nofilter",   re: /\b(no filter|remove filter|no limits|unrestricted|say anything)\b/i },
];

export function isCrisis(text = "") {
  return CRISIS_PATTERNS.some((re) => re.test(text));
}

export function blockedRequest(text = "") {
  const hit = BLOCKED_PATTERNS.find((p) => p.re.test(text));
  return hit ? hit.tag : null;
}

export const CRISIS_RESPONSE =
  "Hey, I'm really glad you told me. I'm stepping out of the bit for a second. " +
  "You matter, and you're not alone in this. Please reach out to someone right now: " +
  "Tele-MANAS 14416, iCall 9152987821, or Vandrevala Foundation 1860-2662-345. " +
  "They're free, confidential, and there 24x7.";

export function refusal(personaName, tag) {
  const map = {
    appearance: "Arre, main teri shakal pe nahi, teri aadaton pe roast karti hoon. Chal, gym wapas aaya kya?",
    regional:   "Nope, wahan nahi jaate. Main sirf teri excuses ka roast karti hoon. Kaam kaha tak pahuncha?",
    religion:   "That's a hard no from me. I only roast your habits, not that. So... that to-do list?",
    sexual:     "Not my department. Main sirf tere procrastination ka masala banati hoon. Aage badho.",
    nofilter:   "No 'no-filter' mode here, dost. I go hard on your excuses, never past the line. Ab bata, kya tala aaj?",
  };
  return map[tag] || `${personaName}: I'll keep it to your habits. So, what did you dodge today?`;
}
