import TitlesForFrontpage from "../components/TitlesForFrontpage";
import NavBar from "../components/NavBar";

const Home = () => {
    return (
        <div style={{display: 'flex', marginTop: '40px'}}>
            <div style={{flex: 1}}>
                <TitlesForFrontpage />
                <NavBar />
            </div>
        </div>
    )
}

export default Home;