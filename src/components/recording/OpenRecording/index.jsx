import "./openRecording.scss";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import DocumentTitle from "react-document-title";
import Loading from "../../../images/Loading.gif"


function OnRecording() {

    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getPost() {
            try {
                const { data } = await axios.get(`https://614ae29407549f001755aa9e.mockapi.io/recordings/${id}`)
                setPost(data)
                setIsLoading(false)
            } catch (error) {
                alert("Ошибка при открытии поста (Слишком частые запросы на сервер, попробуйте еще раз)");
                console.error(error);
            }
        }
        return getPost()
    },[id])

    return (
        <>
            {
                isLoading ? (
                    <DocumentTitle title="Загрузка">
                        <div className="openRecording__container--loading">
                            <img className="openRecording__loading" src={Loading} alt="Loading"/>
                        </div>
                    </DocumentTitle>
                ) : (
                    <DocumentTitle title={post.title}>
                        <div className="openRecording">
                            <div className="openRecording__container">
                                <div className="openRecording__top">
                                    <h2 className="openRecording__title">{post.title}</h2>
                                    <Link to="/" className="openRecording__btn--home">Вернуться на главную страницу</Link>
                                </div>
                                <div className="openRecording__author">Автор записи: {post.author}</div>
                                <div className="openRecording__date">Дата публикации: {post.date}</div>
                                <div className="openRecording__content">
                                    {post.text[0].props.children[0]}
                                </div>
                            </div>
                        </div>
                    </DocumentTitle>
                )
            }
        </>
    );
}

export default OnRecording;