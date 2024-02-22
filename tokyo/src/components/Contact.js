import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import ContactForm from "./contact/ContactForm";
import Map from "./contact/Map";
const Contact = () => {
  return (
    <SectionContainer name={"contact"}>
      <div className="container">
        <div className="tokyo_tm_contact w-full float-left clear-both h-auto py-[100px] px-[0px]">
          <div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
            <div className="title_flex w-full h-auto clear-both flex justify-between items-end">
              <SectionTitle pageName={"Contact"} title={"Get in Touch"} />
            </div>
          </div>
          <Map />
          /* First make sure that you have installed the package */

          /* If you are using yarn */
          // yarn add @calcom/embed-react

          /* If you are using npm */
          // npm install @calcom/embed-react

          import Cal, { getCalApi } from "@calcom/embed-react";
          import { useEffect } from "react";
          export default function MyApp() {
        	useEffect(()=>{
        	  (async function () {
        		const cal = await getCalApi();
        		cal("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
        	  })();
        	}, [])
        	return <Cal
        	  calLink="sofuswenoee/sofus-1-on-1"
        	  style={{width:"100%",height:"100%",overflow:"scroll"}}
        	  config={{layout: 'month_view'}}


        	/>;
          };

          <ContactForm />
        </div>
      </div>
    </SectionContainer>
  );
};
export default Contact;
