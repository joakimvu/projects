const lessontext = {
  title: "Lesson text",
  name: "lessontext",
  type: "object",
  fields: [
    {
      title: "Text",
      name: "text",
      type: "array",
      of: [
        {
          title: "Content Text",
          name: "contenttext",
          type: "object",
          fields: [
            {
              name: "content",
              title: "Content",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};

export default lessontext;
