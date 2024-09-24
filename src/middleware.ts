// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import MobileDetect from 'mobile-detect';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const md = new MobileDetect(userAgent);

  const url = request.nextUrl.clone();
  const originalPath = url.pathname;

  if (originalPath.startsWith('/_next')) {
    return NextResponse.next();
  }

  if (md.mobile()) {
    url.pathname = `/mobile${originalPath}`;
  } else {
    url.pathname = `/desktop${originalPath}`;
  }

  return NextResponse.rewrite(url);
}
