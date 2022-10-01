const Todo = ({ id, title, content, removeTodo }) => {
  return (
    <section className="todo">
      <h3>{title}</h3>
      <p>{content}</p>
      <button type="button" id="btn" onClick={() => removeTodo(id)}>
        Complete
      </button>
    </section>
  );
};

export default Todo;
