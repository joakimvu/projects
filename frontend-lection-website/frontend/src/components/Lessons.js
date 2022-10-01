import Title from './Title'

export default function Lessons({ ingress, title, body }) {
  return (
    <div>
      <Title title={title} />
      <p id="ingressText" data-testid="lesson_preAmble">
        {ingress}
      </p>
      {body &&
        body?.text?.map((text) => (
          <p key={text._key} data-testid="lesson_text">
            {text.content}
          </p>
        ))}
    </div>
  )
}
