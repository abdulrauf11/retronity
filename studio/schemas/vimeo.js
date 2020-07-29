export default {
  title: "Vimeo Embed",
  name: "vimeo",
  type: "array",
  validation: Rule => Rule.length(1).error("Cannot add more than one video"),
  of: [
    {
      type: "videoUrl",
    },
  ],
}
