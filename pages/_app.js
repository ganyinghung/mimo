
import { ThirdwebProvider } from "@3rdweb/react";
import { Grommet } from 'grommet';

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider 
      connectors={{injected:{}}} 
      supportedChainIds={[4]}
    >
      <Grommet plain>
        <Component {...pageProps} />
      </Grommet>)
    </ThirdwebProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp