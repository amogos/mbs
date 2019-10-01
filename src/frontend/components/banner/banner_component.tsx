import React, { useState } from 'react';
import SocialLoginContainer from '../../containers/social_login_container';
import { Button } from 'antd';
import FilteringTabsComponent from './filtering_tabs_component';
import * as DataTypes from '../../../shared/types';
import * as Strings from '../../../shared/constants/string_constant';
import * as ActionTypes from './../../../shared/constants/action_constant';
import Aux, { withStyle } from './../aux_component';
import Logo from './logo';
import CategoryTabs, { CategoryTabInformation } from './category_tabs';

const { PageActionConstant } = ActionTypes.default;
const { FilteringTabsStrings } = Strings.default;

interface Props {
    gotoListBooks(filters: string[]): void;
    gotoSpaces(): void;
    gotoNotifications(): void;
    userdata: DataTypes.UserRecordType;
    categories: DataTypes.CategoryRecordType[];
    languages: DataTypes.LanguageRecordType[];
    addBook(book: DataTypes.BookValueType): void;
    action: string;
    page: string;
}

interface FilterProps {
    page: string;
    parentProps: Props;
    categoryFilters: string[];
    onFiltersChanged?: (filters: string[]) => void;
}

interface TabProps {
    setPage(page: string): void;
    resetCategoryFilters?: () => void;
    parentProps: Props;
}

const MySpaceTab = (props: TabProps) => {
    if (!props.parentProps.userdata) return null;
    const clickFunction = () => {
        if (props.resetCategoryFilters) props.resetCategoryFilters();
        props.parentProps.gotoListBooks(['owner=' + props.parentProps.userdata.id]);
        window.scrollTo(0, 0);
        props.setPage('my-space');
    };
    return (
        <Button type="link" onClick={clickFunction}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" alt="start" /> MySpace
        </Button>
    );
};

const SpacesTab = (props: TabProps) => {
    if (!props.parentProps.userdata) return null;
    const clickFunction = () => {
        if (props.resetCategoryFilters) props.resetCategoryFilters();
        props.parentProps.gotoSpaces();
        props.setPage('spaces');
        window.scrollTo(0, 0);
    };
    return (
        <Button type="link" onClick={clickFunction}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" alt="start" /> Spaces
        </Button>
    );
};

const RentTab = (props: TabProps) => {
    if (!props.parentProps.userdata) return null;
    const clickFunction = () => {
        if (props.resetCategoryFilters) props.resetCategoryFilters();
        props.parentProps.gotoListBooks(['owner_ne=' + props.parentProps.userdata.id]);
        props.setPage('rent');
        window.scrollTo(0, 0);
    };
    return (
        <Button type="link" onClick={clickFunction}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="start" /> Rent
        </Button>
    );
};

const NotificationsTab = (props: TabProps) => {
    if (!props.parentProps.userdata) return null;
    const clickFunction = () => {
        window.scrollTo(0, 0);
        props.parentProps.gotoNotifications();
        props.setPage('notifications');
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

const ShowSpaceFilteringTabs = (props: FilterProps) => {
    const tabIds = ['rented', 'assigned', 'all'];
    const defaultTabIndex = 2;
    const currentUserId = props.parentProps.userdata.id;
    const filters = [
        ['holder=' + currentUserId],
        ['owner=' + currentUserId, 'holder_gte=0'],
        ['owner=' + currentUserId],
    ];
    const icons = ['apple', 'android', 'android'];
    const titles = [
        FilteringTabsStrings.MYBOOKSHELVE_STRING_RENTED,
        FilteringTabsStrings.MYBOOKSHELVE_STRING_ASSIGNED,
        FilteringTabsStrings.MYBOOKSHELVE_STRING_ALL,
    ];
    return (
        <FilteringTabsComponent
            categories={props.parentProps.categories}
            tabIds={tabIds}
            defaultTabIndex={defaultTabIndex}
            filters={filters}
            icons={icons}
            titles={titles}
            categoryFilters={props.categoryFilters}
            onFiltersChanged={props.onFiltersChanged}
        />
    );
};

const ShowRentFilteringTabs = (props: FilterProps) => {
    const tabIds = ['assigned', 'all'];
    const defaultTabIndex = 1;
    const currentUserId = props.parentProps.userdata.id;
    const filters = [['owner_ne=' + currentUserId, 'holder_gte=1'], ['owner_ne=' + currentUserId]];
    const icons = ['apple', 'android'];
    const titles = [FilteringTabsStrings.MYBOOKSHELVE_STRING_ASSIGNED, FilteringTabsStrings.MYBOOKSHELVE_STRING_ALL];
    return (
        <FilteringTabsComponent
            categories={props.parentProps.categories}
            tabIds={tabIds}
            defaultTabIndex={defaultTabIndex}
            filters={filters}
            icons={icons}
            titles={titles}
            categoryFilters={props.categoryFilters}
            onFiltersChanged={props.onFiltersChanged}
        />
    );
};

const BannerComponent = (props: Props) => {
    const [page, setPage] = useState('');
    const [categoryFilters, setCategoryFilters] = useState(['']);

    function onCategoryTabClicked(tabId: number) {}

    let categoryTabsContent: CategoryTabInformation[] = [];

    if (props.categories) {
        categoryTabsContent.push({ id: -1, title: 'HOME', callback: onCategoryTabClicked });
        categoryTabsContent = categoryTabsContent.concat(
            props.categories.slice(1, 11).map(item => {
                const tab: CategoryTabInformation = { id: item.id, title: item.title, callback: onCategoryTabClicked };
                return tab;
            }),
        );
        categoryTabsContent.push({ id: -2, title: 'MORE', callback: onCategoryTabClicked });
    }

    class Tabs extends React.Component {
        public render() {
            return (
                <span>
                    <MySpaceTab
                        parentProps={props}
                        setPage={(page: string) => setPage(page)}
                        resetCategoryFilters={() => setCategoryFilters([''])}
                    />
                    <SpacesTab
                        parentProps={props}
                        setPage={(page: string) => setPage(page)}
                        resetCategoryFilters={() => setCategoryFilters([''])}
                    />
                    <NotificationsTab parentProps={props} setPage={(page: string) => setPage(page)} />
                    <SocialTab parentProps={props} setPage={(page: string) => setPage(page)} />
                </span>
            );
        }
    }

    const WrappedTabs = withStyle(Tabs, 'tabs');

    return (
        <Aux>
            <Logo />
            <WrappedTabs />
            {page === 'my-space' ? <CategoryTabs tabs={categoryTabsContent} /> : null}
        </Aux>
    );
};

export default withStyle(BannerComponent, 'banner_component');
