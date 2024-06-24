import MenuBar from "@/components/MenuBar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <>
    <MenuBar />
    <div className="max-w-7xl mx-auto mt-4">
      <Component {...pageProps} />
    </div>
  </>
}
