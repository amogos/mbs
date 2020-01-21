import React from 'react';
import BannerContainer from '../containers/banner_container';
import MainContainer from '../containers/main_container';
import RightContainer from '../containers/right_container';
import LeftContainer from '../containers/left_container';

export const DisplaySubscription = () => {
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
