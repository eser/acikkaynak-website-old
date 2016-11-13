import * as React from 'react';
import { Link } from 'react-router';

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
                                        <li key={`${categoryKey}.${projectKey}`}><Link key={`${categoryKey}.${projectKey}.link`} to={`/projects/${encodeURIComponent(project.name)}`}><i className="fa-li fa fa-file-o fa-fw"></i>{project.name}</Link></li>
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
