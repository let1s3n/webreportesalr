import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import styles from './customForm.module.scss';
const CustomForm = ({ bgInput }) => {
  return (
    <Form className={styles.customForm}>
      <Row
        className="g-0 mb-5"
        style={{
          marginBottom: '36px',
          columnGap: '1.5rem',
          rowGap: '1.5rem',
        }}
      >
        <Col xs={12} xl="auto" className="position-relative">
          <FloatingLabel
            controlId="floatingName"
            label="Nombre completo"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Nombre completo"
              className={bgInput}
            />
          </FloatingLabel>
        </Col>

        <Col xs={12} xl="auto" className="position-relative">
          <FloatingLabel
            controlId="floatingCompany"
            label="Company"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Company"
              className={bgInput}
            />
          </FloatingLabel>
        </Col>

        <Col xs={12} xl="auto" className="position-relative">
          <FloatingLabel
            controlId="floatingEmail"
            label="Correo eléctronico"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="Correo eléctronico"
              className={bgInput}
            />
          </FloatingLabel>
        </Col>

        <Col xs={12} xl="auto" className="position-relative">
          <FloatingLabel
            controlId="floatingPhone"
            label="Número de contacto"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Número de contacto"
              className={bgInput}
            />
          </FloatingLabel>
        </Col>

        <Col xs={12} className="position-relative">
          <FloatingLabel
            controlId="floatingMessage"
            label="Mensaje"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Mensaje"
              style={{ height: '126px' }}
              className={bgInput}
            />
          </FloatingLabel>
        </Col>
      </Row>

      <div className={styles.customButtonContainer + ' position-relative'}>
        {/* <Link href="/contacto" passHref> */}
        <Button type="submit" variant="link" className={styles.customButton}>
          ENVIAR AHORA
        </Button>
        {/* </Link> */}
        <div className={styles.buttonDecoration}></div>
      </div>
    </Form>
  );
};

export default CustomForm;
