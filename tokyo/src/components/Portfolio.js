import Isotope from "isotope-layout";
import { useContext, useEffect, useRef, useState } from "react";
import { TokyoContext } from "../Context";
import { tokyo } from "../utils";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
const detailData = [
  {
    id: 1,
    thumbnail: "assets/img/portfolio/7.jpg",
    title: "PANTRA: Personality Analysis through Natural Text Response Assessment",
    text: [
      "PANTRA is a personality predictor based on word usage using NLP.",
      "PANTRA leverages Natural Language Processing (NLP) and psychological analysis, to offer a seamless approach to decoding the Big Five personality traits through text analysis. By examining patterns in written or conversational language, PANTRA provides insights into an individual's Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism—collectively known as the OCEAN model.",
      "PANTRA is inspired by the convergence of technological innovation and psychological research. The project is grounded in evidence from the study Personality in 100,000 Words: A large-scale analysis of personality and word use among bloggers,' which demonstrates a significant correlation between language use and personality traits. This foundational research underpins PANTRA's methodology.",
      "The development of PANTRA is driven by a commitment to apply artificial intelligence for enhancing understanding of human personality, with goals to:",
      "• Personalize digital experiences in education, social media, and customer engagement.",
      "• Promote self-awareness and personal growth through accessible personality insights.",
      "• Advance the field of computational psychology by linking language use to personality patterns.",
      "This initiative benefits from the collective knowledge and efforts of experts across psychology, computational linguistics, and artificial intelligence. Special acknowledgment is extended to Tal Yarkoni's seminal research, which significantly influences PANTRA's development.",
      "If you are interested in PANTRA, click on the icons to your right under 'More From This Project' to learn more.",
    ],
    client: "PANTRA: Personality Analysis through Natural Text Response Assessment",
    date: "Februar 27, 2024",
    category: "AI - Natural language processing",
    share: [
      {
        id: 1,
        iconName: "icon-medium",
        link: "https://www.medium.com/@sofuswenoee/decoding-personality-with-ai-introducing-pantra-9aa268139f65",
      },
      {
        id: 2,
        iconName: "icon-youtube-squared",
        link: "https://youtu.be/CLRQ5qoxN88",
      },
      {
        id: 3,
        iconName: "icon-linkedin-squared",
        link: "https://www.linkedin.com/in/sofuswenoee",
      },
      {
        id: 4,
        iconName: "icon-mail",
        link: "https://colab.research.google.com/drive/1RUBQx8I5w67s12e6gpdQptodvat0FVU4?usp=sharing",
      },
    ],
    bigImage: "assets/img/portfolio/3.jpg",
    images: ["assets/img/portfolio/2.jpg", "assets/img/portfolio/1.jpg"],
  },
  {
    id: 2,
    thumbnail: "assets/img/portfolio/8.jpg",
    title: "LazyStudent AI: Enhancing Academic Comprehension through Finetuned Second-Order Recommendations",
    text: [
      "LazyStudent AI changes how students engage with their studies by utilizing the technology of NLP(natural language processing), data curation & an advanced fine-tuned AI model. This tool analyzes lecture content and employs a curated dataset to enhance a language learning model (LLM), which in turn recommends actionable second-order actions and study material for students to maximize their learning efficiency.",
      "At the core of LazyStudent AI is its ability to provide comprehensive summaries and notes from lectures, freeing students to fully immerse themselves in the learning experience without the distraction of constant note-taking. This tool is designed to empower students to be more present in their learning environments, thereby enhancing their understanding and retention of course material.",
      "Beyond merely summarizing lectures, LazyStudent AI offers personalized recommendations on the depth of study required for upcoming classes while also utilizing NLP to remind the students of important events mentioned in the class. It generates accessible notes/flashcards, making revision more efficient and tailored to students' learning needs. This feature is particularly beneficial for guiding students in allocating their study time effectively, ensuring they focus on areas to garner a holistic class comprehension.",
      "The development of LazyStudent AI is inspired by a dedication to improving educational outcomes through technology. Recognizing the unique challenges students face in managing their study time, LazyStudent AI aims to:",
      "• Provide students with a tool that aids in effective note-taking, summarization & automating notation of important events, allowing for a deeper engagement in class.",
      "• Offer personalized study recommendations, enabling students to optimize their study habits and academic performance.",
      "• Support academic success by making study materials more accessible and tailored to individual time commitments.",
      "LazyStudent AI benefits from interdisciplinary collaboration among lectures in high school, all the way up to advanced university programs. This project is a testament to the potential of technology to transform traditional educational practices, making learning more engaging, efficient, and personalized.",
      "For those interested in exploring how LazyStudent AI can enhance their academic journey, further information is available under 'More From This Project.'",],
    client: "LazyStudent AI: Enhancing Academic Comprehension through Finetuned Second-Order Recommendations",
    date: "March 2, 2024",
    category: "AI - Data Curation & Fine Tuning",
    share: [
      {
        id: 1,
        iconName: "icon-medium",
        link: "https://medium.com/@sofuswenoee/how-i-built-lazystudent-to-hack-my-way-to-better-grades-without-the-effort-ab376391096b/",
      },
      {
        id: 2,
        iconName: "icon-youtube-squared",
        link: "https://youtube.com/",
      },
      {
        id: 3,
        iconName: "icon-linkedin-squared",
        link: "https://www.linkedin.com/in/sofuswenoee/",
      },
      {
        id: 4,
        iconName: "icon-mail",
        link: "https://colab.research.google.com/drive/1ijHqEMXOqaI9cvbIOBcqTJgfzChcIhCn?usp=sharing",
      },
    ],
    bigImage: "assets/img/portfolio/4.jpg",
    images: ["assets/img/portfolio/5.jpg", "assets/img/portfolio/6.jpg"],
  },
  {
    id: 3,
    thumbnail: "assets/img/portfolio/9.jpg",
    title: "Solon.AI: Personalizing learning through AI Agent-driven customization and gamification",
    text: [
      "Solon revolutionizes personalized education by leveraging AI and gamification to transform the student experience. Integrating technologies such as NLP, data curation, and advanced AI modeling, Solon analyzes educational content and student preferences to create a customized learning pathway. This platform dynamically adapts to each student's learning style and personality, offering tailored study methods and material recommendations to optimize learning efficiency.",
      "At Solon's core is its unique ability to understand and cater to individual educational goals, making the learning process more immersive and interactive. By personalizing the educational journey, Solon allows students to navigate their studies with a sense of ownership and engagement previously unseen in traditional educational settings.",
      "Beyond customization, Solon emphasizes the gamification of learning, turning education into an engaging game where progress is measured by real-world achievements and personal growth. The platform uses AI to provide actionable insights, helping students to not only excel academically but also to understand and apply their knowledge in meaningful ways.",
      "Developed with a commitment to enhancing educational outcomes through technology, Solon seeks to address the challenges students face in aligning their studies with their passions and capabilities. Solon aims to:",
      "• Empower students with a deeply personalized learning experience, transforming how they interact with educational content.",
      "• Utilize AI to offer customized learning strategies, enabling students to achieve academic excellence while pursuing their personal interests.",
      "• Enhance the accessibility of tailored study materials, ensuring every student can navigate their educational journey with confidence.",
      "Solon represents a collaborative effort to redefine education, supporting students from high school to university levels. This project showcases the transformative power of technology in education, making learning more relevant, engaging, and tailored to individual needs.",
      "For those looking to redefine their educational experience, Solon offers a glimpse into the future of personalized learning. More information on how Solon can personalize your educational journey is available under 'More From This Project.'",],
    client: "Solon.AI: Personalizing learning through AI Agent-driven customization and gamification",
    date: "March 2, 2024",
    category: "AI - Agents & Custom Tools",
    share: [
      {
        id: 1,
        iconName: "icon-medium",
        link: "https://medium.com/@sofuswenoee/how-i-built-lazystudent-to-hack-my-way-to-better-grades-without-the-effort-ab376391096b/",
      },
      {
        id: 2,
        iconName: "icon-youtube-squared",
        link: "https://youtube.com/",
      },
      {
        id: 3,
        iconName: "icon-linkedin-squared",
        link: "https://www.linkedin.com/in/sofuswenoee/",
      },
    ],
    bigImage: "assets/img/portfolio/10.jpg",
    images: ["assets/img/portfolio/11.jpg", "assets/img/portfolio/12.jpg"],
  },
];
const Portfolio = () => {
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    const data = document.querySelector(".item__");
    if (data.length !== 0) {
      setTimeout(() => {
        isotope.current = new Isotope(".gallery_zoom", {
          itemSelector: ".item__",
        });
      }, 3000);
    }
  }, []);
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };
  useEffect(() => {
    tokyo.portfolioHover();
    tokyo.dataImage();
  });
  const { setPortfolioDetailsModal, modalToggle } = useContext(TokyoContext);
  return (
    <SectionContainer name={"portfolio"}>
      <div className="container">
        <div className="tokyo_tm_portfolio w-full h-auto clear-both float-left px-0 pt-[100px] pb-[40px]">
          <div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
            <div className="title_flex w-full h-auto clear-both flex justify-between items-end">
              <SectionTitle
                pageName={"Projects"}
                title={"My Projects"}
              />
              {/*<div className="portfolio_filter">
                <ul className="list-none">
                  <li className="mr-[25px] inline-block">
                    <a
                      href="#"
                      className="current text-[#767676] inline-block font-medium font-montserrat transition-all duration-300 hover:text-black"
                      onClick={handleFilterKeyChange("*")}
                    >
                      All
                    </a>
                  </li>
                  <li className="mr-[25px] inline-block">
                    <a
                      className="text-[#767676] inline-block font-medium font-montserrat transition-all duration-300 hover:text-black"
                      href="#"
                      onClick={handleFilterKeyChange("vimeo")}
                    >
                      Vimeo
                    </a>
                  </li>
                  <li className="mr-[25px] inline-block">
                    <a
                      className="text-[#767676] inline-block font-medium font-montserrat transition-all duration-300 hover:text-black"
                      href="#"
                      onClick={handleFilterKeyChange("youtube")}
                    >
                      Youtube
                    </a>
                  </li>
                  <li className="mr-[25px] inline-block">
                    <a
                      className="text-[#767676] inline-block font-medium font-montserrat transition-all duration-300 hover:text-black"
                      href="#"
                      onClick={handleFilterKeyChange("soundcloud")}
                    >
                      Soundcloud
                    </a>
                  </li>
                  <li className="mr-[25px] inline-block">
                    <a
                      className="text-[#767676] inline-block font-medium font-montserrat transition-all duration-300 hover:text-black"
                      href="#"
                      onClick={handleFilterKeyChange("image")}
                    >
                      Image
                    </a>
                  </li>
                  <li className="inline-block">
                    <a
                      className="text-[#767676] inline-block font-medium font-montserrat transition-all duration-300 hover:text-black"
                      href="#"
                      onClick={handleFilterKeyChange("detail")}
                    >
                      Detail
                    </a>
                  </li>
                </ul>
              </div>*/}
            </div>
          </div>
          <div className="list_wrapper w-full h-auto clear-both float-left">
            <ul className="portfolio_list gallery_zoom ml-[-40px] list-none">
              {/*<li className="vimeo mb-[40px] float-left w-1/3 pl-[40px] item__">
                <div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
                  <div
                    className="entry tokyo_tm_portfolio_animation_wrap"
                    data-title="Teresa Butler"
                    data-category="Vimeo"
                  >
                    <a
                      className="popup-vimeo"
                      href="https://vimeo.com/337293658"
                    >
                      <img
                        className="opacity-0 min-w-full"
                        src="assets/img/thumbs/1-1.jpg"
                        alt="image"
                      />
                      <div
                        className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                        data-img-url="assets/img/portfolio/5.jpg"
                      />
                    </a>
                  </div>
                </div>
              </li>
              <li className="youtube mb-[40px] float-left w-1/3 pl-[40px] item__">
                <div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
                  <div
                    className="entry tokyo_tm_portfolio_animation_wrap"
                    data-title="Ashley Flores"
                    data-category="Youtube"
                  >
                    <a
                      className="popup-youtube"
                      href="https://www.youtube.com/watch?v=7e90gBu4pas"
                    >
                      <img
                        className="opacity-0 min-w-full"
                        src="assets/img/thumbs/1-1.jpg"
                        alt="image"
                      />
                      <div
                        className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                        data-img-url="assets/img/portfolio/6.jpg"
                      />
                    </a>
                  </div>
                </div>
              </li>
              <li className="soundcloud mb-[40px] float-left w-1/3 pl-[40px] item__">
                <div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
                  <div
                    className="entry tokyo_tm_portfolio_animation_wrap"
                    data-title="Derek Smith"
                    data-category="Soundcloud"
                  >
                    <a
                      className="soundcloude_link mfp-iframe audio"
                      href="https://w.soundcloud.com/player/?visual=true&url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F159967086&show_artwork=true&maxwidth=1020&maxheight=1000&auto_play=1"
                    >
                      <img
                        className="opacity-0 min-w-full"
                        src="assets/img/thumbs/1-1.jpg"
                        alt="image"
                      />
                      <div
                        className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                        data-img-url="assets/img/portfolio/4.jpg"
                      />
                    </a>
                  </div>
                </div>
              </li>
              <li className="image mb-[40px] float-left w-1/3 pl-[40px] item__">
                <div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
                  <div
                    className="entry tokyo_tm_portfolio_animation_wrap"
                    data-title="Gloria Jenkins"
                    data-category="Image"
                  >
                    <a className="zoom" href="assets/img/portfolio/3.jpg">
                      <img
                        className="opacity-0 min-w-full"
                        src="assets/img/thumbs/1-1.jpg"
                        alt="image"
                      />
                      <div
                        className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                        data-img-url="assets/img/portfolio/3.jpg"
                      />
                    </a>
                  </div>
                </div>
              </li>*/}
              <li className="detail mb-[40px] float-left w-1/3 pl-[40px] item__">
                <div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
                  <div
                    className="entry tokyo_tm_portfolio_animation_wrap"
                    data-title="PANTRA"
                    data-category="Personality Analysis through Natural Text Response Assessment"
                  >
                    <a
                      className="popup_info"
                      href="#"
                      onClick={() => {
                        setPortfolioDetailsModal(detailData[0]);
                        modalToggle(true);
                      }}
                    >
                      <img
                        className="opacity-0 min-w-full"
                        src="assets/img/thumbs/1-1.jpg"
                        alt="image"
                      />
                      <div
                        className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                        data-img-url="assets/img/portfolio/7.jpg"
                      />
                    </a>
                  </div>
                </div>
              </li>
              <li className="detail mb-[40px] float-left w-1/3 pl-[40px] item__">
                <div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
                  <div
                    className="entry tokyo_tm_portfolio_animation_wrap"
                    data-title="LazyStudent AI"
                    data-category="Finetuned Second-Order Recommendations"
                  >
                    <a
                      className="popup_info"
                      href="#"
                      onClick={() => {
                        setPortfolioDetailsModal(detailData[1]);
                        modalToggle(true);
                      }}
                    >
                      <img
                        className="opacity-0 min-w-full"
                        src="assets/img/thumbs/1-1.jpg"
                        alt="image"
                      />
                      <div
                        className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                        data-img-url="assets/img/portfolio/8.jpg"
                      />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
export default Portfolio;
