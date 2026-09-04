// The speaking record, in one place because both the homepage (which shows
// only the con wall) and /speaking/ (which shows the full list) render it.
//
// Every entry is sourced from a public conference schedule, archive, or the
// talk's own recording on youtube.com/johnnyxmas. Cities are deliberately
// absent: this audience knows where these cons are held, and a guessed
// location costs more credibility than it adds. A `year` is present only
// where a source stated one; the array order is the display order.

export const appearances = [
  { event: 'DefCamp', year: '2025', talk: 'Poisoning Pidgins in the Park' },
  { event: 'ManuSec Summit', year: '2025', talk: "Your OT Environment Isn't Ready for a Pentest" },
  { event: 'Hackfest', year: '2025', talk: 'InfoSecs and the City — the BurbSec meetup framework (panel)' },
  { event: 'CypherCon 7.0', year: '2024', talk: "Saving Ryan's Privates: How Nudes Still Leak" },
  { event: 'SecretCon', year: '2024', talk: 'Hacking Large Companies in 2024' },
  { event: 'ISSA Chicago', year: '2024', talk: 'SIEM and the Art of Motorcycle Maintenance' },
  { event: 'Hackfest Canada', year: '2024', talk: 'Artificial Intelligence, Real Threats (webinar)' },
  { event: 'DakotaCon 10.1', year: '2023', talk: 'Couch to Compromise: How to Hack Large Corporations (keynote)' },
  { event: 'Hackfest Canada', year: '2023', talk: 'Artificial Intelligence, Real Threats' },
  { event: 'Securing Sexuality', year: '2023', talk: "Saving Ryan's Privates: How Your Nudes Get Leaked" },
  { event: 'GRIMMCon 0x3', year: '2021', talk: 'Urban Exploration 101' },
  { event: 'Graylog GO!', year: '2021', talk: 'Couch to Compromise: How to Hack Large Corporations' },
  { event: 'HOPE', year: '2020', talk: 'The U.S. Maker Response to COVID-19' },
  { event: 'Hackfest Canada', year: '2020', talk: 'Urban Exploration: A COVID-Friendly Hacker Hobby' },
  { event: 'WOPR Summit 0x01', year: '2020', talk: 'Urban Exploration 101' },
  { event: 'THOTCON 0xA', year: '2019', talk: 'BurbSecCon' },
  { event: 'Rochester Security Summit', year: '2019', talk: "Keynote: the InfoSec bubble and the glass ceiling we built" },
  { event: 'QCon New York', year: '2019', talk: 'WAF Anti-Bot Bypasses' },
  { event: 'The Circle of HOPE', year: '2018', talk: 'How to Pwn an Enterprise in 2018 (and 2019, and 2020…)' },
  { event: 'Hackfest Canada 10', year: '2018', talk: 'Shut Up and Take My Money: Scraping the Venmo Public Feed' },
  { event: 'GrrCON', year: '2017', talk: '10 Cent Beer Night: The World We Now Live In (keynote)' },
  { event: 'BSides Las Vegas', year: '2017', talk: 'How to Accidentally Get a Job in InfoSec' },
  { event: 'THOTCON 0x8', year: '2017', talk: 'How I Darkweb Economies (and You Can Too!)' },
  { event: 'Hackfest', year: '2017', talk: 'How to Pwn an Enterprise in 2017 (or 2016, or 2015…)' },
  { event: 'Anomali Cyber Threat Day', year: '2017', talk: 'Operationalizing Threat Intelligence' },
  { event: 'The Eleventh HOPE', year: '2016', talk: 'The TSA Keys Leak: Government Backdoors and the Dangers of Security Theater' },
  { event: 'Hackfest', year: '2016', talk: 'How to Buy Anything on the Dark Web' },
  { event: 'CypherCon', year: '2016', talk: "You're Right, This Sucks (with Lesley Carhart)" },
  { event: 'BSides Nashville', year: '2016', talk: 'InfoSecs in the City: Starting a Successful CitySec Meetup' },
  { event: 'ShowMeCon', year: '2016', talk: 'IRL Networking for the Recovering Introvert, Part 3' },
  { event: 'GenCon 49', year: '2016', talk: 'Hacking in Fiction: The Good, The Bad and The Bizarre' },
  { event: 'Hackfest', year: '2015', talk: '1993 B.C.: Get Off My LAN! (Hacking in the Olden Days)' },
  { event: 'CircleCityCon', year: '2015', talk: '1993 B.C.: Before Cellphones' },
  { event: 'Converge Detroit', year: '2015', talk: "That's Not My RJ45 Jack! IRL Networking for Humans, Part 2" },
  { event: 'ShowMeCon', year: '2015', talk: "That's Not My RJ45 Jack! IRL Networking for Humans" },
  { event: 'Hak4Kidz', year: '2015', talk: '1993 B.C.: When We Stopped Going Outside' },
  { event: 'DerbyCon 4.0', year: '2014', talk: 'Attack Paths: Breaking Into InfoSec (with Eve Adams)' },
  { event: 'BSides Detroit', year: '2013', talk: 'CTF lockpicking and locksport' },
  { event: 'PhreakNIC 8', year: '2004', talk: 'Cracking Encrypted Intelligence · Anti-Consumer Technology' },
];

// The con wall — the speaking record as a glanceable list of marks, ordered
// by how much the name alone does for a stranger reading the homepage. This
// is deliberately broader than `appearances` above: that list is only what
// there is a recording of, and it is not the whole speaking history.
export const conWall = [
  'DEF CON', 'DefCamp', 'HOPE', 'DerbyCon', 'GrrCON', 'THOTCON', 'CypherCon',
  'Hackfest', 'BSides Las Vegas', 'QCon New York', 'ManuSec Summit',
  'CircleCityCon', 'ShowMeCon', 'DakotaCon', 'SecretCon', 'Graylog GO!',
  'Rochester Security Summit', 'Securing Sexuality', 'ISSA Chicago',
  'Converge Detroit', 'WOPR Summit', 'BSides Nashville', 'BSides Detroit',
  'GRIMM', 'Hak4Kidz', 'PhreakNIC', 'GenCon', 'BSides312',
];
