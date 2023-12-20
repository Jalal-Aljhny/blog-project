import { useParams } from "react-router-dom";
import useFetchDocParams from "../../hooks/useFetchDocParams";
import { useEffect, useRef } from "react";
import { Alert, Card, Container } from "react-bootstrap";
const Article = () => {
  const params = useParams();
  const { getData, loading, error, data } = useFetchDocParams(
    "posts",
    params.title_detail
  );

  const isMount = useRef(false);
  useEffect(() => {
    if (!isMount.current) {
      getData();
    }
    isMount.current = true;
  }, [getData]);

  if (loading) return <p className="my-4 text-center">loading ...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!data) return null;

  return (
    <article className="article ">
      <div className="article-img ">
        <img
          src={data.image}
          alt={data.title}
          className="w-100 object-fit-cover"
          style={{ height: "400px" }}
        />
      </div>
      <Container style={{ marginTop: "-50px" }}>
        <Card>
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Subtitle className="mt-2 text-muted">
              <small className="me-4">By : {data.user}</small>
              <small>on : {data?.createdAt?.toDateString() || 0}</small>
            </Card.Subtitle>
            <div
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          </Card.Body>
        </Card>
      </Container>
    </article>
  );
};

export default Article;
