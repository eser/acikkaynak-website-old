import * as React from 'react';
import { Link } from 'react-router-dom';

import * as ReactMarkdown from 'react-markdown';

import ConditionalView from '../shared/conditionalView';

interface OrganizationListViewProps {
    datasource: any;
}

interface OrganizationListViewState {
}

class OrganizationListView extends React.Component<OrganizationListViewProps, OrganizationListViewState> {
    constructor(props: OrganizationListViewProps, context: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const data = this.props.datasource;

        return (
            <React.Fragment>
                {Object.keys(data).map((category) => {
                    const categoryKey = `category.${encodeURIComponent(category)}`,
                        categoryData = data[category];

                    return (
                        <div key={categoryKey}>
                            <h2 className="title is-spaced" key={`${categoryKey}.caption`}><i className="fa fa-folder-o fa-fw"></i>{category}</h2>

                            <div key={`${categoryKey}.list`}>
                                {categoryData.map((organization) => {
                                    const organizationKey = `organization.${encodeURIComponent(organization.name)}`;

                                    return (
                                        <div className="organization" key={`${categoryKey}.${organizationKey}`}>
                                            <div className="card">
                                                <a key={`${categoryKey}.${organizationKey}.link`} href={organization.url}>
                                                    <header className="card-header">
                                                        <div className="card-header-title">
                                                            {organization.name}
                                                        </div>
                                                    </header>
                                                </a>
                                                <div className="card-content">
                                                    <div className="content">
                                                        <ReactMarkdown source={organization.content} />
                                                    </div>
                                                </div>
                                                <footer className="card-footer">
                                                    <div className="column">
                                                        <a href={`{organization.url}`}>{organization.url}</a>
                                                    </div>
                                                    <div className="column has-text-right">
                                                        <ConditionalView test={organization.needsContribution}>
                                                            <span className="tag is-success"><i className="fa fa-code-fork" aria-hidden="true"></i> &nbsp;Katılım Bekliyor</span>
                                                        </ConditionalView>
                                                    </div>
                                                </footer>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <br />
                            <br />
                            <br />
                        </div>
                    );
                })}
            </React.Fragment>
        );
    }
}

export {
    OrganizationListView as default,
    OrganizationListViewProps,
    OrganizationListViewState,
};
