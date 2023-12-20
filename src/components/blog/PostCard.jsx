import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import styles from "./PostCard.module.css";

const PostCard = ({ post }) => {
  return (
    <Link to={`/blog/${post.title_detail}`} className={styles.card_link}>
      <Card>
        <div className={styles.image}>
          <Card.Img variant="top" src={post.image} />
          <div className={styles.image_info}>
            <small> By : {post.user}</small>
            <small>{post.createdAt.toDateString()}</small>
          </div>
        </div>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.excerpt}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};
PostCard.propTypes = {
  post: PropTypes.shape({
    title_detail: PropTypes.string,
    image: PropTypes.string,
    user: PropTypes.string,
    title: PropTypes.string,
    createdAt: PropTypes.object,
    excerpt: PropTypes.string,
  }),
};

export default PostCard;
