import "./Main.scss"
import Recording from "../recording/Recording";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


function Main() {

    const { items } = useSelector(({ recordings }) => recordings)

    return (
        <div className="main">
            <div className="main__container">
                <h2 className="main__title">Главная:</h2>
                <div className="main__block">
                    <div className="main__items">
                        {
                            items.map(item => (
                                <Recording key={item.id} {...item} />
                            ))
                        }
                    </div>
                    <Link to="/add-post" className="main__btn">Добавить запись</Link>
                </div>
            </div>
        </div>
    );
}

export default Main