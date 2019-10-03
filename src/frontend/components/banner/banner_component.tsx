import React from 'react';
import SocialLoginContainer from '../../containers/social_login_container';
import { Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import * as Strings from '../../../shared/constants/string_constant';
import Aux, { withStyle } from './../aux_component';
import Logo from './logo';
import CategoryTabs, { CategoryTabInformation } from './category_tabs';

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

interface FilterProps {
    parentProps: Props;
    categoryFilters: string[];
    onFiltersChanged?: (filters: string[]) => void;
}

interface TabProps {
    resetCategoryFilters?: () => void;
    parentProps: Props;
}

const NotificationsTab = (props: TabProps) => {
    if (!props.parentProps.userdata) return null;
    const clickFunction = () => {
        props.parentProps.gotoNotifications();
    };
    return (
        <Button type="link" onClick={clickFunction}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="start" /> Notifications
        </Button>
    );
};

const SocialTab = (props: TabProps) => {
    return (
        <Button type="link">
            <SocialLoginContainer />
        </Button>
    );
};

const BuildCategoryTabsInformation = (categories: DataTypes.CategoryRecordType[], callback: (id: number) => void) => {
    let categoryTabsContent: CategoryTabInformation[] = [];

    if (categories) {
        categoryTabsContent.push({ id: -1, title: 'HOME', callback: callback });
        categoryTabsContent = categoryTabsContent.concat(
            categories.slice(1, 11).map(item => {
                const tab: CategoryTabInformation = { id: item.id, title: item.title, callback: callback };
                return tab;
            }),
        );
        categoryTabsContent.push({ id: -2, title: 'MORE', callback: callback });
    }
    return categoryTabsContent;
};

const BannerComponent = (props: Props) => {
    function onCategoryTabClicked(tabId: number) {}

    class Tabs extends React.Component {
        public render() {
            return (
                <Aux>
                    <NotificationsTab parentProps={props} />
                    <SocialTab parentProps={props} />
                </Aux>
            );
        }
    }

    const WrappedTabs = withStyle(Tabs, 'tabs');
    const categoryTabsInformation = BuildCategoryTabsInformation(props.categories, onCategoryTabClicked);

    return (
        <Aux>
            <Logo />
            <WrappedTabs />
            <CategoryTabs tabs={categoryTabsInformation} />
        </Aux>
    );
};

export default withStyle(BannerComponent, 'banner_component');
