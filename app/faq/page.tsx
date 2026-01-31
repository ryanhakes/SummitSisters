const faqs = [
  {
    question: "Do I need hiking experience?",
    answer: "No. We welcome beginners and offer a variety of difficulty levels with supportive leaders."
  },
  {
    question: "What is a healing hike?",
    answer: "It is a gentle, faith-forward outdoor gathering designed for women healing from trauma or hardship."
  },
  {
    question: "What is your cancellation policy?",
    answer: "If you need to cancel, let us know at least 48 hours before the event so we can release your spot."
  },
  {
    question: "How do you use my information?",
    answer: "We use your registration details only to coordinate the event and keep you safe. We never sell your data."
  }
];

export default function FAQPage() {
  return (
    <section className="section">
      <h1 className="text-3xl font-bold text-pine">Frequently Asked Questions</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {faqs.map((faq) => (
          <div key={faq.question} className="card">
            <h2 className="text-lg font-semibold text-pine">{faq.question}</h2>
            <p className="mt-3 text-sm text-pine/70">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
