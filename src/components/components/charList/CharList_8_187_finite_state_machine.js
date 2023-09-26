// import {Component} from 'react';
import {useState, useEffect, useRef} from 'react';
import { PropTypes } from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
// import setContent from '../../utils/setContent';

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
            break;
        case 'confirmed':
            return <Component/> 
            break;
        case 'error':
            return <ErrorMessage/>
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

// class CharList extends Component {
const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    // state = {
    //     charList: [],
    //     loading: true,
    //     error: false,
    //     newItemLoading: false,
    //     offset: 210,
    //     charEnded: false
    // }

    // marvelService = new MarvelService();
    const {loading, error, getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []) // componentDidMount()

    // componentDidMount() {

    //     // // this.foo.bar = 0;

    //     // this.marvelService.getAllCharacters()
    //     //     .then(this.onCharListLoaded)
    //     //     .catch(this.onError)
    //     this.onRequest();
    // }

    // onRequest = (offset) => {
    //     this.onCharListLoading();
    //     this.marvelService.getAllCharacters(offset)
    //         .then(this.onCharListLoaded)
    //         .catch(this.onError)
    // }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        // setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }

    // onCharListLoading = () => {
    //     this.setState({
    //         newItemLoading: true
    //     })
    // }

    // const onCharListLoading = () => {
    //     this.setState({
    //         newItemLoading: true
    //     })
    // }

    // const onCharListLoading = () => {
    //     setNewItemLoading(true);
    // }

    // onCharListLoaded = (newCharList) => {
    //     let ended = false;
    //     if (newCharList.length < 9) {
    //         ended = true;
    //     }

    //     this.setState(({offset, charList}) => ({
    //         charList: [...charList, ...newCharList],
    //         loading: false,
    //         newItemLoading: false,
    //         offset: offset + 9,
    //         charEnded: ended
    //     }))
    // }

    // const onCharListLoaded = async (newCharList) => {
    const onCharListLoaded = (newCharList) => {

        // const {logger, secondLog} = await import ('./someFunc');
        // logger();

        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        // this.setState(({offset, charList}) => ({
        //     charList: [...charList, ...newCharList],
        //     loading: false,
        //     newItemLoading: false,
        //     offset: offset + 9,
        //     charEnded: ended
        // }))

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    // onError = () => {
    //     this.setState({
    //         error: true,
    //         loading: false
    //     })
    // }

    // const onError = () => {
    //     setError(true);
    //     setLoading(loading => false); // setLoading(false) same

    // }

    // console.log('CharList');

    // itemRefs = [];
    const itemRefs = useRef([]);

    // setRef = (ref) => {
    //     this.itemRefs.push(ref);
    // }

    // setRef = (ref) => {
    //     this.itemRefs.push(ref);
    // }

    // focusOnItem = (id) => {
    //     // Ja realizoval variant chut' slozhnee, i s klassom i s fokusom
    //     // No v teorii mozhno ostavit' tol'ko fokus, i ego v stiljah ispol'zovat' vmesto klassa
    //     // Na samom dele, reshenie s css-klassom mozhno sdelat', vynesja personazha
    //     // v otdel'nyj komponent. No koda budet bol'she, pojavitsja novoe sostojanie
    //     // i ne fakt, chto my vyigraem po optimizacii za schet bOl'shego kol-va jelementov

    //     // Po vozmozhnosti, ne zloupotrebljajte refami, tol'ko v krajnih sluchajah
    //     this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
    //     this.itemRefs[id].classList.add('char__item_selected');
    //     this.itemRefs[id].focus();
    // }   
    
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    } 

    // Jetot metod sozdan dlja optimizacii, 
    // chtoby ne pomeshhat' takuju konstrukciju v metod render
    // renderItems(arr) {
    //     const items =  arr.map((item, i) => {
    //         let imgStyle = {'objectFit' : 'cover'};
    //         if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    //             imgStyle = {'objectFit' : 'unset'};
    //         }
            
    //         // return (
    //         //     <li 
    //         //         className="char__item"
    //         //         key={item.id}
    //         //         onClick={() => this.props.onCharSelected(item.id)}>
    //         return (
    //             <li 
    //                 className="char__item"
    //                 tabIndex={0}
    //                 ref={this.setRef}
    //                 key={item.id}
    //                 onClick={() => {
    //                     this.props.onCharSelected(item.id);
    //                     this.focusOnItem(i);
    //                 }}
    //                 onKeyPress={(e) => {
    //                     if (e.key === ' ' || e.key === "Enter") {
    //                         this.props.onCharSelected(item.id);
    //                         this.focusOnItem(i);
    //                     }
    //                 }}>            
    //                     <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
    //                     <div className="char__name">{item.name}</div>
    //             </li>
    //         )
    //     });
    //     // A jeta konstrukcija vynesena dlja centrovki spinnera/oshibki
    //     return (
    //         <ul className="char__grid">
    //             {items}
    //         </ul>
    //     )
    // }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                <li 
                    className="char__item"
                    tabIndex={0}
                    // ref={this.setRef}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>            
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
                </CSSTransition>
            )
        });
        // A jeta konstrukcija vynesena dlja centrovki spinnera/oshibki
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    
    // const items = renderItems(charList);

    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading && !newItemLoading ? <Spinner/> : null;
    // const content = !(loading || error) ? items : null;

    // if (loading) {
    //     import('./someFunc')
    //         // .then(obj => obj.logger())
    //         .then(obj => obj.default())
    //         .catch();
    // }

    return (
        <div className="char__list">
            {/* {errorMessage}
            {spinner}
            {items} */}
            {setContent(process, () => renderItems(charList), newItemLoading)}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;