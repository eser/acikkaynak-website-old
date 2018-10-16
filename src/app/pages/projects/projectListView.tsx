import * as React from 'react';
import { Link } from 'react-router-dom';

import * as ReactMarkdown from 'react-markdown';

import ConditionalView from '../shared/conditionalView';

interface ProjectListViewProps {
    datasource: any;
}

interface ProjectListViewState {
    filter: string;
}

class ProjectListView extends React.Component<ProjectListViewProps, ProjectListViewState> {
    actionRefs: { [key: string]: any };

    constructor(props: ProjectListViewProps, context: any) {
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

    render(): JSX.Element {
        const data = this.props.datasource;

        const filter = this.state.filter.trim().toLocaleLowerCase();

        return (
            <React.Fragment>
                <div>
                    <input type="text" className="input" placeholder="Filtreleme" value={this.state.filter} onChange={this.actionRefs.onFilterChanged} />
                </div>

                {Object.keys(data).map((category) => {
                    const categoryKey = `category.${encodeURIComponent(category)}`,
                        categoryData = data[category];

                    const categoryHtml = categoryData.map((project) => {
                        const projectKey = `project.${encodeURIComponent(project.name)}`;

                        if (filter.length >= 3) {
                            const pname = project.name.toLocaleLowerCase();
                            const pcontent = project.content.toLocaleLowerCase();

                            if (pname.indexOf(filter) === -1 && pcontent.indexOf(filter) === -1) {
                                return null;
                            }
                        }

                        return (
                            <div className="project" key={`${categoryKey}.${projectKey}`}>
                                <div className="card">
                                    <a key={`${categoryKey}.${projectKey}.link`} href={project.url}>
                                        <header className="card-header">
                                            <div className="card-header-title">
                                                <div className="column is-three-fifths">
                                                    {project.name}
                                                </div>
                                                <div className="column has-text-right">
                                                    <img src={`https://img.shields.io/github/stars/${project.githubUrl}.svg?style=social&amp;label=Star`} alt={`${project.name} stars`} />
                                                </div>
                                            </div>
                                        </header>
                                    </a>
                                    <div className="card-content">
                                        <div className="content">
                                            <ReactMarkdown source={project.content} />
                                        </div>
                                    </div>
                                    <footer className="card-footer">
                                        <div className="column">
                                            <a href={`https://github.com/${project.githubUrl}`}>{project.githubUrl}</a>
                                        </div>
                                        <div className="column has-text-right">
                                            <ConditionalView test={project.needsContribution}>
                                                <span className="tag is-success"><i className="fa fa-code-fork" aria-hidden="true"></i> &nbsp;Katılım Bekliyor</span>
                                            </ConditionalView>
                                        </div>
                                    </footer>
                                </div>
                            </div>
                        );
                    })
                        .filter(x => x !== null);

                    if (categoryHtml.length === 0) {
                        return null;
                    }

                    return (
                        <div className="margin-top-15px" key={categoryKey}>
                            <h2 className="title is-spaced" key={`${categoryKey}.caption`}><i className="fa fa-folder-o fa-fw"></i>{category}</h2>

                            <div key={`${categoryKey}.list`}>
                                {categoryHtml}
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
    ProjectListView as default,
    ProjectListViewProps,
    ProjectListViewState,
};
