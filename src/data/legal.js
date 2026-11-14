// Legal page content: /disclaimer/, /privacy/, /terms/.
// Written to match what this website actually does. Have a lawyer / compliance professional
// review before relying on it, and update `updated` whenever you change a page.
//
// Each section: { h: heading, p: [paragraphs] } and/or { list: [bullet points] }.
import { SITE } from '../config/site';

const UPDATED = '14 November 2026';
const CONTACT_LINE = `${SITE.founder}, ${SITE.name}, Pune, Maharashtra, India · Phone / WhatsApp ${SITE.phoneDisplay}`;

export const LEGAL = {
  disclaimer: {
    title: 'Disclaimer & risk disclosure',
    description: 'Education only. Baste Global Markets is not registered with SEBI and does not give investment advice, tips or recommendations.',
    updated: UPDATED,
    intro:
      'Please read this page before using our website, joining a course or acting on anything you learn from us.',
    sections: [
      {
        h: 'We are not registered with SEBI',
        p: [
          `${SITE.name} and ${SITE.founder} are not registered with the Securities and Exchange Board of India (SEBI) as an Investment Adviser, Research Analyst, Portfolio Manager or in any other capacity.`,
        ],
      },
      {
        h: 'Education only — no advice',
        p: ['Everything on this website, in our courses, mentorship sessions, messages and materials is for educational purposes only. Specifically, we do not:'],
        list: [
          'give buy, sell or hold recommendations, “tips”, “calls”, signals, targets or stop-losses for you to follow;',
          'provide personalised investment advice or portfolio management;',
          'accept money to trade on your behalf, or ask for your trading-account login, password or OTP;',
          'promise, guarantee or imply any return or profit.',
        ],
      },
      {
        h: 'Trading involves a high risk of loss',
        p: [
          'Trading in forex, commodities and equity derivatives (futures & options) involves substantial risk and is not suitable for everyone. Leverage can magnify losses as well as gains, and you can lose more than you expect.',
          'SEBI studies of individual traders in the equity futures & options segment have found that about 9 in 10 of them incurred net losses. Only trade with money you can afford to lose, and consider speaking to a SEBI-registered Investment Adviser before making investment decisions.',
          'Any trades, charts, setups or results discussed in our courses are examples used to explain concepts. Past performance is not a guide to future results.',
        ],
      },
      {
        h: 'Forex trading rules for Indian residents',
        p: [
          'Indian residents may trade currency derivatives only on SEBI-recognised exchanges (such as NSE and BSE) and only in the currency pairs permitted there. Trading forex, CFDs or similar products through offshore or unauthorised online platforms is not permitted under the Foreign Exchange Management Act (FEMA). The Reserve Bank of India publishes an Alert List of unauthorised forex trading platforms.',
          'We do not promote, recommend or receive payment from any offshore or unauthorised trading platform.',
        ],
      },
      {
        h: 'Illustrations on this website',
        p: [
          'Charts, candles, option chains, price levels and market names shown on this website are illustrations of what we teach. They are not live or recent market data and are not recommendations.',
        ],
      },
      {
        h: 'Beware of impersonation',
        p: [
          `We only contact students from the number ${SITE.phoneDisplay}. We will never ask you to transfer money for “trading”, “profit sharing” or a “guaranteed return” scheme. If anyone does so using our name, please do not pay and report it to us and at cybercrime.gov.in (helpline 1930).`,
        ],
      },
      {
        h: 'Contact',
        p: [CONTACT_LINE],
      },
    ],
  },

  privacy: {
    title: 'Privacy policy',
    description: 'How Baste Global Markets handles personal data. The website has no forms, no accounts and sets no cookies.',
    updated: UPDATED,
    intro: `This policy explains what personal data ${SITE.name} handles and why. We have kept the website deliberately simple so that it collects as little as possible.`,
    sections: [
      {
        h: 'Who we are',
        p: [`${CONTACT_LINE}. We are responsible for the personal data described in this policy.`],
      },
      {
        h: 'What the website collects',
        p: [
          'This website has no sign-up, no contact forms and no user accounts, and it does not set cookies. We do not collect personal data through the website itself.',
          'Like every website, the server that hosts it may record technical logs (such as IP address, browser type and the pages requested) for security and reliability. These are kept by our hosting provider for a limited period and are not used to identify you.',
        ],
      },
      {
        h: 'When you contact us',
        p: [
          'If you message us on WhatsApp or call us, we receive the information you choose to share — for example your name, phone number, city, trading experience and your messages. We use it only to reply to your enquiry and, if you enrol, to run your course and mentorship.',
          'We do not sell your data, and we do not share it with anyone for marketing. WhatsApp is operated by Meta; its own privacy policy applies to messages sent through it.',
        ],
      },
      {
        h: 'Third-party services',
        list: [
          'Google Fonts — your browser downloads the website’s fonts from Google, which receives your IP address as part of that request.',
          'WhatsApp (Meta) — only when you choose to tap a WhatsApp button.',
          'Analytics — none at the moment. If we add a privacy-friendly analytics tool in future, we will update this policy first.',
        ],
      },
      {
        h: 'Installing the website as an app',
        p: [
          'If you install the website on your phone or computer, your browser stores copies of the site’s files on your device so it opens faster and works offline. These files contain no personal data, and you can remove them by uninstalling the app or clearing your browser’s site data.',
        ],
      },
      {
        h: 'How long we keep data',
        p: [
          'We keep enquiry messages and student details only for as long as needed to respond to you, run your course, and meet any legal or tax obligations. You can ask us to delete them at any time.',
        ],
      },
      {
        h: 'Your rights',
        p: [
          'Under India’s Digital Personal Data Protection Act, 2023 you can ask us to access, correct, update or erase your personal data, withdraw consent, and raise a grievance. Contact us using the details below and we will respond within a reasonable time. If you are not satisfied with our response, you may complain to the Data Protection Board of India.',
        ],
      },
      {
        h: 'Children',
        p: ['Our website and courses are intended for adults (18+). We do not knowingly collect data from children.'],
      },
      {
        h: 'Changes to this policy',
        p: ['We will update this page if our practices change, and revise the date at the top.'],
      },
      {
        h: 'Contact & grievances',
        p: [CONTACT_LINE],
      },
    ],
  },

  terms: {
    title: 'Terms of use',
    description: 'Terms for using the Baste Global Markets website, courses and mentorship.',
    updated: UPDATED,
    intro: `By using this website or joining a course or mentorship programme with ${SITE.name}, you agree to these terms.`,
    sections: [
      {
        h: 'Education only',
        p: [
          `${SITE.name} provides trading education. We are not registered with SEBI as an Investment Adviser or Research Analyst, and nothing we provide — on this website, in classes, in mentorship or in messages — is investment advice or a recommendation to buy or sell anything. Please read our Disclaimer & risk disclosure.`,
        ],
      },
      {
        h: 'Your decisions are your own',
        p: [
          'You are solely responsible for your trading and investment decisions and their results. You agree to trade only through regulated brokers and SEBI-recognised exchanges, within the rules that apply to you, and only with money you can afford to lose.',
        ],
      },
      {
        h: 'No guarantee of results',
        p: [
          'We do not guarantee any level of skill, income or profit from our courses. Results depend on many factors outside our control, including market conditions and your own decisions.',
        ],
      },
      {
        h: 'Courses, fees and refunds',
        p: [
          'Course fees, batch dates, schedules and refund terms are shared with you in writing (for example on WhatsApp) before you pay. Those written terms apply to your enrolment. Please read them carefully and ask us if anything is unclear before paying.',
        ],
      },
      {
        h: 'Course materials',
        p: [
          'Course content, recordings, notes and materials are for your personal learning only. Please do not record, copy, resell or share them without our written permission.',
        ],
      },
      {
        h: 'Website content',
        p: [
          'We try to keep this website accurate, but it is provided “as is”. Charts and market examples shown are illustrations, not live data. To the extent permitted by law, we are not liable for any loss arising from use of the website or reliance on its content.',
        ],
      },
      {
        h: 'Governing law',
        p: ['These terms are governed by the laws of India. Courts at Pune, Maharashtra will have jurisdiction over any dispute.'],
      },
      {
        h: 'Contact',
        p: [CONTACT_LINE],
      },
    ],
  },
};
