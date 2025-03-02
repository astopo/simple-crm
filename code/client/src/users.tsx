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
    }, [users]);

    function updateUserList(users: User[]) {
        const userMap = new Map();

        users.forEach(user => {
            userMap.set(user.id, user)
        });

        setUsersById(userMap);

        const userList = usersById.values();

        setUsers(Array.from(userList));
    }

    function onUserUpdated(user: User) {
        const userMap = new Map(usersById);
        userMap.set(user.id, user);
        setUsersById(userMap);

        const userList = usersById.values();

        setUsers(Array.from(userList));
    }

    return (
        <div className="w-full">
            <h2 className="text-xl font-fold">Users</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Phone Number</th>
                        <th>Notes</th>
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
