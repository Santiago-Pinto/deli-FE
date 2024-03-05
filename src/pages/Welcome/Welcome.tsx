import "./WelcomeStyles.css";

export const Welcome = () => {
  return (
    <main className="welcomeContainer">
      <h1>¡Bienvenido a la comunidad!</h1>
      <div className="confirmContainer">
        <p>Revisa tu correo para confirmar tu registro. ¡Esperamos que lo disfrutes!</p>
      </div>
      <a href="/">Volver al inicio</a>
    </main>
  );
};
