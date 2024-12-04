import { useNavigate } from 'react-router-dom';

const Logo = ()=>{

    const Nav = useNavigate();

    const home = ()=>{
        Nav("/")
    }

    return (
        <>
            <h1 id="logo" onClick={home}>Gallery</h1>
        </>
    )
}

export default Logo;