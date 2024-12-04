import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const Home = () => {

    const Nav = useNavigate();

    useEffect(() => {
        if (Cookies.get('token') && window.location.pathname != '/my-gallery') {
          window.location.href = "/my-gallery";
        }
      }, []);

    const signin = () => {
        Nav("/signin")
    };

    return (
        <>
            <div id="home-background">
                <div id="home-container">
                    <div id="top-bar">
                        <nav>
                            <div id="account-btn"
                                onClick={signin}>
                                Sign in
                            </div>
                        </nav>
                    </div>
                    <div id="home-display">
                        <p>
                            Create your own gallery
                        </p>
                        <p>
                            Enjoy the experience of the AI caption generator ..
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;