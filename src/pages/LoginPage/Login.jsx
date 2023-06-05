import { AuthLogin } from "../../components/AuthLogin/AuthLogin";
import { Navigation } from "../../components/NavBar/Navigation";


export function Login(){
    return(
        <>
            <Navigation />
            <AuthLogin />
        </>
    );
}