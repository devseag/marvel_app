// import { useState } from "react";
import { lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import {MainPage, ComicsPage, SingleComicPage} from '../pages';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

// dynamic import should be located below other imports
// import Page404 from '../pages/404';
const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
// const SingleComicsPage = lazy(() => import('../pages/SingleComicsPage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/singleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
 
 // import RandomChar from "../randomChar/RandomChar";
// import CharList from "../charList/CharList";
// import CharInfo from "../charInfo/CharInfo";
// import ErrorBoundary from "../errorBoundary/ErrorBoundary";
// import ComicsList from "../comicsList/ComicsList";
// import AppBanner from "../appBanner/AppBanner";
// import TestComponent from "../testComponent/TestComponent";



const App = () => {

        return (
        <Router>
            <div className="app">
            {/* <TestComponent/>*/}
            <AppHeader/> 
            <main>
                {/* <Suspense fallback={<span>Loading...</span>}> */}
                <Suspense fallback={<Spinner/>}>                
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                        {/* <Route exact path="/comics/:comicId">
                            <SingleComicsPage/>
                        </Route> */}
                        <Route exact path="/comics/:id">
                                <SinglePage Component={SingleComicLayout} dataType='comic'/>
                        </Route>
                        <Route exact path="/characters/:id">
                                <SinglePage Component={SingleCharacterLayout} dataType='character'/>
                        </Route>
                        <Route path="*">
                            <Page404/>
                        </Route>
                    </Switch>
                </Suspense>
            </main>
        </div>
        </Router>
    )
}


export default App;