import { ChangeEvent, FormEvent, useState } from "react";
import { fields } from "../../const/signup";
import { Input } from "../../components/Input/Input";
import { countries } from "../../const/signup";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "../../components/Snackbar/Snackbar";
import "./HomeStyles.css";

export const Home = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    age: "",
    userName: "",
    country: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        navigate("/welcome");
      }

      if (response.status === 409) {
        setError("El email ingresado ya pertenece a otra cuenta");
      }
    } catch (error: unknown) {
      console.log(error);
      setError("Ocurrió un error inesperado, por favor intenta de nuevo mas tarde");
    }
  };

  const { email, fullName, age, userName, country } = formData;

  const mailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");

  const isFormValid =
    !!mailRegex.test(email) &&
    fullName.trim() !== "" &&
    !isNaN(Number(age)) &&
    Number(age) > 0 &&
    userName.trim() !== "" &&
    country.trim() !== "";

  return (
    <main className="content">
      <div className="formContent">
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => {
            return (
              <div className="formField" key={field.name}>
                <label>{field.header}</label>
                <Input value={formData[field.name as keyof typeof formData]} onChange={handleChange} {...field} />
              </div>
            );
          })}

          <div className="formField">
            <label>País:</label>
            <Dropdown name="country" value={country} onChange={handleChange} items={countries} />
          </div>
          <div className="buttonContainer">
            <Button text="Registrarse" type="submit" disabled={!isFormValid} />
          </div>
        </form>
      </div>
      {!!error && <Snackbar message={error} onClose={() => setError("")} />}
    </main>
  );
};
