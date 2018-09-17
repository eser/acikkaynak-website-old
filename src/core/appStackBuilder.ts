import AppStack from './appStack';

class AppStackBuilder {
    router: { component: any, props: any } | null;
    appClasses: { [key: string]: any };

    constructor() {
        this.router = null;
        this.appClasses = {};
    }

    useRouter(component: any, props: any = null): AppStackBuilder {
        this.router = { component: component, props: props };

        return this;
    }

    add(path: string, appClass: any): AppStackBuilder {
        this.appClasses[path] = appClass;

        return this;
    }

    build(): AppStack {
        return new AppStack(this.router, this.appClasses);
    }
}

export {
    AppStackBuilder as default,
};
