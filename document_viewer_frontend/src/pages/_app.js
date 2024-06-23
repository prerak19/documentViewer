import NavBar from "@/components/NavBar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <NavBar />
    <Component {...pageProps} />
  </div>
}
