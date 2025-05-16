import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay?: number) {
  const [debValue, setDebValue] = useState<T>(value);

  useEffect(() => {
    const foo = setTimeout(() => setDebValue(value), delay || 1000);
    return () => clearTimeout(foo);
  }, [value, delay]);

  return debValue;
}
