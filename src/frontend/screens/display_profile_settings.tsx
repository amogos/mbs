import React from 'react';
import BannerContainer from '../containers/banner_container';
import MainContainer from '../containers/main_container';
import LeftContainer from '../containers/left_container';

export const DisplayProfileSettings = () => {
    return (
        <div className="app">
            <BannerContainer />
            <div className="middle_area">
                <LeftContainer />
                <MainContainer />
            </div>
        </div>
    );
};
