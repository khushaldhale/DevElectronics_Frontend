import withForm from "../hoc/withForm";
import { login } from "../redux/slices/authSlice";

const Login = ({ changeHandler, submitHandler, formData }) => {
  return (
    <div onSubmit={submitHandler}>
      <p>Login Form</p>
      <form>
        <input
          type="email"
          name="email"
          placeholder="Enter the Email"
          onChange={changeHandler}
          value={formData.email}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter the password"
          onChange={changeHandler}
          value={formData.password}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default withForm(
  Login,
  {
    email: "",
    password: "",
  },
  login,
  "/dashboard"
);
