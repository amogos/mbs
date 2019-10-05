import React from 'react';
import SocialLoginContainer from '../../containers/social_login_container';
import { Button, Popover } from 'antd';
import * as DataTypes from '../../../shared/types';
import Aux, { withStyle } from '../aux_component';
import Logo from '../banner/logo';
import CategoryTabs from '../banner/category_tabs';
import NotificationsContainer from '../../containers/notifications_component_container';

interface Props {
    gotoListBooks(filters: string[]): void;
    gotoSpaces(): void;
    gotoNotifications(): void;
    userdata: DataTypes.UserRecordType;
    categories: DataTypes.CategoryRecordType[];
    languages: DataTypes.LanguageRecordType[];
    addBook(book: DataTypes.BookValueType): void;
}

const NotificationsButton = (props: Props) => {
    if (!props.userdata) return null;
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
            <SocialLoginContainer />
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

export default withStyle(BannerComponent, 'banner_component');
