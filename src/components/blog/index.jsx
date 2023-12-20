import { useContext, useEffect, useRef } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { PostsContext } from "../../context/PostsContext";
import PostCard from "./PostCard";
const PostContainer = () => {
  const { fetchData, data, loading, error, fetchNextData, fetching } =
    useContext(PostsContext);
  const isMount = useRef(false);
  const divObserver = useRef(null);

  useEffect(() => {
    if (!isMount.current) {
      fetchData();
      isMount.current = true;
    }
  }, [fetchData]);
  useEffect(() => {
    const testDiv = divObserver.current;

    const observer = new IntersectionObserver((entry) => {
      const testerDiv = entry[0];
      if (testerDiv.isIntersecting) {
        fetchNextData();
      }
    }, {});

    if (divObserver.current) {
      observer.observe(testDiv);
    }
    return () => {
      observer.unobserve(testDiv);
    };
  }, [data, divObserver, fetchNextData]);
  return (
    <section className="py-5">
      <h2 className="mb-5 text-center">Latest Posts</h2>
      <Container>
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
        {!loading && !error && Array.isArray(data) && data.length > 0 ? (
          <>
            <Row sm="1" md="2" lg="4" className="g-4">
              {data.map((card) => (
                <Col key={card.id}>
                  <PostCard post={card} />
                </Col>
              ))}
            </Row>
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
        {fetching && <p className="text-center my-4">loading ...</p>}
        <div ref={divObserver}></div>
      </Container>
    </section>
  );
};

export default PostContainer;
