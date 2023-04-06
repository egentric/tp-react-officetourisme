import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = (data) => {
    console.log(data);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="boxLoginRegister text-center p-5">
            <BsFillPersonFill size={60} className="mb-4" />
            <h1 className="mb-4">Se connecter</h1>
            <Form onSubmit={handleSubmit(login)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Votre mail</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email", {
                    required: "Veuillez saisir un email",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Veuillez saisir un email valide",
                    },
                  })}
                  placeholder="Enter email"
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Ce champ est requis",
                      minLength: {
                        value: 5,
                        message: "Longueur minimale de 5 caractères",
                      },
                      pattern: {
                        value:
                          /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%^&])/,
                        message:
                          "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractère spéciale",
                      },
                    })}
                    isInvalid={errors.password}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                    </button>
                  </div>
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
              <Button variant="primary" type="submit" className="button-87">
                Connexion
              </Button>
            </Form>
            <p className="mt-3">
              Pas de compte ? <a href="/registerAssmat">Inscrivez-vous</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
