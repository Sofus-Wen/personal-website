/* A vertical sequence of steps, separated by a downward arrow. */
export default function Flow({ steps }) {
  return steps.map((step, i) => (
    <div key={step}>
      {i > 0 ? <p className="year-label">↓</p> : null}
      <p className="line">{step}</p>
    </div>
  ));
}
