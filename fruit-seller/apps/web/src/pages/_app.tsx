import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import Providers from '../providers';
import { createQueryClient } from '@/lib/react-query';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};


export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);
	return (
		<QueryClientProvider client={createQueryClient()}>
			<Providers>{getLayout(<Component {...pageProps} />)}</Providers>
		</QueryClientProvider>
	);
}
