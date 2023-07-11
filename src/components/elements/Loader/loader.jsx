import { Image } from 'react-bootstrap';
import styles from './loader.module.scss';

const Loader = (props: any) => {
  return (
    <div
      className={
        props.loading
          ? styles.loader +
            styles.pulse +
            ' d-flex justify-content-center pt-18'
          : 'd-none'
      }
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_CDN}images/general/logo2.png`}
        alt="logo loader"
        width={200}
        height={200}
      />
    </div>
  );
};

export default Loader;
