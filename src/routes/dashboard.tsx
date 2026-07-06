import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "iEnabler - Student Portal" }],
  }),
  component: Dashboard,
});

type View = "home" | "academic-select" | "academic-record";

const MENU_ITEMS = [
  "Application",
  "Returning Students Application",
  "Residence Application",
  "Academic Registration",
  "Residence Registration",
  "Student Admin",
  "Financial Aid",
  "Student Enquiry",
  "Maintain Banking details",
  "SID Instant EFT Payments",
  "Student Finance",
  "Verify Biographical Detail",
  "Higher Degrees",
];

const STUDENT_ENQUIRY_ITEMS = [
  "Summarised Statement of Account",
  "Examination Timetable",
  "Academic Record",
  "Registration Restrictions",
  "Class Timetable",
  "Progress Report",
  "Residence Admission Status",
  "Financial Aid Details",
  "Aged Statement of Account",
  "Detail Address/Contacts Enquiry",
  "Certificates seen",
  "Service Request",
  "Exam Admission Slip",
  "Enrolment Detail - PDF",
  "Summarised Statement (Jasper)",
  "Alternative Progress Report @ qual and GPA",
  "Student Permit",
];

const BOTTOM_ACTIONS = [
  "Application Information",
  "Registration Information",
  "Residence Information",
  "Financial Information",
];

const PROFILE_FIELDS = [
  { label: "Student Nbr", value: "226027890" },
  { label: "Gender", value: "Male" },
  { label: "Birthdate", value: "13-Mar-2006" },
  { label: "ID Nbr", value: "0603136484087" },
  { label: "Marital Status", value: "Single" },
  { label: "Home Lang", value: "SOTHO(NORTH)" },
  { label: "Citizenship", value: "SOUTH AFRICA" },
];

