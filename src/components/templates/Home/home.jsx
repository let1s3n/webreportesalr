import styles from './home.module.scss';
import useWindowDimensions from '@/hooks/useWindowDimensions';
const Home = () => {
  const { width, height } = useWindowDimensions();
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
