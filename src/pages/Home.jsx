import TitlesForFrontpage from "../components/TitlesForFrontpage";
import NavBar from "../components/NavBar";

const Home = () => {
    return (
        <div style={{display: 'flex'}}>
            <NavBar />
            <div style={{flex: 1}}>
                <TitlesForFrontpage />
            </div>
        </div>
    )
}

export default Home;