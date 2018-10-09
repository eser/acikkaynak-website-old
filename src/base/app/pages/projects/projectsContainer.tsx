import * as React from 'react';

import appContext from '../../appContext';

import ProjectListView from './projectListView';
import LoadingView from '../shared/loadingView';
import ErrorView from '../shared/errorView';

interface ProjectsContainerProps {
}

interface ProjectsContainerState {
    datasource: any;
    error: string | false;
}

class ProjectsContainer extends React.Component<ProjectsContainerProps, ProjectsContainerState> {
    constructor(props: ProjectsContainerProps, context: any) {
        super(props, context);

        this.state = {
            datasource: null,
            error: false,
        };
    }

    componentWillMount(): void {
        this.updateDatasource();
    }

    componentWillReceiveProps(nextProps: ProjectsContainerProps): void {
        this.updateDatasource();
    }

    render(): JSX.Element {
        if (this.state.error !== false) {
            console.error(this.state.error);

            return (
                <ErrorView message="An error occurred" />
            );
        }

        if (this.state.datasource === null) {
            return (
                <LoadingView />
            );
        }

        return (
            <div>
                <h1>Projeler</h1>

                <ProjectListView datasource={this.state.datasource} />
            </div>
        );
    }

    updateDatasource(): void {
        const projectService = appContext.get('projectService');

        projectService.getProjects()
            .then((response) => { this.setState({ datasource: response, error: false }); })
            .catch((err) => { this.setState({ datasource: null, error: err }); });
    }

}

export {
    ProjectsContainer as default,
    ProjectsContainerProps,
    ProjectsContainerState,
};
