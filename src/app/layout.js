import { Heebo } from 'next/font/google'
import './globals.css'
import { Toaster } from "react-hot-toast";

const heebo = Heebo({ subsets: ['latin'] })

export const metadata = {
  title: 'Helperzz.com',
  description: 'Helperzz',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={heebo.className}>
        <Toaster/>
        {children}
      </body>
    </html>
  )
}
