import { Fragment } from "react";
const Intro = () => {
  // Your birthdate
  const birthDate = new Date('2006-06-28');
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  // Subtract one year if the current month is before the birth month
  // Or if it's the birth month but the current day is before the birth day
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return (
    <Fragment>
      <div className="top_author_image w-full h-auto clear-both float-left relative mb-[35px]">
        <img className="min-w-full pc-width" src="assets/img/slider/1.jpg" alt="image" />
      </div>
      <div className="about_title w-full h-auto clear-both float-left border-solid border-[#DFDFDF] border-b pb-[20px] mb-[30px]">
        <h3 className="text-[22px] font-bold">I want to unlock new depths of meaning for humans.</h3>
        {/*<span>The EdTech High School Student</span>*/}
      </div>
      <div className="about_text w-full h-auto clear-both float-left border-solid border-[#DFDFDF] border-b pb-[31px] mb-[30px]">
        <p className="mb-[11px]">
          Welcome back to my little corner of the internet! For those who don’t know me, my name is Sofus, and I am a 17-year-old high school student deeply fascinated by the transformative possibilities of AI on our future education system. I want to redefine the landscape of learning, making it more personalized, effective, and, above all, meaningful.
          <br />
          <br />
          By integrating AI into education, I envision a future where learning is not a one-size-fits-all model but a tailored experience that meets individual needs, ignites passions, and unlocks the full potential of every learner.
        </p>
      </div>
      <div className="tokyo_tm_short_info w-full h-auto clear-both float-left flex border-solid border-[#DFDFDF] border-b pb-[30px] mb-[40px]">
        <div className="left w-1/2 pr-[50px]">
          <div className="tokyo_tm_info w-full h-auto clear-both float-left">
            <ul className="m-0 list-none">
              <li className="m-0">
                <span className="min-w-[100px] float-left mr-[10px] font-bold text-black">
                  Birthday:
                </span>
                <span>28.06.2006</span>
              </li>
              <li className="m-0">
                <span className="min-w-[100px] float-left mr-[10px] font-bold text-black">
                  Age:
                </span>
                <span>{age}</span>
              </li>
              <li className="m-0">
                <span className="min-w-[100px] float-left mr-[10px] font-bold text-black">
                  City:
                </span>
                <span>Værløse, Denmark(Currently: Barrie, Canada)</span>
              </li>
              <li className="m-0">
                <span className="min-w-[100px] float-left mr-[10px] font-bold text-black">
                  Email:
                </span>
                <span>
                  <a
                    className="text-[#767676] transition-all duration-300 hover:text-black"
                    href="mailto:sofuswenoee@gmail.com"
                  >
                    sofuswenoee@gmail.com
                  </a>
                </span>
              </li>
              {/*<li className="m-0">
                <span className="min-w-[100px] float-left mr-[10px] font-bold text-black">
                  Phone:
                </span>
                <span>
                  <a
                    className="text-[#767676] transition-all duration-300 hover:text-black"
                    href="tel:+45 50 48 68 69"
                  >
                    +45 50 48 68 69
                  </a>
                  </li>
                </span>*/}
            </ul>
          </div>
        </div>
        <div className="right w-1/2 pl-[50px]">
          <div className="tokyo_tm_info">
            <ul className="m-0 list-none">
              <li className="m-0">
                <span className="min-w-[100px] float-left mr-[10px] font-bold text-black">
                  Nationality:
                </span>
                <span>Denmark</span>
              </li>
              <li className="m-0">
                <span className="min-w-[100px] float-left mr-[10px] font-bold text-black">
                  Study:
                </span>
                <span>Niels Brock DIG (Currently: Georgian College)</span>
              </li>
              {/*}<li className="m-0">
                <span className="min-w-[100px] float-left mr-[10px] font-bold text-black">
                  Degree:
                </span>
                <span>Master</span>
              </li>*/}
              <li className="m-0">
                <span className="min-w-[100px] float-left mr-[10px] font-bold text-black">
                  Interest:
                </span>
                <span>AI in Education</span>
              </li>
              {/*<li className="m-0">
                <span className="min-w-[100px] float-left mr-[10px] font-bold text-black">
                  Freelance:
                </span>
                <span>Available</span>
              </li>*/}
            </ul>
          </div>
        </div>
      </div>
      <div className="tokyo_tm_button" data-position="left">
        <a href="assets/img/cv/1.jpg" download>
          <span>Download CV</span>
        </a>
      </div>
    </Fragment>
  );
};
export default Intro;
