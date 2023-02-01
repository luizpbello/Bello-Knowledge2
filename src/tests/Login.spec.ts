import { Login } from "../pages/Login";
import { render, screen } from "@testing-library/react";

jest.mock("react", () => {
  const actualReact = jest.requireActual("react");
  return {
    ...actualReact,
    useState: jest.fn((init) => [init, jest.fn()]),
    useEffect: jest.fn(),
  };
});

jest.mock("react-redux", () => {
  return {
    useDispatch: jest.fn(),
  };
});

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  };
});

describe("Login", () => {
  test("should render correctly", () => {

    render(Login());
    expect(screen.getByText("Registre-se")).toBeTruthy()


  });
});
