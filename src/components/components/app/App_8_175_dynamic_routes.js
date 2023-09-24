// import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {MainPage, ComicsPage, Page404, SingleComicPage} from '../pages';
import AppHeader from "../appHeader/AppHeader";
// import RandomChar from "../randomChar/RandomChar";
// import CharList from "../charList/CharList";
// import CharInfo from "../charInfo/CharInfo";
// import ErrorBoundary from "../errorBoundary/ErrorBoundary";
// import ComicsList from "../comicsList/ComicsList";
// import AppBanner from "../appBanner/AppBanner";
// import TestComponent from "../testComponent/TestComponent";



const App = () => {

    // const [selectedChar, setChar] = useState(null);

    // state = {
    //     selectedChar: null
    // }

    // onCharSelected = (id) => {
    //     this.setState({
    //         selectedChar: id
    //     })
    // }

    // const onCharSelected = (id) => {
    //     setChar(id);
    // }


    // return (
    //     <Router>
    //         <div className="app">
    //         {/* <TestComponent/>*/}
    //         <AppHeader/> 
    //         <main>
    //             <Switch>
    //                 <Route path="/comics">
    //                     <AppBanner/> 
    //                     <ComicsList/>
    //                 </Route>
    //                 <Route path="/">
    //                     <ErrorBoundary>
    //                         <RandomChar/>
    //                     </ErrorBoundary>
    //                     <div className="char__content">
    //                         <ErrorBoundary>
    //                             <CharList onCharSelected={onCharSelected}/>
    //                         </ErrorBoundary>
    //                         <ErrorBoundary>
    //                             <CharInfo charId={selectedChar}/>
    //                         </ErrorBoundary>
    //                     </div>
    //                     <img className="bg-decoration" src={decoration} alt="vision"/> 
    //                 </Route>
    //             </Switch>
    //         </main>
    //     </div>
    //     </Router>
    // )

    // return (
    //     <Router>
    //         <div className="app">
    //         {/* <TestComponent/>*/}
    //         <AppHeader/> 
    //         <main>
    //             <Switch>
    //             <Route exact path="/">
    //                     <MainPage/>
    //                 </Route>
    //                 <Route exact path="/comics">
    //                     <ComicsPage/>
    //                 </Route>
    //             </Switch>
    //         </main>
    //     </div>
    //     </Router>
    // )

    
    // return (
    //     <Router>
    //         <div className="app">
    //         {/* <TestComponent/>*/}
    //         <AppHeader/> 
    //         <main>
    //             <Routes>
    //                 <Route path="/" element={<MainPage/>}/>
    //                 <Route path="/comics" element={<ComicsPage/>}/>
    //             </Routes>
    //         </main>
    //     </div>
    //     </Router>
    // )

        return (
        <Router>
            <div className="app">
            {/* <TestComponent/>*/}
            <AppHeader/> 
            <main>
                <Switch>
                    <Route exact path="/">
                        <MainPage/>
                    </Route>
                    <Route exact path="/comics">
                        <ComicsPage/>
                    </Route>
                    <Route exact path="/comics/:comicId">
                        <SingleComicPage/>
                    </Route>
                    <Route path="*">
                        <Page404/>
                    </Route>
                </Switch>
            </main>
        </div>
        </Router>
    )
}


export default App;