import MenuBar from "@/components/MenuBar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <>
    <MenuBar />
    <div className="max-w-7xl bg-gray-50 mx-auto py-6 sm:px-6 lg:px-8 mt-4 rounded-md">
      <Component {...pageProps} />
    </div>
  </>
}
