import { useState } from "react";
import { Note, User } from "./types";
import axios from "axios";
import { AddNoteForm } from "./add-note-form";
import { Link } from "react-router-dom";

export const UserRow: React.FC<{ user: User, onUserUpdated: Function }> = ({ user, onUserUpdated }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(`${user.age}`);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const result = await axios.put(`/api/users/${user.id}`, {
                firstName,
                lastName,
                age,
                phoneNumber,
            });
            setSuccess(true);
            setIsEditing(false);
            onUserUpdated(result.data);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((error as any).response.data);
        }
        setLoading(false);
    };

    function onSaveNote(note: Note) {
        setIsAddingNote(false);
        onUserUpdated({ ...user, notes: [...user.notes, note] });
    }

    if (isEditing) {
        return (
            <tr>
                <td colSpan={6}>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 p-4 rounded bg-gray-100 w-96">
                        <h2 className="text-xl font-fold">Edit</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && (
                            <p className="text-green-500">User added successfully</p>
                        )}
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Age"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="block w-full p-2 bg-blue-500 text-white rounded">
                            Update User
                        </button>
                    </form>
                </td>
            </tr>
        );
    }

    if (isAddingNote) {
        return (<AddNoteForm onSaveNote={onSaveNote} userId={user.id} />)
    }
    return (
        <tr key={user.id}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>{phoneNumber}</td>
            <td>{user.notes?.length}</td>
            <td>
                <Link to={`/users/${user.id}`} className="hover:underline">
                View User                </Link>
            </td>
            <td>
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </td>
            <td>
                <button onClick={() => setIsAddingNote(true)}>Add Note</button>
            </td>
        </tr>
    );
};
