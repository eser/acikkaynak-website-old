import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ProjectListView } from './projectListView';
import { LoadingView } from '../shared/loadingView';
import { ErrorView } from '../shared/errorView';

interface ProjectsContainerPropsInterface {
}

interface ProjectsContainerStateInterface {
    datasource: any;
    error: string | false;
}

class ProjectsContainer extends React.Component<ProjectsContainerPropsInterface, ProjectsContainerStateInterface> {
    static contextTypes = {
        appContext: PropTypes.object,
    };

    constructor(props: ProjectsContainerPropsInterface, context: any) {
        super(props, context);

        this.state = {
            datasource: null,
            error: false,
        };
    }

    componentWillMount(): void {
        this.updateDatasource();
    }

    componentWillReceiveProps(nextProps: ProjectsContainerPropsInterface): void {
        this.updateDatasource();
    }

    render(): any {
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
        const projectService = this.context.appContext.get('projectService');

        projectService.getProjects()
            .then((response) => { this.setState({ datasource: response, error: false }); })
            .catch((err) => { this.setState({ datasource: null, error: err }); });
    }

}

export {
    ProjectsContainerPropsInterface,
    ProjectsContainerStateInterface,
    ProjectsContainer,
};

export default ProjectsContainer;
