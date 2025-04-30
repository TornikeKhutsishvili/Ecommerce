// server.ts

import { AngularAppEngine, createRequestHandler } from '@angular/ssr'
import { getContext } from '@netlify/angular-runtime/context.mjs'

const angularAppEngine = new AngularAppEngine()

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext()

  // აქ შეგიძლია დაამატო API endpoints სურვილისამებრ
  // const pathname = new URL(request.url).pathname
  // if (pathname === '/api/test') return Response.json({ ok: true })

  const result = await angularAppEngine.handle(request, context)
  return result || new Response('Not found', { status: 404 })
}

/**
 * Request handler used by Angular CLI (during dev-server or Netlify build)
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler)
