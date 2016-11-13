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
            <div>
                {Object.keys(data).map((category) => {
                    const categoryKey = `category.${encodeURIComponent(category)}`,
                        categoryData = data[category];

                    return (
                        <div key={categoryKey}>
                            <h3 key={`${categoryKey}.caption`}><i className="fa fa-folder-o fa-fw"></i>{category}</h3>

                            <div key={`${categoryKey}.list`}>
                                {categoryData.map((project) => {
                                    const projectKey = `project.${encodeURIComponent(project.name)}`;

                                    return (
                                        <div className="project" key={`${categoryKey}.${projectKey}`}>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h4><a key={`${categoryKey}.${projectKey}.link`} href={project.url}>{project.name}</a></h4>
                                                </div>
                                                <div className="col-md-4 text-right">
                                                    <Conditional test={project.needsContribution}>
                                                        <span className="label label-success margin-right-8px"><i className="fa fa-code-fork" aria-hidden="true"></i> Katılım Bekliyor</span>
                                                    </Conditional>

                                                    <img src={`https://img.shields.io/github/stars/${project.githubUrl}.svg?style=social&amp;label=Star`} alt={`${project.name} stars`} />
                                                </div>
                                            </div>
                                            <p>
                                                <ReactMarkdown source={project.content} />
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

export default ProjectList;
