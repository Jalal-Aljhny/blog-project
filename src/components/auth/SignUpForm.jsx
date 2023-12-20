import { Eye, EyeSlash, WarningCircle } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const SignUpForm = () => {
  const { signUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSumbit = (data) => {
    signUp(data.email, data.password);
  };

  const [hidden1, setHidden1] = useState(true);
  const [focused1, setFocused1] = useState(false);

  const [hidden2, setHidden2] = useState(true);
  const [focused2, setFocused2] = useState(false);

  const handleHidden1 = () => {
    setHidden1((state) => !state);
  };

  const handleHidden2 = () => {
    setHidden2((state) => !state);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return re.test(email);
  };

  const validatePassword = (confirmValue) => {
    const password = watch("password");
    return password === confirmValue;
  };

  return (
    <Card className="p-4 bg-light" style={{ width: "25rem" }}>
      <Form onSubmit={handleSubmit(onSumbit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="Enter email"
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
          {errors.email?.type === "validate" && (
            <Form.Text className="text-danger ms-1">
              This email is not valid
            </Form.Text>
          )}
          {errors.email?.type === "required" && (
            <Form.Text className="text-danger ms-1">
              Email address can&apos;t be empty
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3 " controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div className="position-relative">
            <Form.Control
              type={hidden1 ? "password" : "text"}
              placeholder="Enter password"
              {...register("password", {
                pattern:
                  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
                required: true,
              })}
              onInput={() => {
                setFocused1(true);
              }}
            />
            {focused1 ? (
              <div
                className="position-absolute top-50 end-0  me-1 translate-middle"
                role="button"
                onClick={handleHidden1}
              >
                {hidden1 ? <Eye size={24} /> : <EyeSlash size={24} />}
              </div>
            ) : null}
            {errors.password && !focused1 && (
              <div className="position-absolute top-50 end-0  me-1 translate-middle">
                <WarningCircle size={24} color="#dc3545" />
              </div>
            )}
          </div>

          {errors.password?.type === "pattern" && (
            <Form.Text
              className="text-danger ms-1 "
              style={{ fontSize: "12px" }}
            >
              Your password should has at least 8 characters long , contains at
              least ( one lowercase letter , one uppercase letter , one digit ,
              one special character )
            </Form.Text>
          )}
          {errors.password?.type === "required" && (
            <Form.Text className="text-danger ms-1 ">
              Password can&apos;t be empty
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3 " controlId="formBasicPassword2">
          <Form.Label>Confirm Password</Form.Label>
          <div className="position-relative">
            <Form.Control
              type={hidden2 ? "password" : "text"}
              placeholder="Confirm your Password"
              {...register("password2", {
                validate: validatePassword,
                required: true,
              })}
              onInput={() => {
                setFocused2(true);
              }}
            />
            {focused2 ? (
              <div
                className="position-absolute top-50 end-0 me-1 translate-middle"
                role="button"
                onClick={handleHidden2}
              >
                {hidden2 ? <Eye size={24} /> : <EyeSlash size={24} />}
              </div>
            ) : null}
            {errors.password2 && !focused2 && (
              <div className="position-absolute top-50 end-0  me-1 translate-middle">
                <WarningCircle size={24} color="#dc3545" />
              </div>
            )}
          </div>
          {errors.password2?.type === "required" && (
            <Form.Text className="text-danger ms-1 ">
              You should confirm your password
            </Form.Text>
          )}
          {errors.password2?.type === "validate" ? (
            <Form.Text className="text-danger ms-1 ">
              It does not match the password
            </Form.Text>
          ) : null}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="d-block w-100 mt-4 fw-bold "
        >
          Sign Up
        </Button>

        <Link
          id="link"
          className="text-decoration-none mt-4 d-block w-75 ms-auto me-auto fs-6  rounded-pill btn btn-sm"
          to={"/login"}
        >
          Already have an account
        </Link>
      </Form>
    </Card>
  );
};

export default SignUpForm;
