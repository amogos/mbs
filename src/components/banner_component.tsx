import React, { useState } from 'react';
import SocialLoginContainer from './../containers/social_login_container';
import { PageHeader, Button, Avatar } from 'antd';
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
                        <Button
                            type="link"
                            onClick={() => {
                                props.gotoListBooks([]);
                                setPage('my-space');
                            }}
                        >
                            <img
                                src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                                alt="start"
                            />{' '}
                            MySpace
                        </Button>
                        <Button
                            type="link"
                            onClick={() => {
                                props.gotoAddBook();
                                setPage('spaces');
                            }}
                        >
                            <img
                                src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
                                alt="start"
                            />{' '}
                            Spaces
                        </Button>
                        <Button
                            type="link"
                            onClick={() => {
                                props.gotoListBooks(['owner!=' + props.userdata.id]);
                                setPage('rent');
                            }}
                        >
                            <img
                                src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                                alt="start"
                            />{' '}
                            Rent
                        </Button>
                        <Button
                            type="link"
                            onClick={() => {
                                props.gotoNotifications();
                                setPage('notifications');
                            }}
                        >
                            <img
                                src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                                alt="start"
                            />{' '}
                            Notifications
                        </Button>
                        <Button type="link">
                            <SocialLoginContainer />
                        </Button>
                    </p>
                </div>
                <ShowFilteringTabs page={page} />
            </div>
        </PageHeader>
    );
};

export default BannerComponent;
