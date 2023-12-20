import { Button, Col, Container, Row } from "react-bootstrap";
import logoImg from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row>
          <Col sm="12" md="10" lg="8" className="mx-auto">
            <div className="d-flex flex-column align-items-center">
              <img className={styles.logo_img} src={logoImg} alt="logo" />
              <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
                aut laborum at error quod eum delectus ea saepe expedita labore?
                Voluptatibus iste nemo maxime fuga!
              </p>
              <div className="mt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    navigate("/blog/new");
                  }}
                >
                  Add new post
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