const BADGE_ROWS = [
  { badge: "Email Address", value: "226027890@edu.vut.ac.za" },
  { badge: "Cellphone", value: "0637929195" },
  { badge: "Postal Address", value: "MOTHOMENG VILLAGE 20164 TZANEEN TZANEEN LIMPOPO 0837" },
  { badge: "Study Address" },
  { badge: "Current Balance" },
];

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [view, setView] = useState<View>("home");

  const openView = (v: View) => {
    setView(v);
    setMenuOpen(false);
    setEnquiryOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "Verdana, Arial, sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between bg-[#7ec8e3] px-3 py-2">
        <img
          src="https://ienablerprod.vut.ac.za/itsimages/InsImg.gif"
          alt="Vaal University of Technology"
          className="max-h-[70px] bg-white p-1"
        />
        <button
          aria-label="Menu"
          onClick={() => setMenuOpen(true)}
          className="flex flex-col gap-[5px] p-2"
        >
          <span className="block h-[3px] w-7 bg-black" />
          <span className="block h-[3px] w-7 bg-black" />
          <span className="block h-[3px] w-7 bg-black" />
        </button>
      </div>

      {/* Content */}
      {view === "home" && <HomeView />}
      {view === "academic-select" && <AcademicSelect onView={() => setView("academic-record")} />}
      {view === "academic-record" && <AcademicRecord />}

      {/* Sidebar drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="absolute right-0 top-0 h-full w-[92%] max-w-[420px] overflow-y-auto bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <img
                src="https://ienablerprod.vut.ac.za/itsimages/InsImg.gif"
                alt="VUT"
                className="max-h-[80px]"
              />
              <button
                aria-label="Close"
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold leading-none"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <button className="rounded border-2 border-[#2196F3] bg-[#7ec8e3] px-4 py-2 text-[15px] text-white">
                Student iEnabler
              </button>
            </div>

            <ul className="mt-4 space-y-3 text-[17px]">
              {MENU_ITEMS.map((item) => {
                const isEnquiry = item === "Student Enquiry";
                return (
                  <li key={item}>
                    <button
                      className="flex w-full items-center gap-2 text-left"
                      onClick={() => {
                        if (isEnquiry) setEnquiryOpen((v) => !v);
                      }}
                    >
                      <span className="text-[#2b5a7a]">{isEnquiry && enquiryOpen ? "˄" : "˅"}</span>
                      <span>{item}</span>
                    </button>
                    {isEnquiry && enquiryOpen && (
                      <ul className="ml-6 mt-2 space-y-2 text-[15px] text-[#5aa8c7]">
                        {STUDENT_ENQUIRY_ITEMS.map((sub) => (
                          <li key={sub}>
                            <button
                              className="text-left hover:underline"
                              onClick={() => {
                                if (sub === "Academic Record") openView("academic-select");
                              }}
                            >
                              {sub}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-6">
              <button className="rounded border-2 border-[#2196F3] bg-[#7ec8e3] px-4 py-2 text-white">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HomeView() {
  return (
    <div className="p-4 pb-8 text-[14px]">
      {/* Profile card */}
      <div className="mx-auto w-full max-w-[420px] rounded-sm border border-gray-300 bg-white shadow-md">
        {/* Photo placeholder */}
        <div className="flex h-[220px] items-center justify-center border-b border-gray-300 bg-white">
          <div className="flex h-32 w-32 items-center justify-center rounded-sm bg-gray-100">
            <svg className="h-16 w-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        <div className="px-0">
          <div className="border-b border-gray-300 px-4 py-3 text-[18px] font-semibold">
            Marlon, Mafokwane
          </div>

          {PROFILE_FIELDS.map((field, index) => (
            <div
              key={field.label}
              className={`grid grid-cols-2 items-center px-4 py-3 ${
                index % 2 === 0 ? "bg-[#f0f0f0]" : "bg-white"
              }`}
            >
              <span className="text-[14px] font-semibold">{field.label}</span>
              <span className="text-[14px]">{field.value}</span>
            </div>
          ))}

          {BADGE_ROWS.map((row) => (
            <div key={row.badge} className="border-t border-gray-300 px-4 py-3">
              <span
                className="inline-block rounded-md px-4 py-1 text-[14px] font-semibold text-white"
                style={{ backgroundColor: "#0082E6" }}
              >
                {row.badge}
              </span>
              {row.value && (
                <div className="mt-2 text-[14px] underline decoration-black underline-offset-2">
                  {row.value}
                </div>
              )}
            </div>
          ))}

          <div className="grid grid-cols-2 items-center border-t border-gray-300 bg-[#f0f0f0] px-4 py-3">
            <span className="text-[14px] font-semibold">You owe the institution:</span>
            <span className="text-right text-[14px]">23.122,50</span>
          </div>
        </div>
      </div>

      {/* Bottom action buttons */}
      <div className="mx-auto mt-4 flex w-full max-w-[420px] flex-col gap-2">
        {BOTTOM_ACTIONS.map((label) => (
          <button
            key={label}
            className="w-full rounded-md border border-white/20 py-2 text-[18px] font-normal text-black shadow-sm"
            style={{ backgroundColor: "#76C2E6" }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AcademicSelect({ onView }: { onView: () => void }) {
  const [checked, setChecked] = useState(true);
  return (
    <div className="p-4 text-[14px]">
      <h1 className="text-[22px] font-bold">Academic Record</h1>
      <div className="mt-3 inline-block border border-gray-400 bg-[#eee] px-3 py-2">
        <div><span className="font-bold">Student Number:</span> 226027890</div>
        <div><span className="font-bold">Name:</span> MR Marlon Mafokwane</div>
      </div>
      <p className="mt-4">
        <span className="font-bold text-red-600">Note:</span> To view subject details, check or tick the applicable
        boxes and click the 'View Academic Record' button. Not checking any boxes will result in all subject details
        being displayed.
      </p>
      <div className="mt-6 border border-gray-400">
        <div className="bg-[#e8e8e8] px-3 py-2 font-bold">Qualification</div>
        <div className="flex items-center gap-3 bg-[#eee] px-3 py-2">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span className="font-bold">DI0420</span>
          <span className="ml-6">DIPLOMA IN SAFETY MANAGEMENT</span>
        </div>
      </div>
      <button
        onClick={onView}
        className="mt-4 border border-gray-500 bg-[#f0f0f0] px-4 py-1 text-[14px] hover:bg-[#e2e2e2]"
      >
        View Academic Record
      </button>
    </div>
  );
}

type Subject = {
  year: string;
  code: string;
  name: string;
  period: string;
  yearMark?: string;
  finalMark?: string;
  result: string;
};

const SEM_ONE: Subject[] = [
  { year: "2026", code: "ASICT1A", name: "ICT SKILLS 1", period: "SEMESTER ONE", result: "Result unavailable or suppressed" },
  { year: "2026", code: "BBMAX1A", name: "BUSINESS MANAGEMENT 1.1", period: "SEMESTER ONE", yearMark: "57", finalMark: "88", result: "PASS" },
  { year: "2026", code: "HLOSX1A", name: "OCCUPATIONAL HEALTH AND SAFETY LAW 1.1", period: "SEMESTER ONE", yearMark: "36", result: "FAIL: NO ADMISSION TO EXAM" },
  { year: "2026", code: "HLRIX1A", name: "RISK MANAGEMENT 1.1", period: "SEMESTER ONE", yearMark: "56", finalMark: "96", result: "PASS" },
  { year: "2026", code: "HLSPX1A", name: "SAFETY PRINCIPLES AND PRACTICE 1.1", period: "SEMESTER ONE", yearMark: "52", finalMark: "74", result: "PASS" },
];

const SEM_TWO: Subject[] = [
  { year: "2026", code: "BBMAY1A", name: "BUSINESS MANAGEMENT 1.2", period: "SEMESTER TWO", result: "Not Available Yet" },
  { year: "2026", code: "HLOSY1A", name: "OCCUPATIONAL HEALTH AND SAFETY LAW 1.2", period: "SEMESTER TWO", result: "Not Available Yet" },
  { year: "2026", code: "HLRIY1A", name: "RISK MANAGEMENT 1.2", period: "SEMESTER TWO", result: "Not Available Yet" },
  { year: "2026", code: "HLSPY1A", name: "SAFETY PRINCIPLES AND PRACTICE 1.2", period: "SEMESTER TWO", result: "Not Available Yet" },
];

function AcademicRecord() {
  const subjects = [...SEM_ONE, ...SEM_TWO];
  return (
    <div className="p-4 text-[14px]">
      <h1 className="text-[22px] font-bold">Academic Record</h1>
      <div className="mt-3 inline-block border border-gray-400 bg-[#eee] px-3 py-2">
        <div><span className="font-bold">Student Number:</span> 226027890</div>
        <div><span className="font-bold">Name:</span> MR Marlon Mafokwane</div>
      </div>

      <table className="mt-5 border border-gray-400 text-[13px]">
        <tbody>
          <tr>
            <td className="border border-gray-400 bg-[#eee] px-3 py-1 font-bold">Identity Number</td>
            <td className="border border-gray-400 px-3 py-1">0603136484087</td>
          </tr>
          <tr>
            <td className="border border-gray-400 bg-[#eee] px-3 py-1 font-bold">Date of Birth</td>
            <td className="border border-gray-400 px-3 py-1">13-MAR-2006</td>
          </tr>
        </tbody>
      </table>

      <p className="mt-4"><span className="font-bold">You Owe The Institution:</span> 23122.5</p>

      <div className="mt-4 bg-[#eee] px-3 py-2 font-bold">
        Qualification: DI0420 - DIPLOMA IN SAFETY MANAGEMENT
      </div>

      <div className="border border-gray-400 p-3">
        {subjects.map((s, i) => (
          <div key={i} className="mb-6">
            <div className="grid grid-cols-[110px_1fr] gap-x-2 gap-y-1">
              <div className="text-right font-bold">Year:</div><div>{s.year}</div>
              <div className="text-right font-bold">Subject:</div>
              <div className="flex justify-between gap-4"><span>{s.code}</span><span>{s.name}</span></div>
              <div className="text-right font-bold">Academic Period:</div><div>{s.period}</div>
              <div className="text-right font-bold">Year Mark:</div>
              <div className="flex justify-between"><span>{s.yearMark ?? ""}</span><span className="font-bold">Final Mark: <span className="font-normal">{s.finalMark ?? ""}</span></span></div>
              <div className="text-right font-bold">Result:</div><div>{s.result}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 border border-gray-500 bg-[#f0f0f0] px-4 py-1 text-[13px] hover:bg-[#e2e2e2]">
        Printer Friendly Format
      </button>
    </div>
  );
}
