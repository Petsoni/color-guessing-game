import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section>
      <h2>Color guessing game</h2>
    </section>
  )
}
