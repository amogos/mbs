import React, { useState } from 'react';
import SocialLoginContainer from './../containers/social_login_container';
import { PageHeader, Button } from 'antd';
import FilteringTabsContainer from '../containers/filtering_tabs_container';

interface Props {
    gotoListBooks(filters: string[]): void;
    gotoAddBook(): void;
    gotoNotifications(): void;
}

interface FilterProps {
    page: string;
}

const ShowFilteringTabs = (props: FilterProps) => {
    if (props.page === 'search') {
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
                                setPage('search');
                            }}
                        >
                            <img
                                src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                                alt="start"
                            />{' '}
                            Search
                        </Button>

                        <Button
                            type="link"
                            onClick={() => {
                                props.gotoAddBook();
                                setPage('add');
                            }}
                        >
                            <img
                                src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
                                alt="start"
                            />{' '}
                            Add Book
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

                        <SocialLoginContainer />
                    </p>
                </div>
                <ShowFilteringTabs page={page} />
            </div>
        </PageHeader>
    );
};

export default BannerComponent;
