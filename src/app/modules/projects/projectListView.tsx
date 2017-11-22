import * as React from 'react';
import { Link } from 'react-router-dom';

import * as ReactMarkdown from 'react-markdown';

import { ConditionalView } from '../shared/conditionalView';

interface ProjectListViewPropsInterface {
    datasource: any;
}

interface ProjectListViewStateInterface {
    filter: string;
}

class ProjectListView extends React.Component<ProjectListViewPropsInterface, ProjectListViewStateInterface> {
    actionRefs: { [key: string]: any };

    constructor(props: ProjectListViewPropsInterface, context: any) {
        super(props, context);

        this.actionRefs = {
            onFilterChanged: this.onFilterChanged.bind(this),
        };

        this.state = {
            filter: '',
        };
    }

    onFilterChanged(ev) {
        this.setState({
            filter: ev.target.value,
        });
    }

    render(): any {
        const data = this.props.datasource;

        const filter = this.state.filter.trim();

        return (
            <div>
                <input type="text" className="form-control" placeholder="Filtreleme" value={this.state.filter} onChange={this.actionRefs.onFilterChanged} />
                {Object.keys(data).map((category) => {
                    const categoryKey = `category.${encodeURIComponent(category)}`,
                        categoryData = data[category];

                    return (
                        <div key={categoryKey}>
                            <h3 key={`${categoryKey}.caption`}><i className="fa fa-folder-o fa-fw"></i>{category}</h3>

                            <div key={`${categoryKey}.list`}>
                                {categoryData.map((project) => {
                                    const projectKey = `project.${encodeURIComponent(project.name)}`;

                                    if (filter.length >= 3 && project.name.indexOf(filter) === -1 && project.content.indexOf(filter) === -1) {
                                        return null;
                                    }

                                    return (
                                        <div className="project" key={`${categoryKey}.${projectKey}`}>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h4><a key={`${categoryKey}.${projectKey}.link`} href={project.url}>{project.name}</a></h4>
                                                </div>
                                                <div className="col-md-4 text-right">
                                                    <ConditionalView test={project.needsContribution}>
                                                        <span className="label label-success margin-right-8px"><i className="fa fa-code-fork" aria-hidden="true"></i> Katılım Bekliyor</span>
                                                    </ConditionalView>

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

export {
    ProjectListViewPropsInterface,
    ProjectListViewStateInterface,
    ProjectListView,
}

export default ProjectListView;
