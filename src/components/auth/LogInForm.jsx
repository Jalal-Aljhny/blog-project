import { Eye, EyeSlash, WarningCircle } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";

const LogInForm = () => {
  const { logIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [sumbitError, setSumbitError] = useState(null);
  const onSumbit = async (data) => {
    try {
      await logIn(data.email, data.password);
    } catch (error) {
      setSumbitError("Make sure your email and your password");
    }
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return re.test(email);
  };

  const [hidden, setHidden] = useState(true);
  const [focused, setFocused] = useState(false);

  const handleHidden = () => {
    setHidden((state) => !state);
  };

  return (
    <Card
      className={`p-4 bg-light ${sumbitError ? "border border-danger" : null}`}
      style={{ width: "25rem" }}
    >
      <Form onSubmit={handleSubmit(onSumbit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <div className="position-relative">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: validateEmail,
              })}
              className={errors.email ? "border border-danger" : ""}
            />
            {errors.email && (
              <div className="position-absolute top-50 end-0  me-1 translate-middle">
                <WarningCircle size={24} color="#dc3545" />
              </div>
            )}
          </div>
          {errors.email?.type === "required" && (
            <Form.Text className="text-danger ms-1">Enter your email</Form.Text>
          )}
          {errors.email?.type === "validate" && (
            <Form.Text className="text-danger ms-1">
              This email is not valid
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3 " controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div className="position-relative">
            <Form.Control
              type={hidden ? "password" : "text"}
              onInput={() => {
                setFocused(true);
              }}
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className={errors.email ? "border border-danger" : ""}
            />
            {errors.password && !focused && (
              <div className="position-absolute top-50 end-0  me-1 translate-middle">
                <WarningCircle size={24} color="#dc3545" />
              </div>
            )}
            {focused ? (
              <div
                className="position-absolute top-50 end-0 me-1 translate-middle"
                role="button"
                onClick={handleHidden}
              >
                {hidden ? <Eye size={24} /> : <EyeSlash size={24} />}
              </div>
            ) : null}
          </div>
          {errors.password?.type === "required" && !focused && (
            <Form.Text className="text-danger ms-1">
              Enter your password
            </Form.Text>
          )}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="d-block w-100 mt-4 fw-bold"
        >
          Log In
        </Button>
      </Form>
      {sumbitError && (
        <Alert className="r mt-4 p-1 text-center" variant="danger">
          {sumbitError}
        </Alert>
      )}
    </Card>
  );
};

export default LogInForm;
