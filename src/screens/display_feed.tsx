import React from 'react';
import BannerContainer from '../frontend/containers/banner_container';
import MainContainer from '../frontend/containers/main_container';
import RightContainer from '../frontend/containers/right_container';
import LeftContainer from '../frontend/containers/left_container';

export const DisplayFeed = () => {
    return (
        <div className="app">
            <BannerContainer />
            <div className="middle_area">
                <LeftContainer />
                <MainContainer />
                <RightContainer />
            </div>
        </div>
    );
};
