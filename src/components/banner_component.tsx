import React, { useState } from 'react';
import SocialLoginContainer from './../containers/social_login_container';
import { PageHeader, Button } from 'antd';
import FilteringTabsContainer from '../containers/filtering_tabs_container';
import * as DataTypes from './../types';

interface Props {
    gotoListBooks(filters: string[]): void;
    gotoAddBook(): void;
    gotoNotifications(): void;
    userdata: DataTypes.UserRecordType;
}

interface FilterProps {
    page: string;
}

interface TabProps {
    setPage(page: string): void;
    parentProps: Props;
}

const MySpaceTab = (props: TabProps) => {
    const clickFunction = () => {
        props.parentProps.gotoListBooks([]);
        props.setPage('my-space');
    };
    return (
        <Button type="link" onClick={clickFunction}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" alt="start" /> MySpace
        </Button>
    );
};

const SpacesTab = (props: TabProps) => {
    const clickFunction = () => {
        props.parentProps.gotoAddBook();
        props.setPage('spaces');
    };
    return (
        <Button type="link" onClick={clickFunction}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" alt="start" /> Spaces
        </Button>
    );
};

const RentTab = (props: TabProps) => {
    const clickFunction = () => {
        props.parentProps.gotoListBooks(['owner!=' + props.parentProps.userdata.id]);
        props.setPage('rent');
    };
    return (
        <Button type="link" onClick={clickFunction}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="start" /> Rent
        </Button>
    );
};

const NotificationsTab = (props: TabProps) => {
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

const ShowFilteringTabs = (props: FilterProps) => {
    if (props.page === 'rent' || props.page === 'my-space') {
        return <FilteringTabsContainer />;
    }
    return null;
};

const BannerComponent = (props: Props) => {
    const [page, setPage] = useState('');
    return (
        <PageHeader title="" breadcrumb={{}}>
            <div className="wrap">
                <div className="content">
                    <p className="contentLink">
                        <MySpaceTab parentProps={props} setPage={(page: string) => setPage(page)} />
                        <SpacesTab parentProps={props} setPage={(page: string) => setPage(page)} />
                        <RentTab parentProps={props} setPage={(page: string) => setPage(page)} />
                        <NotificationsTab parentProps={props} setPage={(page: string) => setPage(page)} />
                        <SocialTab parentProps={props} setPage={(page: string) => setPage(page)} />
                    </p>
                </div>
                <ShowFilteringTabs page={page} />
            </div>
        </PageHeader>
    );
};

export default BannerComponent;
