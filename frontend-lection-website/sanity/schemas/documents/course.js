const course = {
  title: "Course",
  name: "course",
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
      title: "Description",
      name: "description",
      type: "text",
    },
    {
      name: "Lessons",
      type: "array",
      of: [
        {
          // title: "Lessons",
          // name: "lessons",
          type: "reference",
          to: [{ type: "lessons" }],
        },
      ],
    },
    {
      title: "Category",
      name: "category",
      type: "string",
    },
  ],
};

export default course;
