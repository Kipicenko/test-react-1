import "./AddPost.scss"

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import {useState} from "react";
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import DocumentTitle from "react-document-title";
import axios from "axios";
import {addRecording} from "../../Redux/actions/recordingAC";
import {Link} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

const schema = yup.object({
    title: yup.string().max(60, "Максимально большой заголовок (максимум 60 символов").required("Заголовок обязательное поле!").min(10, "Максимально маленький заголовок (минимум 10 символов)"),
    author: yup.string().max(30, "Максимально можно 30 символов").required("Имя и фамилия обязательное поле!").min(10, "Минимум нужно 10 символов (вероятней всего вы ввели только имя)")
}).required();



function AddPost() {

    const [textEditor, setTextEditor] = useState("");
    const [added, setAdded] = useState(false);
    const dispatch = useDispatch()
    const { items } = useSelector(({ recordings }) => recordings)


    const {register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })


    const onSubmit = async (data) => {
        try {
            const date = new Date().toLocaleString()
            const newData = {...data, date, text: textEditor, id: String(items.length + 1) }
            await axios.post("https://614ae29407549f001755aa9e.mockapi.io/recordings", newData);
            dispatch(addRecording(newData));
            reset()
            setTextEditor('')
            setAdded(true)
            setTimeout(() => {
                setAdded(false)
            }, 4000)
        } catch (error) {
            alert("Ошибка при отправлении поста (Попробуйте еще раз)");
            console.error(error);
        }
    }

    const handleChange = (e, editor) => {
        const formData = new FormData()
        formData.append("upload_preset", "photoscloud");
        setTextEditor(ReactHtmlParser(editor.getData()))
    }


    return (
        <DocumentTitle title="Добавить запись">
            <div className="addPost">
                <div className="addPost__container">
                    <h2 className="addPost__title">Добавить запись:</h2>
                    <form className="addPost__form" onSubmit={handleSubmit(onSubmit)}>
                        <input  style={errors.title && {border: "2px solid #FF6464"}} {...register("title")}  type="text" name="title" placeholder="Введите заголовок"/>
                        <p className="addPost__form--error">{errors.title?.message }</p>
                        <input style={errors.author && {border: "2px solid #FF6464"}} {...register("author")} type="text" name="author" placeholder="Введите имя и фамилию"/>
                        <p className="addPost__form--error">{errors.author?.message }</p>
                        <div className="editor">
                            <CKEditor
                                editor={ClassicEditor}
                                config={
                                    {
                                        ckfinder: {
                                            uploadUrl: 'https://api.cloudinary.com/v1_1/testing-images-api/image/upload'
                                        }
                                    }
                                }
                                data={textEditor.props?.children[0]}
                                onChange={(e, editor) => { handleChange(e, editor)}}
                            />
                        </div>
                        <div className="btn">
                            <button type="submit" className="btn-reset addPost__form--btn">Добавить запись</button>
                            <div className={added ? "btn-click on" : "btn-click"}>Запись добавлена</div>
                        </div>
                    </form>
                    <Link to="/" className="return__btn--home">Вернуться на главную страницу</Link>
                </div>
            </div>
        </DocumentTitle>
    );
}

export default AddPost;