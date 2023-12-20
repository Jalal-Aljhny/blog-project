import { Button, Container } from "react-bootstrap";
import styles from "./NotFound.module.css";
import notFoundImg from "../../assets/images/not-found.png";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.not_found}>
      <Container>
        <div className={styles.not_found_items}>
          <img src={notFoundImg} alt="Not Found" />
          <h1>Page Not Found</h1>
          <Button
            variant="outline-secondary"
            size="lg"
            className="px-5"
            onClick={() => {
              navigate("/");
            }}
          >
            go home
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Index;
