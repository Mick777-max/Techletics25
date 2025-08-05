import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  if (search.length < 2) {
    return NextResponse.json({ branches: [] });
  }

  const matchedBranches = getMatchingBranches(search);
  return NextResponse.json({ branches: matchedBranches });
}

// List of common branches with abbreviations and full names
const BRANCHES = [
    { abbr: "CSE", name: "Computer Science and Engineering" },
    { abbr: "CSIT", name: "Computer Science and Information Technology" },
    { abbr: "AI", name: "Artificial Intelligence" },
    { abbr: "AI&ML", name: "Artificial Intelligence and Machine Learning" },
    { abbr: "DS", name: "Data Science" },
    { abbr: "CS", name: "Cyber Security" },
    { abbr: "IT", name: "Information Technology" },
    { abbr: "ECE", name: "Electronics and Communication Engineering" },
    { abbr: "EEE", name: "Electrical and Electronics Engineering" },
    { abbr: "EE", name: "Electrical Engineering" },
    { abbr: "ME", name: "Mechanical Engineering" },
    { abbr: "CE", name: "Civil Engineering" },
    { abbr: "AE", name: "Aerospace Engineering" },
    { abbr: "AGRI", name: "Agricultural Engineering" },
    { abbr: "BT", name: "Biotechnology Engineering" },
    { abbr: "CHE", name: "Chemical Engineering" },
    { abbr: "CH", name: "Chemistry and Molecular Engineering" },
    { abbr: "MT", name: "Metallurgical Engineering" },
    { abbr: "MSE", name: "Materials Science and Engineering" },
    { abbr: "PE", name: "Petroleum Engineering" },
    { abbr: "IE", name: "Industrial Engineering" },
    { abbr: "ENV", name: "Environmental Engineering" },
    { abbr: "MCE", name: "Mechatronics Engineering" },
    { abbr: "MIN", name: "Mining Engineering" },
    { abbr: "TEXT", name: "Textile Engineering" },
    { abbr: "INS", name: "Instrumentation Engineering" },
    { abbr: "BIO", name: "Biomedical Engineering" },
    { abbr: "FPT", name: "Food Process Technology" },
    { abbr: "RA", name: "Robotics and Automation" },
    { abbr: "OCE", name: "Ocean Engineering" },
    { abbr: "AUT", name: "Automobile Engineering" },
    { abbr: "NANO", name: "Nanotechnology Engineering" },
    { abbr: "PH", name: "Engineering Physics" },
    { abbr: "ENGG.MGT", name: "Engineering Management" },
    { abbr: "AIML", name: "Artificial Intelligence and Machine Learning" },
    { abbr: "IOT", name: "Internet of Things" },
    { abbr: "BLOCK", name: "Blockchain Technology" },
    { abbr: "DSAI", name: "Data Science and Artificial Intelligence" },
    { abbr: "SWE", name: "Software Engineering" },
    { abbr: "GEO", name: "Geo Informatics Engineering" },
    { abbr: "RE", name: "Renewable Energy Engineering" },
    { abbr: "MAR", name: "Marine Engineering" },
    { abbr: "PRINT", name: "Printing Technology" },
    { abbr: "PLASTIC", name: "Plastic Technology" },
    { abbr: "CERAMIC", name: "Ceramic Engineering" },
    { abbr: "NUCLEAR", name: "Nuclear Engineering" },
    { abbr: "TCE", name: "Telecommunication Engineering" },
    { abbr: "LOGI", name: "Logistics and Supply Chain Management" },
    { abbr: "ANIM", name: "Animation and Multimedia" },
    { abbr: "VFX", name: "Visual Effects and Design" },
    { abbr: "DSD", name: "Design and Smart Devices" },

    { abbr: "MBBS", name: "Bachelor of Medicine and Bachelor of Surgery" },
    { abbr: "BDS", name: "Bachelor of Dental Surgery" },
    { abbr: "BAMS", name: "Bachelor of Ayurvedic Medicine and Surgery" },
    { abbr: "BHMS", name: "Bachelor of Homeopathic Medicine and Surgery" },
    { abbr: "BUMS", name: "Bachelor of Unani Medicine and Surgery" },
    { abbr: "BNYS", name: "Bachelor of Naturopathy and Yogic Sciences" },
    { abbr: "BSMS", name: "Bachelor of Siddha Medicine and Surgery" },
    { abbr: "BPT", name: "Bachelor of Physiotherapy" },
    { abbr: "BOT", name: "Bachelor of Occupational Therapy" },
    { abbr: "BSc.N", name: "Bachelor of Science in Nursing" },
    { abbr: "BMLT", name: "Bachelor in Medical Laboratory Technology" },
    { abbr: "BPharm", name: "Bachelor of Pharmacy" },
    { abbr: "PharmD", name: "Doctor of Pharmacy" },
    { abbr: "BASLP", name: "Bachelor in Audiology and Speech-Language Pathology" },
    { abbr: "BOPT", name: "Bachelor of Optometry" },
    { abbr: "BRIT", name: "Bachelor in Radiology and Imaging Technology" },
    { abbr: "BMIT", name: "Bachelor in Medical Imaging Technology" },
    { abbr: "BEMS", name: "Bachelor of Electropathy Medicine and Surgery" },
    { abbr: "BSc.Biotech", name: "Bachelor of Science in Biotechnology" },
    { abbr: "BSc.Micro", name: "Bachelor of Science in Microbiology" },
    { abbr: "BSc.Genetics", name: "Bachelor of Science in Genetics" },
    { abbr: "BSc.Anatomy", name: "Bachelor of Science in Anatomy" },
    { abbr: "BSc.Physio", name: "Bachelor of Science in Physiology" },
    { abbr: "BSc.Patho", name: "Bachelor of Science in Pathology" },
    { abbr: "BSc.Forensic", name: "Bachelor of Science in Forensic Science" },

    { abbr: "LLB", name: "Bachelor of Laws (3 Years)" },
    { abbr: "BA LLB", name: "BA + LLB (5 Years Integrated)" },
    { abbr: "BBA LLB", name: "BBA + LLB (5 Years Integrated)" },
    { abbr: "BCom LLB", name: "BCom + LLB (5 Years Integrated)" },
    { abbr: "BSc LLB", name: "BSc + LLB (5 Years Integrated)" },
    { abbr: "LLM", name: "Master of Laws (LLM)" },
    { abbr: "PhD Law", name: "Doctor of Philosophy in Law" },
    { abbr: "Int.Law", name: "International Law" },
    { abbr: "Corp.Law", name: "Corporate Law" },
    { abbr: "Cyber.Law", name: "Cyber Law" },
    { abbr: "IPR", name: "Intellectual Property Rights Law" },
    { abbr: "Crim.Law", name: "Criminal Law" },
    { abbr: "Const.Law", name: "Constitutional Law" },
    { abbr: "Envt.Law", name: "Environmental Law" },
    { abbr: "Tax.Law", name: "Taxation Law" },
    { abbr: "Labour.Law", name: "Labour and Industrial Law" },
    { abbr: "HumanR.Law", name: "Human Rights Law" },
    { abbr: "Family.Law", name: "Family and Personal Law" },
    { abbr: "Media.Law", name: "Media and Entertainment Law" },
    { abbr: "Sports.Law", name: "Sports Law" },
    { abbr: "Bank.Law", name: "Banking and Finance Law" },
    { abbr: "Comp.Law", name: "Competition Law" },
    { abbr: "IntlTrade.Law", name: "International Trade and Investment Law" },

    { abbr: "BBA", name: "Bachelor of Business Administration" },
    { abbr: "BBM", name: "Bachelor of Business Management" },
    { abbr: "BFM", name: "Bachelor of Financial Markets" },
    { abbr: "BIBF", name: "Bachelor of International Business and Finance" },
    { abbr: "BMS", name: "Bachelor of Management Studies" },
    { abbr: "BBS", name: "Bachelor of Business Studies" },
    { abbr: "BCA", name: "Bachelor of Computer Applications" }, // Often cross-listed with commerce streams
  
    { abbr: "CA", name: "Chartered Accountancy" },
    { abbr: "CS", name: "Company Secretary" },
    { abbr: "CMA", name: "Cost and Management Accountancy" },
    { abbr: "ACCA", name: "Association of Chartered Certified Accountants" },
    { abbr: "CPA", name: "Certified Public Accountant" },
    { abbr: "CFA", name: "Chartered Financial Analyst" },
    { abbr: "FRM", name: "Financial Risk Manager" },
  
    { abbr: "MCom", name: "Master of Commerce" },
    { abbr: "MBA", name: "Master of Business Administration" },
    { abbr: "PGDM", name: "Post Graduate Diploma in Management" },
  
    { abbr: "Eco(H)", name: "BA (Hons.) Economics" },
    { abbr: "Stats", name: "BA/BSc in Statistics" },
    { abbr: "Act.Sci", name: "Actuarial Science" },
    { abbr: "FinTech", name: "Financial Technology" },
    { abbr: "Entre", name: "Entrepreneurship and Innovation" },
    { abbr: "IB", name: "International Business" },
    { abbr: "HRM", name: "Human Resource Management" },
    { abbr: "MRKT", name: "Marketing Management" },
    { abbr: "Ops", name: "Operations and Supply Chain Management" },
    { abbr: "Banking", name: "Banking and Insurance" },
    { abbr: "BCom", name: "Bachelor of Commerce (General)" },
    { abbr: "BCom(H)", name: "Bachelor of Commerce (Honours)" },

      // Core Sciences
  { abbr: "BSc.Physics", name: "Bachelor of Science in Physics" },
  { abbr: "BSc.Chemistry", name: "Bachelor of Science in Chemistry" },
  { abbr: "BSc.Maths", name: "Bachelor of Science in Mathematics" },
  { abbr: "BSc.Stats", name: "Bachelor of Science in Statistics" },
  { abbr: "BSc.Bio", name: "Bachelor of Science in Biology" },
  { abbr: "BSc.Zoology", name: "Bachelor of Science in Zoology" },
  { abbr: "BSc.Botany", name: "Bachelor of Science in Botany" },

  // Interdisciplinary & Applied
  { abbr: "BSc.Env", name: "Bachelor of Science in Environmental Science" },
  { abbr: "BSc.FoodTech", name: "Bachelor of Science in Food Technology" },
  { abbr: "BSc.Micro", name: "Bachelor of Science in Microbiology" },
  { abbr: "BSc.Biochem", name: "Bachelor of Science in Biochemistry" },
  { abbr: "BSc.Genetics", name: "Bachelor of Science in Genetics" },
  { abbr: "BSc.Agri", name: "Bachelor of Science in Agriculture" },
  { abbr: "BSc.Hort", name: "Bachelor of Science in Horticulture" },
  { abbr: "BSc.Forestry", name: "Bachelor of Science in Forestry" },

  // Computer & Tech
  { abbr: "BSc.CompSci", name: "Bachelor of Science in Computer Science" },
  { abbr: "BSc.IT", name: "Bachelor of Science in Information Technology" },
  { abbr: "BSc.DataSci", name: "Bachelor of Science in Data Science" },
  { abbr: "BSc.AI", name: "Bachelor of Science in Artificial Intelligence" },
  { abbr: "BSc.Cyber", name: "Bachelor of Science in Cyber Security" },

  // Medical Sciences
  { abbr: "BSc.Nursing", name: "Bachelor of Science in Nursing" },
  { abbr: "BSc.MLT", name: "Bachelor of Science in Medical Lab Technology" },
  { abbr: "BSc.Radiology", name: "Bachelor of Science in Radiology" },
  { abbr: "BSc.Optometry", name: "Bachelor of Science in Optometry" },
  { abbr: "BSc.Pharm", name: "Bachelor of Science in Pharmaceutical Sciences" },

  // Others & Emerging
  { abbr: "BSc.Design", name: "Bachelor of Science in Design" },
  { abbr: "BSc.Animation", name: "Bachelor of Science in Animation and VFX" },
  { abbr: "BSc.Fashion", name: "Bachelor of Science in Fashion Technology" },
  { abbr: "BSc.Forensics", name: "Bachelor of Science in Forensic Science" },
  { abbr: "BSc.Geology", name: "Bachelor of Science in Geology" },
  { abbr: "BSc.Nano", name: "Bachelor of Science in Nanotechnology" },
  { abbr: "BSc.Marine", name: "Bachelor of Science in Marine Science" },
  { abbr: "BSc.Psych", name: "Bachelor of Science in Psychology" },
]

// Match either by abbreviation or full name (case-insensitive)
function getMatchingBranches(searchTerm: string): Array<{ name: string }> {
  const lowered = searchTerm.toLowerCase();

  return BRANCHES.filter(
    ({ abbr, name }) =>
      abbr.toLowerCase().includes(lowered) ||
      name.toLowerCase().includes(lowered)
  )
    .slice(0, 8)
    .map(({ name, abbr }) => ({ name, abbr }));
}
