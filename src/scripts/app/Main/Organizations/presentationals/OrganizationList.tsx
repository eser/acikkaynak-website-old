import * as React from 'react';
import { Link } from 'react-router';

import * as ReactMarkdown from 'react-markdown';
import { Conditional } from '../../Shared/presentationals/Conditional';

export interface OrganizationListPropsInterface {
    datasource: any;
}

export interface OrganizationListStateInterface {
}

export class OrganizationList extends React.Component<OrganizationListPropsInterface, OrganizationListStateInterface> {

    state: OrganizationListStateInterface;

    constructor(props: OrganizationListPropsInterface) {
        super(props);
    }

    render(): any {
        const data = this.props.datasource;

        return (
            <div>
                {Object.keys(data).map((category) => {
                    const categoryKey = `category.${encodeURIComponent(category)}`,
                        categoryData = data[category];

                    return (
                        <div key={categoryKey}>
                            <h3 key={`${categoryKey}.caption`}><i className="fa fa-folder-o fa-fw"></i>{category}</h3>

                            <div key={`${categoryKey}.list`}>
                                {categoryData.map((organization) => {
                                    const organizationKey = `organization.${encodeURIComponent(organization.name)}`;

                                    return (
                                        <div className="organization" key={`${categoryKey}.${organizationKey}`}>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h4><a key={`${categoryKey}.${organizationKey}.link`} href={organization.url}>{organization.name}</a></h4>
                                                </div>
                                                <div className="col-md-4 text-right">
                                                    <Conditional test={organization.needsContribution}>
                                                        <span className="label label-success margin-right-8px"><i className="fa fa-code-fork" aria-hidden="true"></i> Katılım Bekliyor</span>
                                                    </Conditional>
                                                </div>
                                            </div>
                                            <p>
                                                <ReactMarkdown source={organization.content} />
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

}

export default OrganizationList;
