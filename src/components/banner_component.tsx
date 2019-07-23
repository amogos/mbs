import React from 'react';
import SocialLoginContainer from './../containers/social_login_container';
import { PageHeader, Button } from 'antd';

interface Props {
    gotoListBooks(filters: string[]): void;
    gotoAddBook(): void;
    gotoNotifications(): void;
}

const BannerComponent = (props: Props) => {
    return (
        <PageHeader title="" breadcrumb={{}}>
            <div className="wrap">
                <div className="content">
                    <p className="contentLink">
                        <Button type="link" onClick={() => props.gotoListBooks([])}>
                            <img
                                src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                                alt="start"
                            />{' '}
                            Search
                        </Button>

                        <Button type="link" onClick={() => props.gotoAddBook()}>
                            <img
                                src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
                                alt="start"
                            />{' '}
                            Add Book
                        </Button>

                        <Button type="link" onClick={() => props.gotoNotifications()}>
                            <img
                                src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                                alt="start"
                            />{' '}
                            Notifications
                        </Button>

                        <SocialLoginContainer />
                    </p>
                </div>
            </div>
        </PageHeader>
    );
};

export default BannerComponent;
