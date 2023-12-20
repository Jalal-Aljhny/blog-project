// import styles from "./NewPost.module.css";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FireBaseContext } from "../../context/FireBaseContext";
import { useNavigate } from "react-router-dom";
import styles from "./NewPost.module.css";
import useFetchCollection from "../../hooks/useFetchCollection";
import { Controller, useForm } from "react-hook-form";
import { WarningCircle } from "@phosphor-icons/react";

const NewPost = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const titleRef = useRef("");
  const excerptRef = useRef("");
  const imageRef = useRef("");
  const { db } = useContext(FireBaseContext);
  const { getData } = useFetchCollection();
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (loading & (time <= 2)) {
      let interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
      return () => {
        if (time > 2) {
          clearInterval(interval);
        }
      };
    }
  }, [loading, time]);

  const onSubmit = async () => {
    // e.preventDefault();

    const title = titleRef.current.value;
    const excerpt = excerptRef.current.value;
    const image = imageRef.current.value;
    const title_detail = title.split(" ").join("-") + "-" + Date.now();
    setLoading(true);
    try {
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        title,
        title_detail,
        excerpt,
        image,
        body,
        user: "JALAL",
        createdAt: serverTimestamp(),
      });

      titleRef.current.value = "";
      excerptRef.current.value = "";
      imageRef.current.value = "";
      setBody("");
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
    getData();
    navigate(`/blog/${title_detail}`);
  };

  const checkImage = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      const contentType = response.headers.get("content-type");
      if (contentType.startsWith("image/")) {
        return true;
      } else if (contentType.startsWith("binary/") && isClicked) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  };

  const validateBody = (body) => {
    if (body.length >= 100) {
      return true;
    } else {
      return false;
    }
  };
  const [isClicked, setIsClicked] = useState(false);

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col md="8" lg="6" className="mx-auto">
            <h2 className="mb-4">Add new Post</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formTilte">
                <Form.Label>Post Tilte</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    ref={titleRef}
                    type="text"
                    {...register("title", { required: true })}
                    placeholder="Enter post title"
                    className={errors.title ? "border border-danger" : ""}
                  />
                  {errors.title && (
                    <div className="position-absolute top-50 end-0  me-1 translate-middle">
                      <WarningCircle size={24} color="#dc3545" />
                    </div>
                  )}
                </div>
                {errors.title?.type === "required" ? (
                  <Form.Text className="text-danger ms-1">
                    You should enter post title
                  </Form.Text>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formExcerpt">
                <Form.Label>Post Excerpt</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    ref={excerptRef}
                    type="text"
                    {...register("excerpt", { required: true })}
                    placeholder="Enter post excerpt"
                    className={errors.title ? "border border-danger" : ""}
                  />
                  {errors.excerpt && (
                    <div className="position-absolute top-50 end-0  me-1 translate-middle">
                      <WarningCircle size={24} color="#dc3545" />
                    </div>
                  )}
                </div>
                {errors.excerpt?.type === "required" ? (
                  <Form.Text className="text-danger ms-1">
                    You should enter post excerpt
                  </Form.Text>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Post Image</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    ref={imageRef}
                    type="text"
                    {...register("image", {
                      required: true,
                      validate: checkImage,
                    })}
                    placeholder="Enter image url"
                    className={
                      !isClicked && errors.image ? "border border-danger" : ""
                    }
                  />
                  {!isClicked && errors.image && (
                    <div
                      className="position-absolute top-50 end-0  me-1 translate-middle btn p-0"
                      onClick={() => {
                        setIsClicked(true);
                      }}
                    >
                      <WarningCircle size={24} color="#dc3545" />
                    </div>
                  )}
                </div>
                {errors.image?.type === "required" ? (
                  <Form.Text className="text-danger ms-1">
                    You should enter image link for post
                  </Form.Text>
                ) : null}
                {!isClicked && errors.image?.type === "validate" ? (
                  <Form.Text className="text-danger ms-1">
                    This maybe is not link for an image if you sure that it is
                    an link then click on error icon
                  </Form.Text>
                ) : isClicked ? null : null}
              </Form.Group>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{ required: true, validate: validateBody }}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    value={body}
                    onChange={setBody}
                    {...field}
                    className={errors.description ? "border border-danger" : ""}
                  />
                )}
              />
              {errors.description?.type === "required" ? (
                <p className="text-danger ms-1" style={{ fontSize: "14px" }}>
                  You should enter post body
                </p>
              ) : null}
              {errors.description?.type === "validate" ? (
                <p className="text-danger ms-1" style={{ fontSize: "14px" }}>
                  Your post body should contains at least 100 characters
                </p>
              ) : null}
              <Button
                type="submit"
                className="mt-4 w-100 fw-bold text-uppercase"
                disabled={loading}
              >
                {loading ? "loading ..." : "submit"}
              </Button>
            </Form>
            {loading ? (
              <Alert
                variant="dark"
                className={`my-5 ${styles.alert}${
                  time > 2 ? styles.alert_active : ""
                }`}
              >
                if loading time longer than expected ... Maybe your country is
                blocked from firebase services , Turn on VPN and try again
              </Alert>
            ) : null}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewPost;
