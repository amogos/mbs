import React from 'react';
import BannerContainer from '../frontend/containers/banner_container';
import MainContainer from '../frontend/containers/main_container';
import LeftContainer from '../frontend/containers/left_container';

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
