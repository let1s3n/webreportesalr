
import { useRouter } from 'next/navigation';

const usePathname = () => {
  const location = useRouter();
  return location.pathname;
}
export default usePathname;