/* eslint-disable react-dom/no-unsafe-iframe-sandbox */
// import MainForm from './main-form';

// export default function PerscriptionPage() {
//   return <MainForm />;
// }

export default function AutoloadPage() {
  return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe
      src="http://172.16.2.254:1880/ui/#!/3?socketid=ZuOUa2oSY-DjCHdqAAAT"
      frameBorder="0"
      width="100%"
      height="100%"
      allowFullScreen
      sandbox="allow-scripts allow-same-origin"
    >
    </iframe>
  );
}
