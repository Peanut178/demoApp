import React from "react";

const countriesComponent = (props) => {
    return (
        <div className="countries">
            <div className="countries__item">
                <div className="countries__item-img">
                     <img src={props.image} alt='animal' />
                </div>
                <div className="countries__item-text">
                    <p className="text__capital">Capital : {props.capital}</p>
                    <p className="text__language">Language : {props.language}</p>
                    <p className="text__population">Population : {props.population}</p>
                    <p className="text__currency">Currency : {props.currency}</p>
                </div>
            </div>
            <button onClick={props.onclick} className='btn btn-add'>
          Change
        </button>

        </div>
    )
}
export default countriesComponent 