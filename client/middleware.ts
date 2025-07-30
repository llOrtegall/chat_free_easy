export { auth as middleware } from "@/auth"

// Proteger rutas específicas con el middleware en el Edge
export const config = {
  matcher: ["/dashboard/:path*"],
}