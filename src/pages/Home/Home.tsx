import { ChangeEvent, FormEvent, useState } from "react";
import { fields } from "../../const/signup";
import { Input } from "../../components/Input/Input";
import { countries } from "../../const/signup";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "../../components/Snackbar/Snackbar";
import { createAccount } from "../../services/account";
import { statusCodes } from "../../const/statusCodes";
import { AccountFormInputs } from "../../types/account";
import "./HomeStyles.css";

export const Home = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    age: "",
    userName: "",
    country: "",
  });

  const [apiCallError, setApiCallError] = useState("");
  const [inputErrors, setInputErrors] = useState({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    /* 
      The current behavior makes the validation occurr after the input loses focus, this opens an edge case 
      for the last input to be filled, as it may enable the register button before checking if its content
      is valid. With this logic I check if the input being filled is the last one and switch to an 
      'onChange validation' to avoid this issue, while keeping the UX in the other cases where I think it's better.
    */
    const remainingFieldsToFill = Object.values(formData).filter((value) => !value).length;
    if (remainingFieldsToFill <= 1 && name !== "country") {
      setInputErrors({ ...inputErrors, [name]: fields[name as keyof AccountFormInputs].validate(value) });
    } else {
      setInputErrors({ ...inputErrors, [name]: "" });
    }
  };

  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createAccount(formData);
      if (response.status === statusCodes.CREATED) {
        navigate("/welcome");
      }

      if (response.status === statusCodes.CONFLICT) {
        setApiCallError("El email ingresado ya pertenece a otra cuenta");
      }
    } catch (error: unknown) {
      setApiCallError("Ocurrió un error inesperado, por favor intenta de nuevo mas tarde");
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputErrors({ ...inputErrors, [name]: fields[name as keyof AccountFormInputs].validate(value) });
  };

  const { country } = formData;

  const isFormValid = Object.keys(formData).every(
    (fieldName) =>
      !!formData[fieldName as keyof typeof formData] &&
      !inputErrors[fieldName as keyof typeof inputErrors] &&
      formData["country"] !== countries[0]
  );

  return (
    <main className="content">
      <div className="formContent">
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
          {Object.values(fields).map((field) => {
            return (
              <div className="formField" key={field.name}>
                <label>{field.header}</label>
                <Input
                  {...field}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={inputErrors[field.name as keyof typeof inputErrors]}
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
      {!!apiCallError && <Snackbar message={apiCallError} onClose={() => setApiCallError("")} />}
    </main>
  );
};
