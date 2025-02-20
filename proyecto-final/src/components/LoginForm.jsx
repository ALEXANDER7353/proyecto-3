// src/components/LoginForm.jsx

import useForm from "../hooks/useForm";

const LoginForm = ({ onSubmit }) => {
  const initialValues = { username: "", password: "" };
  const validationRules = {
    username: { required: true },
    password: { required: true },
  };

  const { values, errors, handleChange, validate, resetForm } =
    useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(validationRules)) {
      onSubmit(values);
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre de usuario:</label>
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;
