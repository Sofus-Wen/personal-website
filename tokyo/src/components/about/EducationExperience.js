const experiencesData = [
  {
    id: 1,
    date: "2024 - 2024",
    designation: "s5 Builder",
    company: "Buildspace",
  },
  {
    id: 2,
    date: "2024",
    designation: "Peoples Choice Award",
    company: "Moonshots",
  },
  {
    id: 3,
    date: "2024",
    designation: "Speaker",
    company: "AI For Education Summit",
  },
  {
    id: 4,
    date: "2023",
    designation: "Finalist",
    company: "Crimson 18u18",
  },
  {
    id: 5,
    date: "2023",
    designation: "Speaker",
    company: "PuzzleX",
  },
  {
    id: 6,
    date: "2020 - 2022",
    designation: "Web Designer",
    company: "Taiyo Official",
  },
];
const educationData = [
  {
    id: 1,
    date: "2024 - Now",
    degree: "Exchange Student",
    institute: "Japan Educatius Group",
  },
  {
    id: 2,
    date: "2023 - 2024",
    degree: "HHX (Higher Business Degree)",
    institute: "Niels Brock",
  },
  {
    id: 3,
    date: "2023 - 2024",
    degree: "Innovator",
    institute: "TKS - The Knowledge Society",
  },
  {
    id: 4,
    date: "2024",
    degree: "IBB Semester Abroad",
    institute: "Georgian College",
  },
  {
    id: 5,
    date: "2012 - 2022",
    degree: "Primary School",
    institute: "Marie Kruses School",
  },
];

const EducationExperience = () => {
  return (
    <div className="tokyo_tm_resumebox w-full h-auto clear-both float-left bg-white py-[93px] px-0">
      <div className="container">
        <div className="in w-full h-auto clear-both float-left flex">
          <div className="left w-1/2 pr-[50px]">
            <div className="tokyo_section_title w-full h-auto clear-both float-left mb-[40px]">
              <h3 className="text-[20px] font-bold">Education</h3>
            </div>
            <div className="tokyo_tm_resume_list w-full h-auto clear-both float-left">
              <ul className="m-0 list-none relative inline-block pt-[10px]">
                {educationData.map((edu, i) => (
                  <li
                    className={`m-0 w-full float-left relative pl-[20px] ${
                      i == educationData.length - 1 ? "" : "pb-[45px]"
                    }`}
                    key={edu.id}
                  >
                    <div className="list_inner  w-full h-auto clear-both float-left relative flex">
                      <div className="time w-1/2 pr-[20px]">
                        <span className="inline-block py-[5px] px-[25px] bg-[rgba(0,0,0,.05)] rounded-[50px] text-[14px] whitespace-nowrap">
                          {edu.date}
                        </span>
                      </div>
                      <div className="place w-1/2 pl-[20px]">
                        <h3 className="text-[16px] mb-[2px] font-semibold">
                          {edu.institute}
                        </h3>
                        <span className="text-[14px]">{edu.degree}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right w-1/2 pl-[50px]">
            <div className="tokyo_section_title w-full h-auto clear-both float-left mb-[40px]">
              <h3 className="text-[20px] font-bold">Experience</h3>
            </div>
            <div className="tokyo_tm_resume_list w-full h-auto clear-both float-left">
              <ul className="m-0 list-none relative inline-block pt-[10px]">
                {experiencesData.map((exp, i) => (
                  <li
                    className={`m-0 w-full float-left relative pl-[20px] ${
                      i == experiencesData.length - 1 ? "" : "pb-[45px]"
                    }`}
                    key={exp.id}
                  >
                    <div className="list_inner  w-full h-auto clear-both float-left relative flex">
                      <div className="time w-1/2 pr-[20px]">
                        <span className="inline-block py-[5px] px-[25px] bg-[rgba(0,0,0,.05)] rounded-[50px] text-[14px] whitespace-nowrap">
                          {exp.date}
                        </span>
                      </div>
                      <div className="place w-1/2 pl-[20px]">
                        <h3 className="text-[16px] mb-[2px] font-semibold">
                          {exp.company}
                        </h3>
                        <span className="text-[14px]">{exp.designation}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EducationExperience;
