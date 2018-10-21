import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProjectListView from './projectListView';
import LoadingView from '../shared/loadingView';
import ErrorView from '../shared/errorView';

import getProjectsRequestAction from '../../actions/getProjectsRequestAction';

interface ProjectsContainerProps {
    projects: any;
    getProjectsRequestAction: () => void;
}

interface ProjectsContainerState {
}

class ProjectsContainer extends React.Component<ProjectsContainerProps, ProjectsContainerState> {
    constructor(props: ProjectsContainerProps, context: any) {
        super(props, context);
    }

    componentWillMount(): void {
        this.update();
    }

    componentDidUpdate(prevProps: ProjectsContainerProps): void {
        // this.update();
    }

    update(): void {
        this.props.getProjectsRequestAction();
    }

    render(): JSX.Element {
        if (this.props.projects.error !== false) {
            console.error(this.props.projects.error);

            return (
                <ErrorView message="An error occurred" />
            );
        }

        if (this.props.projects.data === null) {
            return (
                <LoadingView />
            );
        }

        return (
            <div>
                <h1>Projeler</h1>

                <ProjectListView datasource={this.props.projects.data} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    projects: state.projects,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getProjectsRequestAction,
}, dispatch);

const ProjectsContainerConnected = connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);

export {
    ProjectsContainerConnected as default,
    ProjectsContainer,
    ProjectsContainerProps,
    ProjectsContainerState,
};
