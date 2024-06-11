import { Inter } from "next/font/google";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "./context/auth-context";


export const metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Uprolld",
  description:
    "",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "Uprolld",
    description:
      "",
    type: "website"
  },
  twitter: {
    card: "Uprolld",
    title: "Uprolld",
    description:
      ""
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
          </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
