import * as React from 'react';

import { app } from '../../../';

import { ProjectModel } from '../models/ProjectModel';
import { ProjectList } from '../presentationals/ProjectList';
import { Loading } from '../../Shared/presentationals/Loading';
import { Error } from '../../Shared/presentationals/Error';

export interface ProjectsPropsInterface {
    params: any;
}

export interface ProjectsStateInterface {
    datasource: any;
    error: any;
}

export class Projects extends React.Component<ProjectsPropsInterface, ProjectsStateInterface> {

    state: ProjectsStateInterface;
    model: ProjectModel;

    constructor(props: ProjectsPropsInterface) {
        super(props);

        this.state = {
            datasource: null,
            error: false
        };

        this.model = app.services.get(ProjectModel);
        this.updateDatasource();
    }

    componentWillReceiveProps(nextProps: ProjectsPropsInterface): void {
        this.updateDatasource();
    }

    render(): any {
        if (this.state.error) {
            console.error(this.state.error);

            return (
                <Error message="Bir hata oluştu" />
            );
        }

        if (this.state.datasource === null) {
            return (
                <Loading />
            );
        }

        return (
            <div>
                <h1>Projeler</h1>

                <ProjectList datasource={this.state.datasource} />
            </div>
        );
    }

    updateDatasource(): void {
        this.model.getProjects()
            .then((response) => { this.setState({ datasource: response, error: false }); })
            .catch((err) => { this.setState({ datasource: null, error: err }); });
    }

}

export default Projects;
