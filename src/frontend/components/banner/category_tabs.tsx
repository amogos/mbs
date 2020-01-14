import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Affix } from 'antd';
import Tabs, { TabData } from '../banner/tabs';
import * as DataTypes from '../../../shared/types';
import * as Strings from '../../../shared/constants/string_constant';
import { History } from 'history';

interface Props extends RouteComponentProps {
    getSpaces(filters: string[], callbacks: ((result: DataTypes.Spaces) => void)[]): void;
    categories: DataTypes.CategoryRecordType[];
    usercategories: DataTypes.CategoryRecordType[];
    urlparams: DataTypes.UrlParms;
    history: History;
}

class CategoryTabs extends React.Component<Props, {}> {
    tabs: TabData[] = [];
    refobj: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);
        this.refobj = React.createRef<HTMLDivElement>();
    }

    private GetTabsData(): TabData[] {
        let categoryTabsContent: TabData[] = [];
        const { CategoryTabsStrings } = Strings.default;
        const numMinumumVisibleTabs = 10;
        const { props } = this;

        if (!props.categories || !props.usercategories) return categoryTabsContent;

        //  HOME category tab
        categoryTabsContent.push({
            id: -1,
            title: CategoryTabsStrings.HOME,
            callback: () => {
                props.history.push('/spaces');
            },
        });

        //  add user preferred categories
        categoryTabsContent = categoryTabsContent.concat(
            props.usercategories.map(item => {
                const tab: TabData = {
                    id: item.id,
                    title: item.title,
                    callback: () => {
                        props.history.push(`/books?category=${item.id}`);
                    },
                };
                return tab;
            }),
        );

        //  add extra random categories if minimum number of visible tabs not reached
        if (numMinumumVisibleTabs > props.usercategories.length) {
            const extraCategories = props.categories.filter(
                element => props.usercategories.find(match => match.id === element.id) === undefined,
            );
            categoryTabsContent = categoryTabsContent.concat(
                extraCategories.slice(1, numMinumumVisibleTabs - props.usercategories.length + 1).map(item => {
                    const tab: TabData = {
                        id: item.id,
                        title: item.title,
                        callback: () => {
                            props.history.push(`/books?category=${item.id}`);
                        },
                    };
                    return tab;
                }),
            );
        }

        //  MORE category tab
        categoryTabsContent.push({
            id: -2,
            title: CategoryTabsStrings.MORE,
            callback: () => {
                props.history.push('/settings');
            },
        });

        return categoryTabsContent;
    }

    public render() {
        return (
            <Affix offsetTop={0}>
                <div ref={this.refobj} className="category_tabs">
                    <Tabs tabs={this.GetTabsData()} />
                </div>
            </Affix>
        );
    }
}

export default withRouter(CategoryTabs);
