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

    const clickChat = () => {

        setChatsselecionados(chats);

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


                        <div className="mensagem">
                            <img src={iconimg} />
                            <img className="microfone" src={microfoneoriginal} />
                            <input className="Type-message" type="text" placeholder="Type message" />
                            <img src={iconenviar} />

                        </div>
                    </div>
                </main>
            </div>

        </>

    )


}
export default Chat;