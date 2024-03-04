import { ChangeEvent, FormEvent, useState } from "react";
import { fields } from "../../const/signup";
import { Input } from "../../components/Input/Input";
import { countries } from "../../const/signup";
import "./HomeStyles.css";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { Button } from "../../components/Button/Button";

export const Home = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    age: "",
    userName: "",
    country: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data:", formData);

    const response = await fetch("http://localhost:3000/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log(response.json());

    setFormData({
      email: "",
      fullName: "",
      age: "",
      userName: "",
      country: "",
    });
  };

  const { email, fullName, age, userName, country } = formData;

  // Validar si todos los campos están completos y en el formato correcto
  const isFormValid =
    email.trim() !== "" &&
    fullName.trim() !== "" &&
    !isNaN(Number(age)) &&
    Number(age) > 0 &&
    userName.trim() !== "" &&
    country.trim() !== "" &&
    country !== "Selecciona un país";

  return (
    <div className="container">
      <header>
        <img src="https://drive.google.com/thumbnail?id=12m785Csxi9iMSdl46MvEwuxtvst6urjl" alt="Header Image" />
      </header>
      <main className="content">
        <div className="formContent">
          <h1>Registro</h1>
          <form onSubmit={handleSubmit}>
            {fields.map((field) => {
              return (
                <div className="formField" key={field.name}>
                  <label>{field.header}</label>
                  <Input
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    name={field.name}
                    type={field.type}
                    errorMessage=""
                  />
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
      </main>
      <footer>
        <div className="footerContent">
          <p>Copyright © 2024</p>
          <img src="https://drive.google.com/thumbnail?id=1ZYNR36CPHkUhNCWpT1JgnfAndBtsfMAW" alt="Footer Image" />
        </div>
      </footer>
    </div>
  );
};
