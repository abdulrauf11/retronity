export default {
  title: "Free Visual",
  name: "freeVisual",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      title: "Vimeo Embed",
      name: "vimeo",
      type: "vimeo",
    },
    {
      title: "Download Link",
      name: "downloadLink",
      type: "url",
    },
  ],
}
