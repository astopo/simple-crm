import { useState } from "react";
import axios from "axios";

export const AddNoteForm: React.FC<{ onSaveNote: Function; userId: number }> = ({ onSaveNote, userId }) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const result = await axios.post(`/api/users/${userId}/notes`, {
                content
            });
            setSuccess(true);
            onSaveNote(result);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((error as any).response.data);
        }
        setLoading(false);
    };
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
                          placeholder="Note"
                          value={content}
                          onChange={e => setContent(e.target.value)}
                          className="block w-full p-2 border border-gray-300 rounded"
                      />
                      <button
                          type="submit"
                          disabled={loading}
                          className="block w-full p-2 bg-blue-500 text-white rounded">
                          Save Note
                      </button>
                  </form>
              </td>
          </tr>
      );
};
