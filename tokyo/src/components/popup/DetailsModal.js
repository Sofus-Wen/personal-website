import { TokyoContext } from "@/src/Context";
import { useContext } from "react";
import ModalContainer from "./ModalContainer";

const KeyFeatures = () => (
  <div>
    <h2>Key Features</h2>
    <ul>
      <li>Textual Analysis: PANTRA employs advanced algorithms to detect linguistic cues linked to the Big Five personality dimensions.</li>
      <li>Personality Insights: Leveraging sentiment analysis and linguistic markers, the platform estimates individual personality profiles.</li>
      <li>Comprehensive Reports: Users receive detailed analyses that illuminate the personality characteristics inferred from their text.</li>
    </ul>
  </div>
);

const Foundation = () => (
  <div>
    <h2>Foundation</h2>
    <p>PANTRA is inspired by the convergence of technological innovation and psychological research. The project is grounded in evidence from the study "Personality in 100,000 Words: A large-scale analysis of personality and word use among bloggers," which demonstrates a significant correlation between language use and personality traits. This foundational research underpins PANTRA's methodology.</p>
  </div>
);

const Objectives = () => (
  <div>
    <h2>Objectives</h2>
    <p>The development of PANTRA is driven by a commitment to apply artificial intelligence for enhancing understanding of human personality, with goals to:
    <ul>
      <li>Personalize digital experiences in education, social media, and customer engagement.</li>
      <li>Promote self-awareness and personal growth through accessible personality insights.</li>
      <li>Advance the field of computational psychology by linking language use to personality patterns.</li>
    </ul>
    </p>
  </div>
);

const Application = () => (
  <div>
    <h2>Application</h2>
    <p>PANTRA is designed for intuitive use, requiring only a text input to begin the personality assessment. It serves a diverse audience, including educators, marketing professionals, psychologists, and anyone interested in the nexus of language and personality.</p>
  </div>
);

const Gratitude = () => (
  <div>
    <h2>Gratitude</h2>
    <p>This initiative benefits from the collective knowledge and efforts of experts across psychology, computational linguistics, and artificial intelligence. Special acknowledgment is extended to Tal Yarkoni's seminal research, which significantly influences PANTRA's development.</p>
  </div>
);

const Engagement = () => (
  <div>
    <h2>Engagement</h2>
    <p>For more information on PANTRA, including inquiries about access, collaboration, or contributions, please visit my <a href="https://sofuswenoee.com">personal website</a>.</p>
  </div>
);
const DetailsModal = () => {
  const { portfolioDetailsModal, setPortfolioDetailsModal } =
    useContext(TokyoContext);
  return (
    <ModalContainer nullValue={setPortfolioDetailsModal}>
      <div className="popup_details">
        <div className="top_image">
          <img src="assets/img/thumbs/4-2.jpg" alt="image" />
          <div
            className="main"
            data-img-url={portfolioDetailsModal.thumbnail}
            style={{
              backgroundImage: `url(${portfolioDetailsModal.thumbnail})`,
            }}
          />
        </div>
        <div className="portfolio_main_title">
          <h3>{portfolioDetailsModal.title}</h3>
          <span>{portfolioDetailsModal.category}</span>
          <div />
        </div>
        <div className="main_details w-full h-auto clear-both flex mb-[90px]">
          <div className="textbox w-[70%] pr-[40px]">
            {portfolioDetailsModal.text.map((text, i) => (
              <p
                className={
                  portfolioDetailsModal.text.length - 1 == i ? "" : "mb-[20px]"
                }
                key={i}
              >
                {text}
              </p>
              <KeyFeatures />
              <Foundation />
              <Objectives />
              <Application />
              <Gratitude />
              <Engagement />

            ))}
          </div>
          <div className="detailbox w-[30%] pl-[40px]">
            <ul className="list-none">
              <li className="mb-[8px] w-full float-left">
                <span className="first font-bold block text-black mb-[3px]">
                  Project
                </span>
                <span>{portfolioDetailsModal.client}</span>
              </li>
              <li className="mb-[8px] w-full float-left">
                <span className="first font-bold block text-black mb-[3px]">
                  Category
                </span>
                <span>
                  <a
                    className="text-[#767676] transition-all duration-300 hover:text-black"
                    href="#"
                  >
                    {portfolioDetailsModal.category}
                  </a>
                </span>
              </li>
              <li className="mb-[8px] w-full float-left">
                <span className="first font-bold block text-black mb-[3px]">
                  Date
                </span>
                <span>{portfolioDetailsModal.date}</span>
              </li>
              {/*<li className="w-full float-left">
                <span className="first font-bold block text-black mb-[3px]">
                  Other places
                </span>
                <ul className="share list-none relative top-[7px]">
                  {portfolioDetailsModal.share.map((social) => (
                    <li className="mr-[10px] inline-block" key={social.id}>
                      <a className="text-black text-[18px]" href={social.link}>
                        <i className={social.iconName} />
                      </a>
                    </li>
                  ))}
                </ul>
              </li>*/}
            </ul>
          </div>
        </div>
        <div className="additional_images w-full h-auto clear-both float-left">
          <ul className="ml-[-30px] list-none">
            <li className="mb-[30px] float-left w-1/2 pl-[30px]">
              <div className="list_inner w-full h-auto clear-both float-left relative">
                <div className="my_image relative">
                  <img
                    className="opacity-0 min-w-full"
                    src="assets/img/thumbs/4-2.jpg"
                    alt="image"
                  />
                  <div
                    className="main absolute inset-0 bg-no-repeat bg-center bg-cover"
                    data-img-url="assets/img/portfolio/1.jpg"
                    style={{
                      backgroundImage: `url(${portfolioDetailsModal.bigImage})`,
                    }}
                  />
                </div>
              </div>
            </li>
            {portfolioDetailsModal.images.map((img, i) => (
              <li key={i} className="mb-[30px] float-left w-1/2 pl-[30px]">
                <div className="list_inner w-full h-auto clear-both float-left relative">
                  <div className="my_image relative">
                    <img
                      className="opacity-0 min-w-full"
                      src="assets/img/thumbs/4-2.jpg"
                      alt="image"
                    />
                    <div
                      className="main absolute inset-0 bg-no-repeat bg-center bg-cover"
                      data-img-url="assets/img/portfolio/2.jpg"
                      style={{
                        backgroundImage: `url(${img})`,
                      }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ModalContainer>
  );
};
export default DetailsModal;
