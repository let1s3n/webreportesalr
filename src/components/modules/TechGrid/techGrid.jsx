import { Col, Row } from 'react-bootstrap';
import {
  TbBrandCss3,
  TbBrandFigma,
  TbBrandFlutter,
  TbBrandGit,
  TbBrandGolang,
  TbBrandHtml5,
  TbBrandJavascript,
  TbBrandLaravel,
  TbBrandMongodb,
  TbBrandMysql,
  TbBrandNextjs,
  TbBrandReact,
  TbBrandSass,
  TbBrandSketch,
} from 'react-icons/tb';
import styles from './techGrid.module.scss';
const TechGrid = () => {
  return (
    <Row className={styles.techGrid + ' g-0'}>
      <Col xs="auto" className="lh-1">
        <TbBrandReact className={styles.icon} />
      </Col>

      <Col xs="auto" className="lh-1">
        <TbBrandHtml5 className={styles.icon} />
      </Col>

      <Col xs="auto" className="lh-1">
        <TbBrandJavascript className={styles.icon} />
      </Col>

      <Col xs="auto" className="lh-1">
        <TbBrandCss3 className={styles.icon} />
      </Col>

      <Col xs="auto" className="lh-1">
        <TbBrandGit className={styles.icon} />
      </Col>

      <Col xs="auto" className="lh-1">
        <TbBrandNextjs className={styles.icon} />
      </Col>

      <Col xs="auto" className="lh-1">
        <TbBrandMysql className={styles.icon} />
      </Col>

      <Col xs="auto" className="lh-1">
        <TbBrandMongodb className={styles.icon} />
      </Col>

      <Col xs="auto" className="lh-1">
        <TbBrandLaravel className={styles.icon} />
      </Col>

      <Col xs="auto" className="lh-1">
        <TbBrandSass className={styles.icon} />
      </Col>

      <Col xs="auto" className="lh-1">
        <TbBrandSketch className={styles.icon} />
      </Col>

      <Col xs="auto" className="lh-1">
        <TbBrandFigma className={styles.icon} />
      </Col>

      <Col xs="auto" className="lh-1">
        <TbBrandFlutter className={styles.icon} />
      </Col>

      <Col xs="auto" className="lh-1">
        <TbBrandGolang className={styles.icon} />
      </Col>
    </Row>
  );
};

export default TechGrid;
