import { Link } from "react-router-dom";

function Login(){
    return (
        <>
            <div className="w-[500px] h-[300px] text-xl text-center font-semibold mx-auto bg-red-500 rounded-xl">
                <h1 className="mt-[100px] text-2xl pt-8 text-[#f7ef02] font-bold">Iniciar sesion</h1>
                
                <div className="mt-3">
                    <label className="text-[#f7ef02]" for="userInput">Usuario</label>
                    <br />
                    <input type="text" id="userInput" name="user" className="rounded-xl h-[35px] text-center"/>
                </div>
                
                <div className="mt-5">
                    <label className="text-[#f7ef02]" for="pwdInput">Password</label>
                    <br />
                    <input type="text" id="pwdInput" name="user" className="rounded-xl h-[35px] text-center"/>
                </div>
                <Link to="/pokemon/inventory" className="inline-block bg-blue-500 w-[100px] py-2 mt-2 rounded-lg text-white hover:bg-blue-600 transition-colors">Ingresar</Link>
            </div>
        </>
    );
}

export default Login;