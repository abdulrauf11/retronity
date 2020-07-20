export default {
  title: "Featured Visual",
  name: "featuredVisual",
  type: "document",
  fields: [
    {
      title: "Reference to free visual",
      name: "ref",
      type: "reference",
      to: [{ type: "freeVisual" }],
    },
    { title: "Quote", name: "quote", type: "text" },
    {
      title: "Poster",
      name: "poster",
      type: "image",
      options: {
        hotspot: true, // <-- Defaults to false
      },
    },
  ],
  preview: {
    select: {
      title: "ref.title", // if the movie has a director, follow the relation and get the name
      media: "poster", // Use the userPortait image field as thumbnail
    },
  },
}
