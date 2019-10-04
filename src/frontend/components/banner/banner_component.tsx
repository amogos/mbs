import React from 'react';
import SocialLoginContainer from '../../containers/social_login_container';
import { Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import * as Strings from '../../../shared/constants/string_constant';
import Aux, { withStyle } from './../aux_component';
import Logo from './logo';
import Tabs, { TabData } from './tabs';

interface Props {
    gotoListBooks(filters: string[]): void;
    gotoSpaces(): void;
    gotoNotifications(): void;
    userdata: DataTypes.UserRecordType;
    categories: DataTypes.CategoryRecordType[];
    languages: DataTypes.LanguageRecordType[];
    addBook(book: DataTypes.BookValueType): void;
    action: string;
}

const NotificationsTab = (props: Props) => {
    if (!props.userdata) return null;
    const clickFunction = () => {
        props.gotoNotifications();
    };
    return (
        <Button type="link" onClick={clickFunction}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="start" /> Notifications
        </Button>
    );
};

const SocialTab = (props: Props) => {
    return (
        <Button type="link">
            <SocialLoginContainer />
        </Button>
    );
};

const BuildCategoryTabsInformation = (categories: DataTypes.CategoryRecordType[], callback: (id: number) => void) => {
    let categoryTabsContent: TabData[] = [];

    if (categories) {
        categoryTabsContent.push({ id: -1, title: 'HOME', callback: callback });
        categoryTabsContent = categoryTabsContent.concat(
            categories.slice(1, 11).map(item => {
                const tab: TabData = { id: item.id, title: item.title, callback: callback };
                return tab;
            }),
        );
        categoryTabsContent.push({ id: -2, title: 'MORE', callback: callback });
    }
    return categoryTabsContent;
};

const BannerComponent = (props: Props) => {
    function onCategoryTabClicked(tabId: number) {}

    class Menu extends React.Component {
        public render() {
            return (
                <Aux>
                    <NotificationsTab {...props} />
                    <SocialTab {...props} />
                </Aux>
            );
        }
    }

    const WrappedMenu = withStyle(Menu, 'banner_menu');
    const categoryTabsInformation = BuildCategoryTabsInformation(props.categories, onCategoryTabClicked);
    const CategoryTabs = withStyle(Tabs, 'category_tabs');

    return (
        <Aux>
            <Logo />
            <WrappedMenu />
            <CategoryTabs tabs={categoryTabsInformation} />
        </Aux>
    );
};

export default withStyle(BannerComponent, 'banner_component');
