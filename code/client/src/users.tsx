import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "./types";
import { UserRow } from "./user-row";

export const Users: React.FC = () => {
    const [usersById, setUsersById] = useState<Map<number, User>>(new Map());
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/api/users");
            updateUserList(result.data);
        };
        fetchData();
    }, []);

    function updateUserList(users: User[]) {
        const userMap = new Map(users.map(user => [user.id, user]));
        setUsersById(userMap);
        setUsers(Array.from(userMap.values()));
    }

    function onUserUpdated(user: User) {
        const userMap = new Map(usersById);
        const oldUser = userMap.get(user.id);
        // Update the user so we don't lose the notes.
        const updatedUser = { ...oldUser, ...user };
        userMap.set(user.id, updatedUser);
        setUsersById(userMap);

        setUsers(Array.from(userMap.values()));
    }

    return (
        <div className="w-full">
            <h2 className="text-xl font-fold">Users</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Phone Number</th>
                        <th>Notes</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <UserRow user={user} key={user.id} onUserUpdated={onUserUpdated} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
