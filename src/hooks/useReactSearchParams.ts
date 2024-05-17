import { useSearchParams } from 'react-router-dom';

export default function useReactSearchParams(): [
  URLSearchParams,
  (params: Record<string, string>) => void
] {
  const [searchParams, setInteralSearchParams] = useSearchParams();
  const setSearchParams = (urls: Record<string, string>) => {
    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    setInteralSearchParams({
      ...params,
      ...urls
    })
  }

  return [searchParams, setSearchParams];
}
