import "./Recording.scss"
import DeleteRecording from "../../images/delete.svg";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {deleteRecording} from "../../Redux/actions/recordingAC";


function Recording( {title, date, author, id} ) {

    const router = useHistory()
    const dispatch = useDispatch()

    const removeRecording = async (id) => {
        try {
            await axios.delete(`https://614ae29407549f001755aa9e.mockapi.io/recordings/${id}`)
            dispatch(deleteRecording(id))
        } catch (error) {
            alert("Ошибка при удалении поста (Попробуйте еще раз)");
            console.error(error);
        }
    }

    return (
        <div className="recording__item">
            <img onClick={() => removeRecording(id)} className="recording__delete"  width={20} height={20} src={DeleteRecording} alt="DeleteRecording"/>
            <div className="recording__top">
                <div className="recording__top--one">
                    <h3 className="recording__top--title">{title}</h3>
                    <strong className="recording__top--author">Автор: {author}</strong>
                </div>
                <div className="recording__top--two">
                    <strong className="recording__top--data">Дата публикации: {date}</strong>
                </div>
            </div>
            <button onClick={() => router.push(`/post/${id}`)}  className="recording__bottom--btn">Открыть запись</button>
        </div>
    );
}

export default Recording;