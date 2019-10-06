import React from 'react';
import ProfileContainer from '../../containers/profile_container';
import { Button, Popover } from 'antd';
import * as DataTypes from '../../../shared/types';
import Aux, { withStyle, requiresLogin } from '../aux_component';
import Logo from '../banner/logo';
import CategoryTabs from '../banner/category_tabs';
import NotificationsContainer from '../../containers/notifications_component_container';
import LoginComponent from './../social/facebook_login';

interface Props {
    gotoListBooks(filters: string[]): void;
    gotoSpaces(): void;
    gotoNotifications(): void;
    loginUser(userInfo: DataTypes.UserValueType): void;
    userdata: DataTypes.UserRecordType;
    categories: DataTypes.CategoryRecordType[];
    languages: DataTypes.LanguageRecordType[];
    addBook(book: DataTypes.BookValueType): void;
}

const NotificationsButton = (props: Props) => {
    return (
        <Popover placement="bottom" content={<NotificationsContainer />} trigger="click">
            <Button type="link">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="start" />{' '}
                Notifications
            </Button>
        </Popover>
    );
};

const ProfileButton = (props: Props) => {
    return (
        <Button type="link">
            <ProfileContainer />
        </Button>
    );
};

const BannerComponent = (props: Props) => {
    class Menu extends React.Component {
        public render() {
            let WrappedNotificationsButton = requiresLogin(NotificationsButton);
            let WrappedProfileButton = requiresLogin(ProfileButton, LoginComponent);

            return (
                <Aux>
                    <WrappedNotificationsButton {...props} />
                    <WrappedProfileButton {...props} />
                </Aux>
            );
        }
    }

    const WrappedMenu = withStyle(Menu, 'banner_menu');

    return (
        <Aux>
            <div className="div1">
                <Logo />
                <WrappedMenu />
            </div>

            <CategoryTabs {...props} />
        </Aux>
    );
};

export default withStyle(BannerComponent, 'banner_component');
