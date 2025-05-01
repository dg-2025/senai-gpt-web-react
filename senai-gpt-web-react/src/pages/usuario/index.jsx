import logo from "../../assets/imgs/Chat.png";
import { useState } from "react";

function NewUser() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setCPassword] = useState("");

    const onLoginClick = async () => {
        if (nome != "" && email != "" && password != "" && Cpassword != "") {
            if (password == Cpassword) {
                let response = await fetch("https://senai-gpt-api.up.railway.app/users", {

                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST", // Método que envia dados
                    body: JSON.stringify({
                        nome: nome,
                        email: email,
                        password: password
                    })

                });

                if (response.ok == true) { // Verifica se a requisição deu certo.

                    alert("Conta cadastrada com sucesso");

                    window.location.href = "/login";

                } else {

                    alert("Erro inesperado aconteceu, caso persista, contate os administradores.");

                }
            } else {
                alert("senhas não conferem")
            }
        } else {

            alert("preencha todos os campos");
        }
    }



    return (
        <>
            <header></header>

            <main className="page-container">

                <div className="robo-image">
                </div>

                <div className="login-container">

                    <img className="logo" src={logo} alt="Logo do SenaiGPT." />

                    <h1
                        id="meutitulo"
                        className="titulo"
                    >novo usuario</h1>

                    <input className="inpt" value={nome} onChange={event => setNome(event.target.value)} type="texto" placeholder="Insira o nome do usuario" />
                    <input className="inpt" value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="Insira o e-mail" />
                    <input className="inpt" value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Insira a senha" />
                    <input className="inpt" value={Cpassword} onChange={event => setCPassword(event.target.value)} type="password" placeholder="confirme a senha" />

                    <button className="btn" onClick={() => onLoginClick()}>Criar</button>
                    <a href="/login">tela de login</a>

                </div>

            </main>

            <footer></footer>
        </>
    )
}

export default NewUser;