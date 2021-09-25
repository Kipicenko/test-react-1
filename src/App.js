import Header from "./components/Header";
import Main from "./components/Main";
import {Redirect, Route} from "react-router-dom";
import AddPost from "./components/AddPost/AddPost";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setRecordings} from "./Redux/actions/recordingAC";
import DocumentTitle from "react-document-title";
import OnRecording from "./components/recording/OpenRecording";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        async function axiosData() {
            try {
                const {data} = await axios.get("https://614ae29407549f001755aa9e.mockapi.io/recordings")

                dispatch(setRecordings(data))
            } catch (error) {
                alert("Ошибка при получении всех данных");
                console.error(error);
            }
        }

        return axiosData()
    })

    return (
        <DocumentTitle title="Главная">
            <div className="wrapper">
                <Header/>
                <Route path='/' exact>
                    <Main/>
                </Route>
                <Route path="/add-post" exact>
                    <AddPost/>
                </Route>
                <Route path="/post/:id" exact>
                    <OnRecording />
                </Route>
                <Redirect from='/' to='/'/>
            </div>
        </DocumentTitle>
    );
}

export default App;
