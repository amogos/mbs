import React, { useState } from 'react';
import SocialLoginContainer from '../../containers/social_login_container';
import { PageHeader, Button } from 'antd';
import FilteringTabsComponent from './filtering_tabs_component';
import * as DataTypes from '../../types';
import * as Strings from '../../constants/string_constant';
import FilteringCategoriesComponent from './filtering_categories_component';

const { FilteringTabsStrings } = Strings.default;

interface Props {
    gotoListBooks(filters: string[]): void;
    gotoSpaces(): void;
    gotoNotifications(): void;
    userdata: DataTypes.UserRecordType;
    categories: DataTypes.CategoryRecordType[];
    languages: DataTypes.LanguageRecordType[];
    addBook(book: DataTypes.BookValueType): void;
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
    if(!props.parentProps.userdata)
        return null;
    const clickFunction = () => {
        if (props.resetCategoryFilters) props.resetCategoryFilters();
        props.parentProps.gotoListBooks(['owner=' + props.parentProps.userdata.id]);
        props.setPage('my-space');
    };
    return (
        <Button type="link" onClick={clickFunction}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" alt="start" /> MySpace
        </Button>
    );
};

const SpacesTab = (props: TabProps) => {
    if(!props.parentProps.userdata)
        return null;
    const clickFunction = () => {
        if (props.resetCategoryFilters) props.resetCategoryFilters();
        props.parentProps.gotoSpaces();
        props.setPage('spaces');
    };
    return (
        <Button type="link" onClick={clickFunction}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" alt="start" /> Spaces
        </Button>
    );
};

const RentTab = (props: TabProps) => {
    if(!props.parentProps.userdata)
        return null;
    const clickFunction = () => {
        if (props.resetCategoryFilters) props.resetCategoryFilters();
        props.parentProps.gotoListBooks(['owner_ne=' + props.parentProps.userdata.id]);
        props.setPage('rent');
    };
    return (
        <Button type="link" onClick={clickFunction}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="start" /> Rent
        </Button>
    );
};

const NotificationsTab = (props: TabProps) => {
    if(!props.parentProps.userdata)
        return null;
    const clickFunction = () => {
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

const FilteringTabs = (props: FilterProps) => {
    if(!props.parentProps.userdata)
        return null;
    if (props.page === 'my-space') {
        return ShowSpaceFilteringTabs(props);
    } else if (props.page === 'rent') {
        return ShowRentFilteringTabs(props);
    }
    return null;
};

const ShouldShowCategoryFiltering = (page: string) => {
    return page === 'my-space' || page === 'rent';
}

const BannerComponent = (props: Props) => {
    const [page, setPage] = useState('');
    const [categoryFilters, setCategoryFilters] = useState(['']);
    const [tabFilters, setTabFilters] = useState(['']);
    return (
        <div>
            <PageHeader title="" breadcrumb={{}}>
                <div className="wrap">
                    <div className="content">
                        <p className="contentLink">
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
                            <RentTab
                                parentProps={props}
                                setPage={(page: string) => setPage(page)}
                                resetCategoryFilters={() => setCategoryFilters([''])}
                            />
                            <NotificationsTab parentProps={props} setPage={(page: string) => setPage(page)} />
                            <SocialTab parentProps={props} setPage={(page: string) => setPage(page)} />
                        </p>
                    </div>
                    <FilteringTabs
                        parentProps={props}
                        page={page}
                        categoryFilters={categoryFilters}
                        onFiltersChanged={filters => {
                            setTabFilters(filters);
                            props.gotoListBooks(filters);
                        }}
                    />
                    <FilteringCategoriesComponent
                        visible={ShouldShowCategoryFiltering(page)}
                        categories={props.categories}
                        tabFilters={tabFilters}
                        categoryFilters={categoryFilters}
                        onFiltersChanged={filters => {
                            setCategoryFilters(filters);
                            props.gotoListBooks(filters);
                        }}
                    />
                </div>
            </PageHeader>
        </div>
    );
};

export default BannerComponent;
