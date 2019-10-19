import React from 'react';
import { Button, Popover } from 'antd';
import * as DataTypes from '../../../shared/types';
import Aux, { withStyle, requiresLogin } from '../aux_component';
import Logo from '../banner/logo';
import CategoryTabs from '../banner/category_tabs';
import NotificationsContainer from '../../containers/notifications_component_container';
import LoginComponent from './../social/facebook_login';
import ProfileComponent from '../../components/social/profile_component';

interface Props {
    getSpaces(filters: string[]): void;
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
            <ProfileComponent {...props} />
        </Button>
    );
};

const BannerComponent = (props: Props) => {
    class Menu extends React.Component {
        public render() {
            return (
                <Aux>
                    <NotificationsButton {...props} />
                    <ProfileButton {...props} />
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

export default requiresLogin(withStyle(BannerComponent, 'banner_component'), LoginComponent);
