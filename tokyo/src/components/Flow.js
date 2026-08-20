import { Fragment } from "react";

/* A vertical sequence of steps, separated by a downward arrow. Even spacing
   between every step and arrow, so it reads at the same rhythm as the rest
   of the page. */
export default function Flow({ steps }) {
  return (
    <div className="flow">
      {steps.map((step, i) => (
        <Fragment key={step}>
          {i > 0 ? <p className="year-label">↓</p> : null}
          <p className="line">{step}</p>
        </Fragment>
      ))}
    </div>
  );
}
