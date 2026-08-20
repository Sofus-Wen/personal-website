export default function Section({ title, children }) {
  return (
    <section className="block">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
