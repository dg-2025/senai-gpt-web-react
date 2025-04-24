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

    return (
        <>


            <div className="tela">
                <header className="header-lateral">
                    <div className="top-box">

                        <button className="new-chat" >+ New chat</button>

                        {chats.map(chat => (
                            <button className="botoes">
                                <img src={ChatText} alt="" />
                                {chat.chatTitle}
                            </button>
                        ))}

                        {/* <button className="botoes">
                            <img src={ChatText} alt="" />
                            Al Chat Tool Impact Writing
                        </button>
                        <button className="botoes">
                            <img src={ChatText} alt="" />
                            New chat
                        </button> */}

                    </div>

                    <div className="end-box">
                        <button>
                            <img src={lixeira} alt="" />
                            Clear conversations
                        </button>
                        <button>
                            <img src={ligthmode} alt="" />
                            Light mode
                        </button>
                        <button>
                            <img src={myaccount} alt="" />
                            My account
                        </button>
                        <button>
                            <img src={UpdateseFAQ} alt="" />
                            Updates & FAQ
                        </button>
                        <button>
                            <img src={logout} alt="" />
                            Log out
                        </button>
                    </div>
                </header>

                <main>
                    <div className="right-lateral">
                        <img className="SenaiGPT" src={SenaiGPT} alt="" />
                        <div className="conteiners">

                            <div className="text-grup">
                                <img src={Examples} alt="" />
                                <h1 className="text-grup-titulo">
                                    Examples
                                </h1>
                                <button>"Explain quantum computing insimple terms"</button>
                                <button>"Got any creative ideas for a 10year old's birthday?"</button>
                                <button>"How do I make an HTTP requestin Javascript?"</button>
                            </div>
                            <div className="text-grup">
                                <img src={Capabilities} alt="" />
                                <h1 className="text-grup-titulo">
                                    Capabilities
                                </h1>
                                <button>Remembers what user saidearlier in the conversation.</button>
                                <button>Allows user to provide follow-up corrections.</button>
                                <button>Trained to decline inappropriate requests.</button>
                            </div>
                            <div className="text-grup">
                                <img src={limitations} alt="" />
                                <h1 className="text-grup-titulo">
                                    Limitations
                                </h1>
                                <button>May occasionally generate incorrect information.</button>
                                <button>May occasionally produce harmful instructions or biased content.</button>
                                <button>Limited knowledge of world andevents after 2021.</button>
                            </div>
                        </div>
                        <div className="mensagem">
                            <img src={iconimg} alt="" />
                            <img className="microfone" src={microfoneoriginal} alt="" />
                            <input className="Type-message" type="text" placeholder="Type message" />
                            <img src={iconenviar} alt="" />

                        </div>
                    </div>
                </main>
            </div>

        </>

    )


}
export default Chat;