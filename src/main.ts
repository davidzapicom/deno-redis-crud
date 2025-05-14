import { App, load } from '../deps.ts';
import { AppModule } from './app.module.ts';

await load({ export: true, allowEmptyValues: true });

const app = new App({ areas: AppModule });

const port = Number(Deno.env.get('PORT')) || 3000;
app.listen({ port });
