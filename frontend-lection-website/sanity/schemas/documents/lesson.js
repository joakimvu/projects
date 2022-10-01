const lesson = {
  title: "Lesson",
  name: "lessons",
  type: "document",
  fields: [
    { title: "Title", name: "title", type: "string" },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      title: "Preamble",
      name: "preamble",
      type: "text",
    },

    {
      title: "Lesson Text",
      name: "body",
      type: "lessontext",
    },
    {
      title: "Order",
      name: "order",
      type: "number",
    },
  ],
};

export default lesson;
