// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import MobileDetect from 'mobile-detect';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const originalPath = url.pathname;
  if (
    originalPath.startsWith('/api') ||
    originalPath.startsWith('/_next') ||
    originalPath.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }
  const userAgent = request.headers.get('user-agent') || '';
  const md = new MobileDetect(userAgent);

  if (md.mobile()) {
    url.pathname = `/mobile${originalPath}`;
  } else {
    url.pathname = `/desktop${originalPath}`;
  }

  return NextResponse.rewrite(url);
}
