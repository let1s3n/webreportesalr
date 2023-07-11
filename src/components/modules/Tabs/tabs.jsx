import Image from 'next/image';
import { Fade } from "react-awesome-reveal";
import { Col, Row, Tabs } from 'react-bootstrap';
import Tab from '../../elements/Tab/tab';
import styles from './tabs.module.scss';
const tabs = () => {
  return (
    <Tabs defaultActiveKey="web"
      id="uncontrolled-tab-example"
      className="mb-10"
      style={{ columnGap: "56px" }}
    >
      <Tab eventKey="web" title="DESARROLLO WEB" style={{ rowGap: "72px" }} className="overflow-hidden">
        {/* <h1 className="text-black">WEB</h1> */}
        <Fade direction="down" triggerOnce="true" cascade>
          <Row className={styles.customRow + " g-0"} style={{ columnGap: "118px" }}>

            <Col xs="auto">
              <Image
                alt="project 1 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto1.png`}
                width={364}
                height={279}
              />
            </Col>
            <Col xs="auto">
              <Image
                alt="project 2 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto2.png`}
                width={364}
                height={279}
              />
            </Col>

          </Row>
        </Fade>

        <Fade direction="down" triggerOnce="true" cascade>
          <Row className={styles.customRow + " g-0"} style={{ columnGap: "118px" }}>

            <Col xs="auto">
              <Image
                alt="project 3 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto3.png`}
                width={364}
                height={279}
              />
            </Col>
            <Col xs="auto">
              <Image
                alt="project 4 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto4.png`}
                width={364}
                height={279}
              />
            </Col>

          </Row>
        </Fade>

      </Tab>
      <Tab eventKey="software" title="DESARROLLO DE SOFTWARE" style={{ rowGap: "72px" }} className="overflow-hidden">
        <Fade direction="down" triggerOnce="true" cascade>
          <Row className={styles.customRow + " g-0"} style={{ columnGap: "118px" }}>

            <Col xs="auto">
              <Image
                alt="project 1 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto1.png`}
                width={364}
                height={279}
              />
            </Col>
            <Col xs="auto">
              <Image
                alt="project 2 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto2.png`}
                width={364}
                height={279}
              />
            </Col>

          </Row>
        </Fade>

        <Fade direction="down" triggerOnce="true" cascade>
          <Row className={styles.customRow + " g-0"} style={{ columnGap: "118px" }}>

            <Col xs="auto">
              <Image
                alt="project 3 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto3.png`}
                width={364}
                height={279}
              />
            </Col>
            <Col xs="auto">
              <Image
                alt="project 4 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto4.png`}
                width={364}
                height={279}
              />
            </Col>

          </Row>
        </Fade>
      </Tab>
      <Tab eventKey="moviles" title="APLICACIONES MÓVILES" style={{ rowGap: "72px" }} className="overflow-hidden">

        <Fade direction="down" triggerOnce="true" cascade>
          <Row className={styles.customRow + " g-0"} style={{ columnGap: "118px" }}>

            <Col xs="auto">
              <Image
                alt="project 1 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto1.png`}
                width={364}
                height={279}
              />
            </Col>
            <Col xs="auto">
              <Image
                alt="project 2 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto2.png`}
                width={364}
                height={279}
              />
            </Col>

          </Row>
        </Fade>

        <Fade direction="down" triggerOnce="true" cascade>
          <Row className={styles.customRow + " g-0"} style={{ columnGap: "118px" }}>

            <Col xs="auto">
              <Image
                alt="project 3 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto3.png`}
                width={364}
                height={279}
              />
            </Col>
            <Col xs="auto">
              <Image
                alt="project 4 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto4.png`}
                width={364}
                height={279}
              />
            </Col>

          </Row>
        </Fade>
      </Tab>
      <Tab eventKey="redes" title="REDES SOCIALES" style={{ rowGap: "72px" }} className="overflow-hidden">

        <Fade direction="down" triggerOnce="true" cascade>
          <Row className={styles.customRow + " g-0"} style={{ columnGap: "118px" }}>

            <Col xs="auto">
              <Image
                alt="project 1 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto1.png`}
                width={364}
                height={279}
              />
            </Col>
            <Col xs="auto">
              <Image
                alt="project 2 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto2.png`}
                width={364}
                height={279}
              />
            </Col>

          </Row>
        </Fade>

        <Fade direction="down" triggerOnce="true" cascade>
          <Row className={styles.customRow + " g-0"} style={{ columnGap: "118px" }}>

            <Col xs="auto">
              <Image
                alt="project 3 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto3.png`}
                width={364}
                height={279}
              />
            </Col>
            <Col xs="auto">
              <Image
                alt="project 4 image"
                src={`${process.env.NEXT_PUBLIC_CDN}images/projects/proyecto4.png`}
                width={364}
                height={279}
              />
            </Col>

          </Row>
        </Fade>
      </Tab>

    </Tabs>
  )
}

export default tabs