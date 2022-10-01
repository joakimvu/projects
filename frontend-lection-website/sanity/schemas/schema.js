// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import lessontext from "../schemas/object/lessontext";
import lesson from "../schemas/documents/lesson";
import course from "../schemas/documents/course";
import user from "../schemas/documents/user";
import comment from "../schemas/documents/comment";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    lessontext,
    lesson,
    course,
    user,
    comment,
  ]),
});
