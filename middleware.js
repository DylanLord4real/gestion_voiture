import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname;
  
  // En développement local, permettre l'accès direct aux routes /admin
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return NextResponse.next();
  }
  
  // Rediriger les requêtes admin vers le domaine admin dédié (production uniquement)
  if (pathname.startsWith('/admin')) {
    const adminUrl = new URL(request.url);
    adminUrl.hostname = 'admin-rahicoauto.vercel.app';
    adminUrl.pathname = pathname.replace('/admin', '');
    return NextResponse.redirect(adminUrl);
  }
  
  // Gérer les requêtes du sous-domaine admin
  if (hostname === 'admin-rahicoauto.vercel.app') {
    // Vérifier l'authentification pour les pages admin
    const authCookie = request.cookies.get('admin-auth');
    
    if (!authCookie && !pathname.startsWith('/login')) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // Réécrire l'URL pour servir les pages admin
    const url = request.nextUrl.clone();
    url.pathname = `/admin${pathname}`;
    
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
