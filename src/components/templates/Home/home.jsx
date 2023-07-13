import styles from './home.module.scss';
import { Container, Image } from 'react-bootstrap';
import useWindowDimensions from '@/hooks/useWindowDimensions';
const Home = () => {
  const { width, height } = useWindowDimensions();
  return (
    <Container>
      <h1>Home</h1>
    </Container>
  );
};

export default Home;
