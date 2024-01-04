import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))
app.get('/button', (c) => c.render(<button>{c.status}</button>))

export default app
