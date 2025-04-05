import few_clouds from "../assets/images/fewClouds.png"
import "../styles/Header.css"
function Heading(){
    return(
        <div id="header">
            <div id="title">
            <img src={few_clouds} alt="" id="imgtitle" />
            <h1>WeatherMe</h1>
            </div>
            <nav id="navbar">
                <ul>
                    <li><a href="#current-weather">Today</a></li>
                    <li> <a href="#tomorrow-weather">Tommorow</a></li>
                    
                </ul>
            </nav>
        </div>
    );
}
export default Heading;