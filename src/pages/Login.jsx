import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const bodyRequest = {
        username: username,
        password: password
    }
    
    const loginURL = import.meta.env.VITE_URL_BACK + 'auth/login'

    const login = async () => {
        const response = await fetch(loginURL, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body : JSON.stringify(bodyRequest)
        });
        const data = await response.json();
        const token = data.token;
        setLoading(false);

        if(!token){
            console.log('NO RECUPERA TOKEN');   
        }else{
            localStorage.setItem("token","Bearer " + token);
            navigate('/pokemon/inventory');
        }        
    };

    return (
        <>
            <div className="w-[500px] h-[300px] text-xl text-center font-semibold mx-auto bg-red-500 rounded-xl">
                <h1 className="mt-[100px] text-2xl pt-8 text-[#f7ef02] font-bold">Iniciar sesion</h1>
                
                <div className="mt-3">
                    <label className="text-[#f7ef02]" for="userInput">Usuario</label>
                    <br />
                    <input type="text" id="userInput" name="user" className="rounded-xl h-[35px] text-center" onChange={(e) => {setUsername(e.target.value)}}/>
                </div>
                
                <div className="mt-5">
                    <label className="text-[#f7ef02]" for="pwdInput">Password</label>
                    <br />
                    <input type="password" id="pwdInput" name="user" className="rounded-xl h-[35px] text-center" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
            <button
                onClick={login}
                disabled={loading}
                className="inline-block bg-blue-500 w-[100px] py-2 mt-2 rounded-lg text-white hover:bg-blue-600 transition-colors"
                >
                    {loading ? "Ingresando" : "Ingresar"}
            </button>
            </div>
        </>
    );
}

export default Login;