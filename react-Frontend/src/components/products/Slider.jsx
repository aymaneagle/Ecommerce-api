import React from 'react';
import {Link} from 'react-router-dom';
import ProductStore from "../../store/ProductStore.js";
import SliderSkeleton from "../../skeleton/SliderSkeleton.jsx";

const Slider = () => {
    const {SliderList} = ProductStore()
    console.log(SliderList);
    if (SliderList === null) return <SliderSkeleton/>;
    return (
        <div id="carouselExampleDark" className="carousel hero-bg carousel-dark slide">
            {/* Indicators */}
            <div className="carousel-indicators">
                {SliderList.map((item, idx) => {
                    return (
                        <button
                            key={idx}
                            type="button"
                            data-bs-target="#carouselExampleDark"
                            data-bs-slide-to={idx}
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                    )
                })}

            </div>

            {/* Slides */}
            <div className="carousel-inner py-5">
                {/* First Slide */}
                {SliderList.map((item, idx) => {
                    let active = "carousel-item";
                    if (idx === 0) {
                        active = "carousel-item active";
                    }
                    return (
                        <div className={active} data-bs-interval="10000">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                        <h1 className="headline-1">{item['title']}</h1>
                                        <p>{item['des']}</p>
                                        <Link to="" className="btn text-white btn-success px-5">Buy Now</Link>
                                    </div>
                                    <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                        <img src="https://i.ibb.co.com/PsSCQTdh/mac-air.jpg" className="w-100" alt="Slide 1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}


            </div>

            {/* Controls */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    );
};

export default Slider;