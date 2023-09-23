import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import TestComponent from "../testComponent/TestComponent";

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [selectedChar, setChar] = useState(null);

    // state = {
    //     selectedChar: null
    // }

    // onCharSelected = (id) => {
    //     this.setState({
    //         selectedChar: id
    //     })
    // }

    const onCharSelected = (id) => {
        setChar(id);
    }


    return (
        <div className="app">
            <TestComponent/>
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
                {/* <AppBanner/> */}
                {/* <ComicsList/> */}
            </main>
        </div>
    )
}


export default App;