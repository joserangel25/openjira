import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/api/entries/')) {
    const id = pathname.split('/')[3]
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkMongoIDRegExp.test(id)) {
      console.log('el ID no es valido ' + id)
      const newUrl = req.nextUrl.clone();
      newUrl.pathname = '/api/bad-request'
      newUrl.search = `?msg=${id} is not valid MongoDB Id`
      return NextResponse.rewrite(newUrl)
    }
  }
  if (pathname.startsWith('/entries/')) {
    if (pathname.includes('favicon')) return
    const id = pathname.split('/')[2]
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkMongoIDRegExp.test(id)) {
      console.log('el ID no es valido ' + id)
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/entries/:id*', '/entries/:id*'],
}