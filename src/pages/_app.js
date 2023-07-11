import "@/sass/app.scss";
import DefaultLayout from "@/components/layout/DefaultLayout/defaultLayout";
export default function App({ Component, pageProps }) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}
