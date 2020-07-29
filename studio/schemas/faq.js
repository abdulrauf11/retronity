export default {
  title: "FAQ",
  name: "faq",
  type: "document",
  fields: [
    { title: "Question", name: "question", type: "string" },
    {
      title: "Answer",
      name: "answer",
      type: "array",
      of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }] }],
    },
  ],
}
