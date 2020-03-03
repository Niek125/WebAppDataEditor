import {Server, Model, Factory, hasMany} from "miragejs";

export function makeServer({environment = "development"} = {}) {
    let server = new Server({
        environment,
        models: {
            project: Model.extend({
                message: hasMany(),
            }),
            message: Model
        },
        factories: {
          project: Factory.extend({
              projectName(i){
                  return "Project " + i;
              },
          })
        },
        seeds(server) {
            server.createList("project", 5);
        },
        routes() {
            this.namespace = "api"

            this.get("/project", schema => {
                return schema.projects.all();
            })

            this.get("/project/:id", (schema, request) => {
                let id = request.params.id;
                return schema.projects.find(id);
            })
        },
    })
    return server;
}