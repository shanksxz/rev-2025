import Providers from "@/providers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#556cd6",
//     },
//     secondary: {
//       main: "#19857b",
//     },
//   },
// });

export default function App({ Component, pageProps }: AppProps) {
	return (
		// <ThemeProvider theme={theme}>
		// <CssBaseline />
		<Providers>
			<Component {...pageProps} />
		</Providers>
		// </ThemeProvider>
	);
}
