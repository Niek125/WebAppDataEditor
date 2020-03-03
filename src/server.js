import {Server, Model, RestSerializer, Factory, hasMany, belongsTo} from "miragejs";

export function makeServer({environment = "development"} = {}) {
    let server = new Server({
        environment,
        serializers:{
            linked: RestSerializer.extend({
                alwaysIncludeLinkageData: true,
            }),
        },
        models: {
            project: Model.extend({
                message: hasMany(),
                user: hasMany(),
            }),
            message: Model.extend({
                project: belongsTo(),
                user: belongsTo(),
            }),
            user : Model.extend({
                project: hasMany(),
                message: hasMany(),
            }),
        },
        factories: {
            project: Factory.extend({
                projectName(i) {
                    return "Project " + i;
                },
            }),
            message: Factory.extend({
                content(i) {
                    return "Content testing " + i;
                },
                sendTime(i) {
                    return "03/03/2020 10:2" + i
                },
            }),
            user: Factory.extend({
                userName(i){
                    return "user " + i;
                },
                userId(i){
                    return "id" + i;
                }
            })
        },
        seeds(server) {
            server.createList("project", 5).forEach(project => {
                server.createList("user", 5, [project]).forEach(user => {
                    server.createList("message", 10, {project, user});
                });
            });
        },
        routes() {
            this.namespace = "/api"

            this.get("/projects", schema => {
                return schema.projects.all();
            })

            this.get("/projects/:id", function(schema, request) {
                let project = this.serialize(schema.projects.find(request.params.id), "linked");
                for (let i =0; i < project.project.messages.length; i++){
                    project.project.messages[i] = schema.messages.find(project.project.messages[i]);
                }
                for (let i =0; i < project.project.users.length; i++){
                    project.project.users[i] = schema.users.find(project.project.users[i]);
                }
                return project;
            })
        },
    })
    return server;
}