import * as React from 'react';
import { Link } from 'react-router';

import * as ReactMarkdown from 'react-markdown';
import { Conditional } from '../../Shared/presentationals/Conditional';

export interface ProjectListPropsInterface {
    datasource: any;
}

export interface ProjectListStateInterface {
}

export class ProjectList extends React.Component<ProjectListPropsInterface, ProjectListStateInterface> {

    state: ProjectListStateInterface;

    constructor(props: ProjectListPropsInterface) {
        super(props);
    }

    render(): any {
        const data = this.props.datasource;

        return (
            <ul className="fa-ul">
                {Object.keys(data).map((category) => {
                    const categoryKey = `category.${encodeURIComponent(category)}`,
                        categoryData = data[category];

                    return (
                        <li key={categoryKey}>
                            <h3 key={`${categoryKey}.caption`}><i className="fa-li fa fa-folder-o fa-fw"></i>{category}</h3>

                            <ul className="fa-ul" key={`${categoryKey}.list`}>
                                {categoryData.map((project) => {
                                    const projectKey = `project.${encodeURIComponent(project.name)}`;

                                    return (
                                        <li key={`${categoryKey}.${projectKey}`}>
                                            <a key={`${categoryKey}.${projectKey}.link`} href={project.url}><i className="fa-li fa fa-file-o fa-fw"></i>{project.name}</a>
                                            <Conditional test={project.needsContribution}>
                                                <span class="label label-success"><i class="fa fa-code-fork" aria-hidden="true"></i> Katılım Bekliyor</span>
                                            </Conditional>
                                            <p>
                                                <ReactMarkdown source={project.content} />
                                            </p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        );
    }

}

export default ProjectList;
