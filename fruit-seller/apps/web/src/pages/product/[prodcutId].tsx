import { useRouter } from "next/router";

export default function Page() {
	const router = useRouter();
	const { prodcutId } = router.query;
	return <div>Product: {prodcutId}</div>;
}
