import * as React from 'react';

export interface ProjectsPropsInterface {
}

export interface ProjectsStateInterface {
}

export class Projects extends React.Component<ProjectsPropsInterface, ProjectsStateInterface> {

    state: ProjectsStateInterface;

    constructor(props: ProjectsPropsInterface) {
        super(props);
    }

    render(): any {
        return (
            <div>
                <h1>Projeler</h1>

                ...içerik buraya gelecek
            </div>
        );
    }

}

export default Projects;
