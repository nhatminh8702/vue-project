import {createServer, Model} from "miragejs"

export function makeServer({environment = "development"} = {}) {
    return createServer({
        models: {
            note: Model
        },
        seeds(server) {
            server.create("note", {id: 1, value: "Inception", checked: true, date: '1/2/2022'})
            server.create("note", {id: 2, value: "Interstellar", checked: false, date: '2/2/2022'})
            server.create("note", {id: 3, value: "Dunkirk", checked: false, date: '2/2/2022'})
        },

        routes() {
            let newId = 4
            this.get("/api/notes", (schema, request) => {
                return schema.notes.all();
            });
            this.post("/api/add-note", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                attrs.id = newId++
                return schema.notes.create(attrs);
            });
            this.post("/api/update-notes", (schema, request) => {
                let attr = JSON.parse(request.requestBody)
                return schema.notes.find(attr.id).update({value: attr.value});
            });
            this.delete("/api/delete-note/:id", (schema, request) => {
                let id = request.params.id;
                return schema.notes.find(id).destroy();
            });
        },
    })


}
