import "./login.css";
function Login() {
  
    return (
       <>
             <header></header>

<main className="page-container">

    <div className="robo-imagen">

    </div>

    <div className="login_container">
        <img className="logo" src="../assets/imgs/Chat.png" alt="logo SenaiGPT"/>
        {/* <!-- colocar titulo; "style= estilo da fonte (tamnaho..)"  --> */}
        <h1 id="meutitulo" className="titulo">Login
        </h1>

        {/* <!-- imput: colocar caixa de dialogo --> */}
        {/* <!-- placeholder : letrinha q fica no fundo--> */}
        <input className="input" type="email" placeholder="insira o e-mail"/>
        <input className="input" type="password" placeholder="insira a senha"/>
        <button className="btn">Entrar</button>
    </div>

</main>
<footer></footer>
       </>
     )
   }
   
   export default Login;
   