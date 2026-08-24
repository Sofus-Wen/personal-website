import { Fragment } from "react";

import Link from "./Link";

/* A vertical sequence of steps, separated by a downward arrow. Even spacing
   between every step and arrow, so it reads at the same rhythm as the rest
   of the page. A step is a string, or {text, href} to link the whole step. */
export default function Flow({ steps }) {
  return (
    <div className="flow">
      {steps.map((step, i) => (
        <Fragment key={step.text || step}>
          {i > 0 ? <p className="year-label">↓</p> : null}
          <p className="line">
            {step.href ? <Link href={step.href}>{step.text}</Link> : step}
          </p>
        </Fragment>
      ))}
    </div>
  );
}
