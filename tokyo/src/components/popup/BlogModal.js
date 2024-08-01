import { TokyoContext } from "@/src/Context";
import { useContext } from "react";
import ModalContainer from "./ModalContainer";

const BlogModal = () => {
  const { blogModal, setBlogModal } = useContext(TokyoContext);
  return (
    <ModalContainer nullValue={setBlogModal}>
      <div className="image relative overflow-hidden">
        <img
          className="min-w-full opacity-0"
          src="assets/img/thumbs/40-25.jpg"
          alt="image"
        />
        <div
          className="main absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
          data-img-url={blogModal.image}
          style={{ backgroundImage: `url(${blogModal.image})` }}
        />
        <a className="tokyo_tm_full_link" href="#" />
      </div>
      <div className="details w-full float-left px-[40px] pt-[30px] pb-[25px] bg-white transition-all duration-300">
        <div className="extra flex items-center justify-between mb-[25px] relative">
          <div className="short">
            <p className="date font-montserrat text-[13px] text-[#767676]">
              By{" "}
              <a
                className="text-[#767676] transition-all duration-300 hover:text-black"
                href="#"
              >
                {blogModal.author}
              </a>{" "}
              <span className="relative">{blogModal.date}</span>
            </p>
          </div>
        </div>
        <h3 className="title mb-[10px] leading-[1.4]">{blogModal.title}</h3>
      </div>
      {/* Blog Popup Start */}
      <div className="main_content w-full float-left">
        <div className="descriptions w-full float-left">
          <p className="bigger text-[#888] text-[20px] mb-[31px]">
            {blogModal.content.intro}
          </p>
          {blogModal.content.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-[22px]">
              {paragraph}
            </p>
          ))}
          <div className="quotebox w-full clear-both float-left h-auto relative pl-[70px] mb-[24px]">
            <div className="icon absolute left-0 top-[5px]">
              <i className="icon-quote-left text-[40px] text-black" />
            </div>
            <p className="text-[20px]">
              {blogModal.content.quote}
            </p>
          </div>
          <p>
            {blogModal.content.conclusion}
          </p>
        </div>
      </div>
      {/* /Blog Popup End */}
    </ModalContainer>
  );
};

export default BlogModal;