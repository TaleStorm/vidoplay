import { useContext, useEffect, useState } from "react"
import { useRouter } from 'next/router'
import axios from "axios";
import GoodToast from "../../components/goodtoast";
import BadToast from "../../components/badtoast";
import LoginContext from "../../components/context/loginContext";

function parseParms(str) {
    var pieces = str.split("&"), data = {}, i, parts;
    for (i = 0; i < pieces.length; i++) {
        parts = pieces[i].split("=");
        if (parts.length < 2) {
            parts.push("");
        }
        data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }
    return data;
}

const VkLogin = () => {
    const [data, setData] = useState("")
    const router = useRouter()
    const {logIn} = useContext(LoginContext)

    useEffect(() => {
        setData(window.location.hash)
    }, [])

    useEffect(() => {
    if (data) {
            const sendData = async () => {
            const obj:any = parseParms(data)
            if (obj.email && obj["#access_token"] && obj.user_id) {
                 const resp = await axios.post("/api/login", {
                     accessToken: obj["#access_token"],
                     email: obj.email,
                     id: obj.user_id,
                     type: "vk"
                 })
                 console.log(resp)
                 logIn(resp.data.token)
                 router.push("/")
                 GoodToast("Логин успешен")
                return
            }
            router.push("/")
            BadToast("Авторизация неудачна")
            }
            sendData()
        }
    }, [data])

    return (
        <div className={`w-full`}>
        </div>
    )
}

export default VkLogin
