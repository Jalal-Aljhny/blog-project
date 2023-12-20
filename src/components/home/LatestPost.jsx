import { useContext, useEffect, useRef } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../context/PostsContext";
import PostCard from "../blog/PostCard";

const LatestPost = () => {
  const navigate = useNavigate();
  const { fetchData, data, loading, error } = useContext(PostsContext);
  const isMount = useRef(false);

  useEffect(() => {
    if (!isMount.current) {
      fetchData();
      isMount.current = true;
    }
  }, [fetchData]);

  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center fw-bold mb-5">Latest Articles</h2>
        {loading ? (
          <div className="d-flex align-center justify-content-center">
            <Spinner animation="grow" />
          </div>
        ) : null}
        {error ? (
          <>
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          </>
        ) : null}

        {!loading && !error && Array.isArray(data) && data.length ? (
          <>
            <Row sm="1" md="2" lg="4" className="g-4">
              {data.slice(0, 4).map((card) => (
                <Col key={card.id}>
                  <PostCard post={card} />
                </Col>
              ))}
            </Row>
            <div className="mt-4 text-center">
              <Button
                variant="outline-dark"
                className="px-5 mt-4"
                onClick={() => {
                  navigate("/blog");
                }}
              >
                See all
              </Button>
            </div>
          </>
        ) : null}
        {!loading && !error && Array.isArray(data) && !data.length ? (
          <>
            <Alert variant="dark" className="my-5">
              It seems your country is blocked from firebase services , Turn on
              VPN and enter to this link again (
              <span className="fw-bold">refresh the page will not work</span> )
              or Turn on VPN then click this button below
            </Alert>
            <Button
              variant="success"
              className="mt-3 mx-auto p-3 fw-bold text-uppercase d-block"
              onClick={() => {
                window.location.reload(true);
              }}
            >
              Refresh with clean cash
            </Button>
          </>
        ) : null}
      </Container>
    </section>
  );
};

export default LatestPost;
