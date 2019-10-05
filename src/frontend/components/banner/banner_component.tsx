import React from 'react';
import SocialLoginContainer from '../../containers/social_login_container';
import { Button, Popover } from 'antd';
import * as DataTypes from '../../../shared/types';
import * as Strings from '../../../shared/constants/string_constant';
import Aux, { withStyle } from './../aux_component';
import Logo from './logo';
import Tabs, { TabData } from './tabs';
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

const BuildCategoryTabsInformation = (props: Props) => {
    let categoryTabsContent: TabData[] = [];
    const { CategoryTabsStrings } = Strings.default;

    if (!props.categories) return categoryTabsContent;

    categoryTabsContent.push({ id: -1, title: CategoryTabsStrings.HOME, callback: () => props.gotoSpaces() });

    categoryTabsContent = categoryTabsContent.concat(
        props.categories.slice(1, 11).map(item => {
            const tab: TabData = {
                id: item.id,
                title: item.title,
                callback: () => props.gotoListBooks([`category=${item.id}`]),
            };
            return tab;
        }),
    );

    categoryTabsContent.push({ id: -2, title: CategoryTabsStrings.MORE, callback: () => {} });

    return categoryTabsContent;
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
    const CategoryTabs = withStyle(Tabs, 'category_tabs');

    return (
        <Aux>
            <div className="div1">
                <Logo />
                <WrappedMenu />
            </div>

            <CategoryTabs tabs={BuildCategoryTabsInformation(props)} />
        </Aux>
    );
};

export default withStyle(BannerComponent, 'banner_component');
