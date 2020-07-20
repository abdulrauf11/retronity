export default {
  title: "Paid Visual",
  name: "paidVisual",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Vimeo Embed",
      name: "vimeo",
      type: "vimeo",
    },
    {
      title: "2Checkout Buy Code",
      name: "buyCode",
      type: "string",
    },
    {
      title: "Size",
      name: "size",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "1920X1080", value: "1920X1080" },
          { title: "1080X1080", value: "1080X1080" },
        ],
      },
    },
  ],
}
