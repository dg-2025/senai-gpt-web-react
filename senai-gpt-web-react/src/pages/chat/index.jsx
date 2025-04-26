import "./homi.css";
import Capabilities from "../../assets/imgs/Capabilities.svg";
import ChatText from "../../assets/imgs/ChatText.svg";
import Examples from "../../assets/imgs/Examples.svg";
import iconenviar from "../../assets/imgs/icon_enviar.svg";
import iconimg from "../../assets/imgs/iconimg.svg";
import ligthmode from "../../assets/imgs/light_mode.svg";
import limitations from "../../assets/imgs/limitations.svg";
import lixeira from "../../assets/imgs/lixeira.svg";
import logout from "../../assets/imgs/log_out.svg";
import microfoneoriginal from "../../assets/imgs/microfone_original.svg";
import myaccount from "../../assets/imgs/my_account.svg";
import UpdateseFAQ from "../../assets/imgs/Updates_&_FAQ.svg";
import SenaiGPT from "../../assets/imgs/SenaiGPT.png";
import { useEffect, useState } from "react";





function Chat() {
    const [chats, setChats] = useState([]);
    const [chatselecionado, setChatsselecionados] = useState(null);
    const [usermassage, SetUserMassege] = useState("")

    useEffect(() => {

        getChats();

    }, []);

    const getChats = async () => {
        let response = await fetch("https://senai-gpt-api.azurewebsites.net/chats", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            }
        })
        console.log(response);

        if (response.ok == true) {

            let json = await response.json();
            setChats(json);
        }
        else {
            if (response.status == 401) {

                alert("token ináido. faça o login novamente.");
                window.location.href = "/login";

            }
        }
    }

    const onLogOutClick = () => {
        let sair = confirm("deseja sair ?")
        if (sair == true) {
            localStorage.clear();
            window.location.href = "/login"
        }

    }

    const clickChat = (chat) => {

        setChatsselecionados(chat);

    }
    const chatGPT = async (message) => {

        // Configurações do endpoint e chave da API
        const endpoint = "https://ai-testenpl826117277026.openai.azure.com/";
        const apiKey = "hehe";
        const deploymentId = "gpt-4"; // Nome do deployment no Azure OpenAI
        const apiVersion = "2024-05-01-preview"; // Verifique a versão na documentação

        // URL para a chamada da API
        const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;

        // Configurações do corpo da requisição
        const data = {
            messages: [{ role: "user", content: message }],
            max_tokens: 50
        };

        // Cabeçalhos da requisição
        const headers = {
            "Content-Type": "application/json",
            "api-key": apiKey
        };

        // Faz a requisição com fetch
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            const botMessage = result.choices[0].message.content;
            return botMessage;
        }

    }
    

    


const enviarMensagem = async (message) => {

    let resposta = await chatGPT(message)
    console.log("resposta: ", resposta)

    const novaMensagemUsuario = {

        userId: "",
        text: message,
        id: 10

    };
    let novaRespostaChatGPT = {

        userId: "chatbot",
        text: resposta,
        id: 10

    };
    let novoChatSelecionado = { ...chatselecionado };
    novoChatSelecionado.messages.push(novaMensagemUsuario)
    novoChatSelecionado.messages.push(novaRespostaChatGPT)

    setChatsselecionados(novoChatSelecionado);

}

return (
    <>


        <div className="tela">
            <header className="header-lateral">
                <div className="top-box">

                    <button className="new-chat" >+ New chat</button>

                    {chats.map(chat => (
                        <button className="botoes" onClick={() => clickChat(chat)}>
                            <img src={ChatText} />
                            {chat.chatTitle}
                        </button>
                    ))}

                    {/* <button className="botoes">
                            <img src={ChatText}/>
                            Al Chat Tool Impact Writing
                        </button>
                        <button className="botoes">
                            <img src={ChatText}/>
                            New chat
                        </button> */}

                </div>

                <div className="end-box">
                    <button>
                        <img src={lixeira} />
                        Clear conversations
                    </button>
                    <button>
                        <img src={ligthmode} />
                        Light mode
                    </button>
                    <button>
                        <img src={myaccount} />
                        My account
                    </button>
                    <button>
                        <img src={UpdateseFAQ} />
                        Updates & FAQ
                    </button>
                    <button onClick={() => onLogOutClick()}>
                        <img src={logout} />
                        Log out
                    </button>
                </div>
            </header>

            <main>
                <div className="right-lateral">

                    {chatselecionado == null && (


                        <>
                            <img className="SenaiGPT" src={SenaiGPT} />
                            <div className="conteiners">

                                <div className="text-grup">
                                    <img src={Examples} />
                                    <h1 className="text-grup-titulo">
                                        Examples
                                    </h1>
                                    <button>"Explain quantum computing insimple terms"</button>
                                    <button>"Got any creative ideas for a 10year old's birthday?"</button>
                                    <button>"How do I make an HTTP requestin Javascript?"</button>
                                </div>
                                <div className="text-grup">
                                    <img src={Capabilities} />
                                    <h1 className="text-grup-titulo">
                                        Capabilities
                                    </h1>
                                    <button>Remembers what user saidearlier in the conversation.</button>
                                    <button>Allows user to provide follow-up corrections.</button>
                                    <button>Trained to decline inappropriate requests.</button>
                                </div>
                                <div className="text-grup">
                                    <img src={limitations} />
                                    <h1 className="text-grup-titulo">
                                        Limitations
                                    </h1>
                                    <button>May occasionally generate incorrect information.</button>
                                    <button>May occasionally produce harmful instructions or biased content.</button>
                                    <button>Limited knowledge of world andevents after 2021.</button>
                                </div>
                            </div>



                        </>


                    )}

                    {chatselecionado != null && (

                        <>

                            <div className="chat-container">

                                <div className="chat-header">

                                    <h2>{chatselecionado.chatTitle}</h2>

                                </div>
                                <div className="chat-messages">

                                    {chatselecionado.messages.map(message => (
                                        <p className={"message-item " + (message.userId == "chatbot" ? "chatbot" : "")}>{message.text}</p>
                                    ))}

                                </div>

                            </div>

                        </>

                    )}

                    <div className="mensagem">
                        <img src={iconimg} />
                        <img className="microfone" src={microfoneoriginal} />
                        <input className="Type-message"
                            value={usermassage}
                            onChange={event => SetUserMassege(event.target.value)}
                            placeholder="Type message" />
                        <img onClick={() => enviarMensagem(usermassage)} src={iconenviar} />

                    </div>
                </div>
            </main>
        </div>

    </>

)


}
export default Chat;