import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Tabs, { TabData } from '../banner/tabs';
import * as DataTypes from '../../../shared/types';
import * as Strings from '../../../shared/constants/string_constant';
import { History } from 'history';

interface Props extends RouteComponentProps {
    getSpaces(filters: string[]): void;
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
        console.log('component construct');
    }

    private buildCategoryTabsInformation(): TabData[] {
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

    private resetStyle() {
        const tabsObject: HTMLDivElement = this.refobj.current as HTMLDivElement;
        if (!tabsObject) return;
        tabsObject.style.setProperty('position', 'relative');
    }

    //  make category tabs stick to the top page when certain scroll offset reached
    private updateStyle() {
        const scrollAmount = document.documentElement.scrollTop;
        const tabsObject: HTMLDivElement = this.refobj.current as HTMLDivElement;
        const scrollNeededForFixedStyle = 80;

        if (!tabsObject) return;

        if (scrollAmount > scrollNeededForFixedStyle) {
            tabsObject.style.setProperty('position', 'fixed');
        } else {
            tabsObject.style.setProperty('position', 'relative');
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => this.updateStyle());
        this.resetStyle();
        this.updateStyle();
    }

    componentDidUpdate() {
        window.addEventListener('scroll', () => this.updateStyle());
        this.resetStyle();
        this.updateStyle();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', () => this.updateStyle());
    }

    public render() {
        return (
            <div ref={this.refobj} className="category_tabs">
                <Tabs tabs={this.buildCategoryTabsInformation()} />
            </div>
        );
    }
}

export default withRouter(CategoryTabs);
