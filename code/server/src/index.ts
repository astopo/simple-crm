import { AppDataSource } from "./data-source";
import { Note } from "./entity/Note";
import { User } from "./entity/User";
import * as express from "express";

const run = async () => {
    await AppDataSource.initialize();
    const app = express();
    app.use(express.json());
    app.get("/users", async (req, res) => {
        const users = await AppDataSource.manager.getRepository(User).find({
            relations: {
                notes: true
            }
        });
        res.json(users);
    });
    app.get("/users/:id", async (req, res) => {
        const user = await AppDataSource.manager
            .getRepository(User)
            .findOne({ where: { id: req.params.id }, relations: { notes: true } });
        res.json(user);
    });
    app.post("/users", async (req, res) => {
        const user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.phoneNumber = req.body.phoneNumber;
        await AppDataSource.manager.getRepository(User).save(user);
        res.json(user);
    });
    app.put("/users/:id", async (req, res) => {
        const user = await AppDataSource.manager
            .getRepository(User)
            .findOne({ where: { id: req.params.id } });
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.phoneNumber = req.body.phoneNumber;
        await AppDataSource.manager.getRepository(User).save(user);
        res.json(user);
    });
    app.post("/users/:id/notes", async (req, res) => {
        const note = new Note();
        note.content = req.body.content;
        note.user = req.params.id;
        await AppDataSource.manager.getRepository(Note).save(note);
        res.json(note);
    });
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
};

run();
