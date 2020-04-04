import { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import '../styles.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}