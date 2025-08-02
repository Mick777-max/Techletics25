import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  if (search.length < 2) {
    return NextResponse.json({ colleges: [] });
  }

  // Always use the static list for filtering
  const fallbackColleges = getFallbackColleges(search);
  return NextResponse.json({ colleges: fallbackColleges });
}

// Fallback function with common colleges/universities
function getFallbackColleges(searchTerm: string): Array<{ name: string }> {
  const commonColleges = [
    "College of Engineering Trivandrum (CET)",
    "Government Engineering College Thrissur",
    "Government Engineering College Kozhikode",
    "Government Engineering College Kannur",
    "Government Engineering College Wayanad",
    "Government Engineering College Palakkad",
    "Government Engineering College Barton Hill",
    "Government Engineering College Idukki",

    // Universities with Engineering Programs
    "Cochin University of Science and Technology (CUSAT)",
    "Kerala University (College of Engineering Trivandrum)",
    "APJ Abdul Kalam Technological University",
    "University of Calicut",
    "Mahatma Gandhi University",
    "Kannur University",

    // National Institutes
    "National Institute of Technology Calicut (NIT Calicut)",
    "Indian Institute of Information Technology Kottayam (IIIT Kottayam)",
    "Indian Institute of Space Science and Technology Thiruvananthapuram",

    // Aided Engineering Colleges
    "TKM College of Engineering Kollam",
    "Government College of Engineering Kannur",
    "Model Engineering College Thrikkakara",
    "Rajagiri School of Engineering and Technology",
    "Mar Athanasius College of Engineering Kothamangalam",
    "Amal Jyothi College of Engineering Kanjirappally",
    "Christ College of Engineering Irinjalakuda",
    "LBS Institute of Technology for Women Poojappura",
    "NSS College of Engineering Palakkad",
    "Sahrdaya College of Engineering and Technology",
    "Federal Institute of Science and Technology",
    "Sree Narayana Gurukulam College of Engineering",
    "Toc H Institute of Science and Technology",
    "Mar Baselios College of Engineering and Technology",
    "St. Joseph's College of Engineering and Technology Palai",

    // Self-Financing Engineering Colleges
    "Sree Chitra Thirunal College of Engineering Thiruvananthapuram",
    "College of Engineering Chengannur",
    "College of Engineering Karunagappally",
    "College of Engineering Kidangoor",
    "College of Engineering Munnar",
    "College of Engineering Perumon",
    "College of Engineering Poonjar",
    "College of Engineering Thalassery",
    "College of Engineering Trikaripur",
    "Albertian Institute of Science and Technology",
    "AWH Engineering College",
    "Baselios Mathews II College of Engineering",
    "Bishop Jerome Institute",
    "Carmel College of Engineering and Technology",
    "CEA College of Engineering and Technology",
    "College of Architecture Trivandrum",
    "Crescent College of Engineering for Women",
    "De Paul Institute of Science and Technology",
    "Devas College of Engineering and Technology",
    "Dhanalakshmi Srinivasan College of Engineering",
    "Excel College of Engineering and Technology",
    "Geethanjali College of Engineering and Technology",
    "Global Institute of Engineering and Technology",
    "Hindustan College of Engineering and Technology",
    "ICET - Ilahia College of Engineering and Technology",
    "IHRD College of Engineering and Technology",
    "IES College of Engineering",
    "Indira Gandhi Institute of Engineering and Technology",
    "Institute of Engineering and Technology",
    "Jyothi Engineering College",
    "Karavali Institute of Technology",
    "KMP College of Engineering",
    "Kottayam Institute of Technology and Science",
    "LBS College of Engineering",
    "Lourdes Matha College of Science and Technology",
    "Malabar College of Engineering and Technology",
    "Malabar Institute of Technology",
    "MEA Engineering College",
    "Mohandas College of Engineering and Technology",
    "Mount Zion College of Engineering",
    "Musaliar College of Engineering and Technology",
    "NCERC - Narayana Guru College of Engineering",
    "Nehru College of Engineering and Research Centre",
    "New Horizon College of Engineering",
    "Younus College of Engineering and Technology",
    "Vidya Academy of Science and Technology",
    "Viswajyothi College of Engineering and Technology",
    "Thejus Engineering College",
    "Sree Buddha College of Engineering",
    "Sree Narayana Institute of Technology",
    "Sri Vellapally Natesan College of Engineering",
    "Sreepathy Institute of Management and Technology",
    "Prince Shri Venkateshwara Padmavathy Engineering College",
    "Providence College of Engineering",
    "Pal College of Engineering and Technology",
    "Paavai Engineering College",
    "Oxford College of Engineering",
    "Mangalam College of Engineering",
    "KMCT College of Engineering",
    "Jawaharlal College of Engineering and Technology",
    "Ilahia College of Engineering and Technology",
    "Holy Grace Academy of Engineering",
    "Hindusthan College of Engineering and Technology",
    "Govt. College of Engineering Kannur",
    "Fisat (Federal Institute of Science and Technology)",
    "EMEA College of Arts and Science",
    "Don Bosco College of Engineering",
    "Universal Engineering College",
    "College of Engineering and Management Punnapra",
    "CMS College of Engineering",
    "Bishop Jerome Institute Kollam",
    "Al-Ameen Engineering College",
    "Adi Shankara Institute of Engineering and Technology",

    // Women's Engineering Colleges
    "LBS Institute of Technology for Women",
    "Crescent College of Engineering for Women",
    "Women's College of Engineering",

    // Polytechnic Colleges (Diploma)
    "Government Polytechnic College Trivandrum",
    "Government Polytechnic College Kozhikode",
    "Government Polytechnic College Kannur",
    "Government Women's Polytechnic Trivandrum",
    "TKM Polytechnic College",
    "NSS Polytechnic College",

    // Marine Engineering
    "Indian Maritime University Kochi Campus",
    "Marine Engineering and Research Institute",

    // Architecture Colleges
    "College of Architecture Trivandrum",
    "School of Architecture CUSAT",

    // Specialized Institutes
    "Kerala Institute of Local Administration",
    "Centre for Development Studies",
    "Indian Rubber Manufacturers Research Association",

    // Government Medical Colleges
    "Government Medical College Thiruvananthapuram",
    "Government Medical College Kozhikode",
    "Government Medical College Thrissur",
    "Government Medical College Kottayam",
    "Government Medical College Kannur",
    "Government Medical College Palakkad",
    "Government Medical College Manjeri",
    "Government Medical College Kollam",
    "Government Medical College Idukki (Kattappana)",
    "Government Medical College Kasaragod",
    "Government Medical College Ernakulam",

    // Autonomous/Institute of National Importance
    "All India Institute of Medical Sciences (AIIMS) Kalyani - Kerala Campus",
    "Regional Cancer Centre Thiruvananthapuram",
    "Sree Chitra Tirunal Institute for Medical Sciences and Technology",

    // Aided Medical Colleges
    "Government TD Medical College Alappuzha",
    "Institute of Dental Sciences Thiruvananthapuram",

    // Private Medical Colleges
    "Amala Institute of Medical Sciences Thrissur",
    "Azeezia Institute of Medical Sciences Kollam",
    "Believers Church Medical College Hospital Thiruvalla",
    "DM Wayanad Institute of Medical Sciences",
    "Jubilee Mission Medical College and Research Institute Thrissur",
    "Karuna Medical College Palakkad",
    "Kerala Institute of Medical Sciences Thiruvananthapuram",
    "Kodagu Institute of Medical Sciences",
    "Malabar Medical College Hospital and Research Centre Kozhikode",
    "Malankara Orthodox Syrian Church Medical College Kolenchery",
    "Mar Baselios Medical Mission Kothamangalam",
    "MES Medical College Perinthalmanna",
    "Pushpagiri Institute of Medical Sciences Thiruvalla",
    "Rajah Muthiah Medical College Annamalainagar",
    "Sree Gokulam Medical College and Research Foundation Thiruvananthapuram",
    "Sree Narayana Institute of Medical Sciences Ernakulam",
    "Travancore Medical College Kollam",
    "PK Das Institute of Medical Sciences Vaniamkulam",
    "KMCT Medical College Kozhikode",
    "Aster MIMS Kottakkal",
    "Al Azhar Medical College Thodupuzha",
    "Rama Medical College Hospital and Research Centre",

    // Dental Colleges
    "Government Dental College Thiruvananthapuram",
    "Government Dental College Kozhikode",
    "Government Dental College Kottayam",
    "Mar Baselios Dental College Kothamangalam",
    "Pushpagiri College of Dental Sciences Thiruvalla",
    "Sree Anjaneya Institute of Dental Sciences",
    "Al Azhar Dental College Thodupuzha",
    "Annoor Dental College and Hospital",
    "Century International Institute of Dental Science and Research Centre",
    "Indira Gandhi Institute of Dental Sciences",
    "Kannur Dental College",
    "KMCT Dental College Kozhikode",
    "Mahe Institute of Dental Sciences and Hospital",
    "Malabar Dental College and Research Centre Edappal",
    "PMS College of Dental Science and Research Vattappara",
    "Royal Dental College Chalissery",
    "Sree Sankara Dental College Akathumuri",
    "St. Gregorios Dental College Chelad",
    "Vydehi Institute of Dental Sciences",

    // Ayurveda Medical Colleges
    "Government Ayurveda College Thiruvananthapuram",
    "Government Ayurveda College Tripunithura",
    "Pankajakasthuri Ayurveda Medical College Killy",
    "Alva's Ayurveda Medical College",
    "Amrita School of Ayurveda Kollam",
    "Aryavaidyasala Ayurveda College Kottakkal",
    "Kerala Institute of Medical Sciences Ayurveda College",
    "Mannam Ayurveda Co-operative Medical College",
    "Rajiv Gandhi University of Health Sciences Ayurveda College",
    "Sanjo College of Ayurvedic Medicine and Hospital",
    "VPSV Ayurveda College Kottakkal",

    // Homoeopathy Medical Colleges
    "Government Homoeopathic Medical College Thiruvananthapuram",
    "Government Homoeopathic Medical College Kozhikode",
    "Father Muller Homoeopathic Medical College",
    "Nehru Homoeopathic Medical College and Hospital",
    "Dr. Padiar Memorial Homoeopathic Medical College",

    // Unani Medical Colleges
    "Markaz Unani Medical College Kozhikode",
    "Govt. Unani Medical College",

    // Nursing Colleges
    "Government College of Nursing Thiruvananthapuram",
    "Government College of Nursing Kozhikode",
    "Rajagiri College of Social Sciences (Nursing)",
    "Amrita College of Nursing",
    "Believers Church College of Nursing",
    "Carmel College of Nursing",
    "Christian College of Nursing",
    "Holy Cross College of Nursing",
    "Kottayam Medical College Nursing",
    "Little Flower Institute of Medical Sciences and Research Nursing College",
    "Lisie College of Nursing",
    "Mount Carmel College of Nursing",
    "Pushpagiri College of Nursing",
    "Sacred Heart Nursing College",
    "St. Joseph's College of Nursing",
    "Westfort Institute of Nursing",

    // Pharmacy Colleges
    "Government College of Pharmacy Thiruvananthapuram",
    "Amrita School of Pharmacy",
    "Carmel College of Pharmacy",
    "College of Pharmaceutical Sciences Cheruvandoor",
    "Grace College of Pharmacy",
    "Jamia Salafiya Pharmacy College",
    "Kerala University of Health Sciences College of Pharmacy",
    "Malik Deenar College of Pharmacy",
    "NET Pharmacy College",
    "Nazreth College of Pharmacy",
    "St. James College of Pharmaceutical Sciences",
    "Vaageswari College of Pharmacy",

    // Physiotherapy Colleges
    "Government Medical College Physiotherapy Department Thiruvananthapuram",
    "Amrita College of Physiotherapy",
    "Believers Church College of Physiotherapy",
    "KMCT College of Physiotherapy",
    "Lourdes College of Physiotherapy",
    "Rajagiri College of Physiotherapy",

    // Paramedical Colleges
    "Government Institute of Medical Laboratory Technology",
    "Kerala Institute of Medical Technology",
    "Amrita Institute of Medical Technology",
    "Medical Laboratory Technology Colleges (Various)",
    "Radiology and Imaging Technology Colleges",
    "Operation Theatre Technology Colleges",

    // Veterinary Colleges
    "College of Veterinary and Animal Sciences Mannuthy",
    "College of Veterinary and Animal Sciences Pookode",
    "College of Veterinary and Animal Sciences Kokkalai",

    // Research Institutes
    "Kerala Institute of Medical Sciences and Research",
    "Amrita Institute of Medical Sciences and Research Centre",
    "Rajagiri Centre for Business Studies Medical Research",
    "Tropical Disease Research Centre",

    "Indian Institute of Technology Kharagpur",
    "Indian Institute of Technology Bombay",
    "Indian Institute of Technology Madras",
    "Indian Institute of Technology Kanpur",
    "Indian Institute of Technology Delhi",
    "Indian Institute of Technology Guwahati",
    "Indian Institute of Technology Roorkee",

    // Second Generation IITs (2008-2009)
    "Indian Institute of Technology Bhubaneswar",
    "Indian Institute of Technology Gandhinagar",
    "Indian Institute of Technology Hyderabad",
    "Indian Institute of Technology Indore",
    "Indian Institute of Technology Jodhpur",
    "Indian Institute of Technology Mandi",
    "Indian Institute of Technology Patna",
    "Indian Institute of Technology Ropar",

    // Third Generation IITs (2013-2016)
    "Indian Institute of Technology Varanasi (BHU)",
    "Indian Institute of Technology Dhanbad",
    "Indian Institute of Technology Bhilai",
    "Indian Institute of Technology Goa",
    "Indian Institute of Technology Palakkad",
    "Indian Institute of Technology Tirupati",
    "Indian Institute of Technology Jammu",
    "Indian Institute of Technology Dharwad",
    "Government Law College Thiruvananthapuram",
    "Government Law College Ernakulam",
    "Government Law College Kozhikode",
    "Government Law College Thrissur",
    "Government Law College Kannur",
    "School of Legal Studies Cochin University of Science and Technology",
    "School of Legal Studies University of Kerala",
    "Department of Law Mahatma Gandhi University Kottayam",

    // National Law Universities
    "National University of Advanced Legal Studies (NUALS) Kochi",

    // University Affiliated Law Colleges
    "Kerala Law Academy Law College Thiruvananthapuram",
    "TKM Law College Kollam",
    "Sree Narayana Guru College of Legal Studies Kollam",
    "St. Thomas College Thrissur (Law Department)",
    "Brennan College Thalassery",
    "MES Law College Kuttippuram",
    "Govt. Brennan College Thalassery",

    // Private/Self-Financing Law Colleges
    "Rajagiri Centre for Business Studies School of Legal Studies",
    "Christ College Irinjalakuda",
    "St. Joseph's College Devagiri (Law Department)",
    "Marian College Kuttikkanam (Law Department)",
    "CMS College Kottayam (Law Department)",
    "NSS College Ottapalam (Law Department)",
    "BCM College Kottayam (Law Department)",
    "Maharaja's College Ernakulam (Law Department)",
    "University College Thiruvananthapuram (Law Department)",
    "Farook College Kozhikode (Law Department)",
    "MES College Marampally (Law Department)",
    "Sree Kerala Varma College Thrissur (Law Department)",
    "Sree Narayana College Kollam (Law Department)",
    "Mar Ivanios College Thiruvananthapuram (Law Department)",
    "Baselius College Kottayam (Law Department)",
    "Newman College Thodupuzha (Law Department)",
    "Nirmala College Muvattupuzha (Law Department)",
    "St. Dominic's College Kanjirappally (Law Department)",
    "Assumption College Changanassery (Law Department)",
    "SB College Changanassery (Law Department)",
    "Alphonsa College Pala (Law Department)",
    "St. Cyril's College Adoor (Law Department)",
    "Bishop Moore College Mavelikara (Law Department)",

    // Evening Law Colleges
    "Government Law College Evening Batch Thiruvananthapuram",
    "Government Law College Evening Batch Ernakulam",
    "Kerala Law Academy Evening College",
    "Evening Law College Kozhikode",

    // Distance/Correspondence Law Programs
    "Kerala University Distance Education Law Programme",
    "IGNOU Law Programme Kerala Regional Centre",
    "Annamalai University Correspondence Law Programme",

    // Specialized Law Institutions
    "Institute of Legal Studies and Research Kerala University",
    "Centre for Legal Studies and Research CUSAT",
    "Legal Literacy Mission Kerala",
    "Kerala Judicial Academy",
    "Kerala Law Reform Commission",

    // Bar Council Recognized Institutions
    "Indian Law Institute Kerala Chapter",
    "Kerala High Court Advocates Association",
    "District Bar Association Law Training Centres",

    // Women's Law Colleges
    "Women's College Thiruvananthapuram (Law Department)",
    "Fatima Mata National College Kollam (Law Department)",
    "All Saints' College Thiruvananthapuram (Law Department)",
    "St. Teresa's College Ernakulam (Law Department)",
    "St. Mary's College Thrissur (Law Department)",

    // Minority Institution Law Colleges
    "Jamia Salafiya College Pulikkal (Law Department)",
    "MES Mampad College (Law Department)",
    "Farook Training College Kozhikode (Law Department)",
    "Al-Azhar College of Arts and Science Thodupuzha (Law Department)",

    // Research and PG Law Institutions
    "Inter-University Centre for IPR Studies Cochin University",
    "Centre for Comparative Law and Legal History Kerala University",
    "Human Rights Research Centre",
    "Constitutional Law Research Centre",

    // Affiliated Colleges offering LLB
    "Sree Sankaracharya University of Sanskrit Law Department",
    "Kerala Agricultural University Legal Studies",
    "Kannur University Law Programmes",
    "Calicut University Law Departments",

    // Professional Law Training Institutes
    "Bar Council of Kerala Training Institute",
    "Continuing Legal Education Kerala",
    "Paralegal Training Institutes",
    "Legal Aid Services Training Centres",

    "Anna University",
    "National Institute of Technology Trichy",
    "Vellore Institute of Technology",
    "SRM Institute of Science and Technology",
    "Sathyabama Institute of Science and Technology",
    "Amrita Vishwa Vidyapeetham Coimbatore",
    "PSG College of Technology",
    "Coimbatore Institute of Technology",
    "Thiagarajar College of Engineering",
    "Government College of Technology, Coimbatore",
    "Madras Institute of Technology",
    "College of Engineering, Guindy",
    "Velammal Engineering College",
    "Rajalakshmi Engineering College",
    "Hindustan Institute of Technology and Science",
    "Bannari Amman Institute of Technology",
    "Kumaraguru College of Technology",
    "Sri Sairam Engineering College",
    "Sri Venkateswara College of Engineering",
    "St. Joseph's College of Engineering",
    "Sona College of Technology",
    "Dr. Mahalingam College of Engineering and Technology",
    "Karunya Institute of Technology and Sciences",
    "Karpagam College of Engineering",
    "Saveetha Engineering College",
    "Sri Krishna College of Engineering and Technology",
    "Easwari Engineering College",
    "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology",
    "Periyar Maniammai Institute of Science and Technology",

    "Maharaja's College, Ernakulam",
    "St. Thomas College, Thrissur",
    "CMS College, Kottayam",
    "Brennan College, Thalassery",
    "Mar Ivanios College, Thiruvananthapuram",
    "Sacred Heart College, Thevara",
    "St. Albert's College, Ernakulam",
    "Farook College, Kozhikode",
    "St. Joseph's College, Devagiri, Kozhikode",
    "Newman College, Thodupuzha",
    "Union Christian College, Aluva",
    "Baselius College, Kottayam",
    "Govt. Victoria College, Palakkad",
    "Sree Kerala Varma College, Thrissur",
    "St. Berchmans College, Changanassery",
    "NSS College, Ottapalam",
    "Fatima Mata National College, Kollam",
    "Mar Athanasius College, Kothamangalam",
    "TKM College of Arts and Science, Kollam",
    "SN College, Kollam",
    "MES College, Marampally",
    "MES College, Ponnani",
    "Govt. College, Kasaragod",
    "Govt. College, Madappally",
    "Govt. Arts and Science College, Kozhikode",
    "St. Xavier's College, Thumba",
    "University College, Thiruvananthapuram",
    "Government Arts and Science College, Meenchanda",
    "St. Teresa's College, Ernakulam",

    // Government Polytechnic Colleges
    "Government Polytechnic College, Kalamassery",
    "Government Polytechnic College, Kozhikode",
    "Government Polytechnic College, Perinthalmanna",
    "Government Polytechnic College, Kottayam",
    "Government Polytechnic College, Palakkad",
    "Government Polytechnic College, Attingal",
    "Government Polytechnic College, Thrissur",
    "Government Polytechnic College, Nedumangad",
    "Government Polytechnic College, Cherthala",
    "Government Polytechnic College, Vennikulam",
    "Government Polytechnic College, Kannur",
    "Government Polytechnic College, Meenangadi",
    "Government Polytechnic College, Neyyattinkara",
    "Government Polytechnic College, Nattakam",
    "Government Polytechnic College, Ezhukone",
    "Government Polytechnic College, Muttom",
    "Government Polytechnic College, Purappuzha",
    "Government Polytechnic College, Manjeri",
    "Government Polytechnic College, Kunnamkulam",
    "Government Polytechnic College, Vandiperiyar",

    // Aided Polytechnic Colleges
    "Sree Narayana Polytechnic College, Kottiyam (Aided)",
    "NSS Polytechnic College, Pandalam (Aided)",
    "Maharaja's Technological Institute, Thrissur (Aided)",
    "Central Polytechnic College, Vattiyoorkavu (Aided)",

    // Private Self-Financing Polytechnic Colleges
    "MES Polytechnic College, Kunnukara",
    "KMCT Polytechnic College, Kozhikode",
    "St. Mary's Polytechnic College, Palakkad",
    "Lourdes Matha Polytechnic College, Kuttichal",
    "AWH Polytechnic College, Kuttikkattoor",
    "Christ Polytechnic College, Irinjalakuda",
    "St. Michael’s Polytechnic College, Cherthala",
    "JDT Islam Polytechnic College, Kozhikode",
    "Sree Buddha Polytechnic College, Pattoor",
    "Nirmala Polytechnic College, Chalakudy",
    "St. Joseph's Polytechnic College, Pala",

    "Government ITI Kalamassery",
    "Government ITI Kozhikode",
    "Government ITI Malappuram",
    "Government ITI Palakkad",
    "Government ITI Kollam",
    "Government ITI Thiruvananthapuram",
    "Government ITI Thrissur",
    "Government ITI Ernakulam",
    "Government ITI Kannur",
    "Government ITI Alappuzha",
    "Government ITI Kottayam",
    "Government ITI Pathanamthitta",
    "Government ITI Idukki",
    "Government Women's ITI Kozhikode",
    "Government Women's ITI Kannur",
    "Government Women's ITI Thiruvananthapuram",
    "Aided ITI, Pala",
    "Aided ITI, Edappal",
    "Aided ITI, Irinjalakuda",
    "Aided ITI, Muvattupuzha",
    "Private ITI, Nirmalagiri",
    "Private ITI, Al-Ameen, Edathala",
    "Private ITI, Amal Jyothi, Kanjirappally",
    "Private ITI, St. Mary’s, Kothamangalam",
    "Private ITI, Baselios, Kottayam",
    "Private ITI, Don Bosco, Vaduthala",
    "Private ITI, Rajagiri, Kalamassery",
    "Private ITI, Muthoot, Kozhencherry",
    "Private ITI, St. Joseph's, Pavaratty",
    "Private ITI, Marian, Kuttikkanam",
    "Private ITI, Crescent, Aluva",
  ];

  const filtered = commonColleges
    .filter((college) =>
      college.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 8)
    .map((name) => ({ name }));

  return filtered;
}

// Optional: Add POST method if you need to handle college creation
// export async function POST(req: NextRequest) {
//   return NextResponse.json(
//     { error: "POST method not supported for colleges endpoint" },
//     { status: 405 }
//   );
// }
