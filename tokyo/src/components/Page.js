import Head from "next/head";
import Header from "./Header";
import { NAME } from "../content";

/* Shared shell for every page below the homepage. */
export default function Page({ title, children }) {
  return (
    <>
      <Head>
        <title>{`${title} - ${NAME}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />
      <hr />

      <main className="container">
        <div className="block">
          <h2>{title}</h2>
          {children}
        </div>
      </main>
    </>
  );
}
