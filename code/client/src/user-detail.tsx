import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "./types";
import axios from "axios";
import { useParams } from "react-router";

export const UserDetail: React.FC<{}> = () => {
  const [user, setUser] = useState<User>();
  const params = useParams();

  useEffect(() => {
      const fetchData = async () => {
          const result = await axios.get(`/api/users/${params.id}`);
          setUser(result.data);
      };
      fetchData();
  }, []);

  if (!user) return (
    <div>
      Loading...
    </div>
  )

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-lg p-6 shadow-lg rounded-2xl bg-white border">

              <Link to="/" className="absolute top-4 left-4 text-blue-500 hover:underline">
                  ← Back to Home
              </Link>
              <div className="border-b pb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                      {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-500">Age: {user.age}</p>
                  <p className="text-gray-500">Phone: {user.phoneNumber}</p>
              </div>
              <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Notes</h3>
                  <div className="h-40 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                      {user.notes.length > 0 ? (
                          user.notes.map((note, index) => (
                            <div
                            key={index}
                            className="p-2 border-b last:border-none text-gray-700"
                        >
                            <p className="text-gray-900">{note.content}</p>
                            <p className="text-sm text-gray-500">{note.createdAt}</p>
                        </div>
                          ))
                      ) : (
                          <p className="text-gray-400 italic">No notes available.</p>
                      )}
                  </div>
              </div>
          </div>
      </div>
  );
};
