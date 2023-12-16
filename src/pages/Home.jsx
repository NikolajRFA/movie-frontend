import TitlesForFrontpage from "../components/TitlesForFrontpage";
import NavBar from "../components/navbar/NavBar";

const Home = () => {
    return (
        <div style={{display: 'flex'}}>
            <div style={{flex: 1}}>
                <TitlesForFrontpage />
            </div>
        </div>
    )
}

export default Home;