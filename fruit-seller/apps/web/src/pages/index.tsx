import useSession from "@/auth/use-session";

export default function Home() {
	const { session } = useSession();
	console.log(session);
	return (
		<div>
			<h1>Hello World</h1>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</div>
	);
}
