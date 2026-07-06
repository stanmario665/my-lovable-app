import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const ALLOWED_STUDENT_NUMBER = "226027890";
const ALLOWED_PIN = "29195";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iEnabler Login - Vaal University of Technology" },
      { name: "description", content: "Login to the Vaal University of Technology iEnabler system." },
    ],
  }),
  component: Index,
});

type UserType = "Student" | "Personnel" | "Other" | "Alumni";

function Index() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>("Student");
  const [studentNumber, setStudentNumber] = useState("");
  const [pin, setPin] = useState("");

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const idLabel =
    userType === "Personnel" ? "Personnel Number:" : userType === "Alumni" ? "Alumni Number:" : "Student Number:";

  return (
    <div className="min-h-screen bg-white text-[13px] text-black" style={{ fontFamily: "Verdana, Arial, sans-serif" }}>
      {/* Header bar */}
      <div className="flex items-center justify-between bg-[#e8f1fb] px-4 py-2 text-[13px] font-bold">
        <span>VAAL UNIVERSITY OF TECHNOLOGY</span>
        <span className="hidden sm:inline">{today}</span>
      </div>

      {/* Logo row */}
      <div className="hidden sm:flex w-full items-start justify-between px-2 pt-2">
        <img
          src="https://ienablerprod.vut.ac.za/itsimages/InsImg.gif"
          alt="Vaal University of Technology"
          className="max-h-[220px]"
        />
        <img
          src="https://ienablerprod.vut.ac.za/itsimages/ItsImg.gif"
          alt="ITS Tertiary Software"
          className="max-h-[80px]"
        />
      </div>

      {/* Two cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-6">
        {/* Prospective Students */}
        <div className="mx-auto w-full max-w-[500px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
          <div className="bg-[#2196F3] px-4 py-3 text-center text-white text-[15px]">Prospective Students</div>
          <div className="p-4 text-center">
            <p>
              If you are a prospective student, not registered at this institution, please select the following option:
            </p>
            <br />
            <a href="#" className="font-bold hover:underline">
              Click here to apply
            </a>
          </div>
        </div>

        {/* Registered Users */}
        <div className="mx-auto w-full max-w-[500px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
          <div className="bg-[#2196F3] px-4 py-3 text-center text-white text-[15px]">
            Registered Users: Login Credentials
          </div>
          <form
            className="p-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (userType !== "Student" || studentNumber.trim() !== ALLOWED_STUDENT_NUMBER || pin !== ALLOWED_PIN) {
                alert("Invalid credentials. Access denied.");
                return;
              }
              navigate({ to: "/dashboard" });
            }}
          >
            <div className="flex flex-wrap gap-x-3 gap-y-1 font-bold">
              {(["Student", "Personnel", "Other", "Alumni"] as UserType[]).map((t) => (
                <label key={t} className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="usertype"
                    checked={userType === t}
                    onChange={() => setUserType(t)}
                  />
                  {t}
                </label>
              ))}
            </div>

            <div className="mt-4 font-bold">{idLabel}</div>
            <input
              type="text"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              className="mt-1 block w-full border-2 border-black px-2 py-1 outline-none"
            />

            <div className="mt-4 font-bold">Pin:</div>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={5}
              className="mt-1 block w-full border-b border-black px-2 py-1 outline-none"
            />
            <p className="mt-2 text-[12px]">(5 numeric digits. Do not start with a 0.)</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Login", "Forgot Pin", "Change Pin", "Request A Pin"].map((label) => (
                <button
                  key={label}
                  type={label === "Login" ? "submit" : "button"}
                  className="border border-[#bbb] bg-[#f5f5f5] px-3 py-1 text-[13px] hover:bg-[#e8e8e8]"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-2">
              <button
                type="button"
                className="border border-[#bbb] bg-[#f5f5f5] px-3 py-1 text-[13px] hover:bg-[#e8e8e8]"
              >
                Forgot Student Number
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 bg-[#efefef] px-4 py-3 text-center text-[12px] text-[#666]">
        [{" "}
        {[
          "Contact Us",
          "About Us",
          "Disclaimer",
          "Terms & Conditions",
          "Privacy & Security Statement",
          "Powered By",
        ].map((l, i, arr) => (
          <span key={l}>
            <a href="#" className="underline hover:text-black">
              {l}
            </a>
            {i < arr.length - 1 ? " | " : ""}
          </span>
        ))}{" "}
        ]
      </div>
    </div>
  );
}
