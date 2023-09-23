// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import UseMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';


import './charInfo.scss';
// import thor from '../../resources/img/thor.jpeg';

// class CharInfo extends Component {
const CharInfo = (props) => {    

    const [char, setChar] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);

    // state = {
    //     char: null,
    //     loading: false,
    //     error: false
    // }

    const {loading, error, getCharacter, clearError} = UseMarvelService();

    // componentDidMount() {
    //     this.updateChar();
    // }

    // useEffect(() => {
    //     updateChar();
    // }, []) // componentDidMount()

    // componentDidUpdate(prevProps) {
    //     if (this.props.charId !== prevProps.charId) {
    //         this.updateChar();
    //     }
    // }

    useEffect(() => {
        updateChar();
    }, [props.charId]) // componentDidUpdate(prevProps) // componentDidMount()

// prior to react 16
    // componentDidCatch(err, info) {
    //     console.log(err, info);
    //     this.setState({error: true});
    // }

    // updateChar = () => {
    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        // onCharLoading();
        clearError();
        getCharacter(charId)
            .then(onCharLoaded);
            // .catch(onError);

        // this.foo.bar = 0;
    }

    // onCharLoaded= (char) => {
    const onCharLoaded= (char) => {
        // this.setState({
        //     char, 
        //     loading: false
        // })
        // setLoading(false);
        setChar(char);
    }

    // const onCharLoading = () => {
    //     // this.setState({
    //     //     loading: true
    //     // })
    //     setLoading(true);
    // }

    // const onError = () => {
    //     // this.setState({
    //     //     loading: false,
    //     //     error: true
    //     // })
    //     setLoading(false);
    //     setError(true);
    // }


    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                        <img src={thumbnail} alt={name} style={imgStyle}/>
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <a href={homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={wiki} className="button button__secondary">
                                    <div className="inner">wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="char__descr">
                        {description}                        
                    </div>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {comics.length > 0 ? null : 'There is no comics with this character'}
                        {
                            comics.map((item, i) => {
                                // eslint-disable-next-line
                                if (i > 9) return;
                                return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                                )
                            })
                        }


                    </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
    // charId: PropTypes.string
}

export default CharInfo;