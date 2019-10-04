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
}

const NotificationsButton = (props: Props) => {
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

const ProfileButton = (props: Props) => {
    return (
        <Button type="link">
            <SocialLoginContainer />
        </Button>
    );
};

const BuildCategoryTabsInformation = (categories: DataTypes.CategoryRecordType[], callback: (id: number) => void) => {
    let categoryTabsContent: TabData[] = [];
    const { CategoryTabsStrings } = Strings.default;

    if (!categories) return categoryTabsContent;

    categoryTabsContent.push({ id: -1, title: CategoryTabsStrings.HOME, callback: callback });

    categoryTabsContent = categoryTabsContent.concat(
        categories.slice(1, 11).map(item => {
            const tab: TabData = { id: item.id, title: item.title, callback: callback };
            return tab;
        }),
    );

    categoryTabsContent.push({ id: -2, title: CategoryTabsStrings.MORE, callback: callback });

    return categoryTabsContent;
};

const BannerComponent = (props: Props) => {
    function onCategoryTabClicked(tabId: number) {
        if (tabId > 0) {
            const filters = [`category=${tabId}`];
            props.gotoListBooks(filters);
        }
    }

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
    const categoryTabsInformation = BuildCategoryTabsInformation(props.categories, onCategoryTabClicked);
    const CategoryTabs = withStyle(Tabs, 'category_tabs');

    return (
        <Aux>
            <div className="div1">
                <Logo />
                <WrappedMenu />
            </div>
            
            <CategoryTabs tabs={categoryTabsInformation} />
        </Aux>
    );
};

export default withStyle(BannerComponent, 'banner_component');
