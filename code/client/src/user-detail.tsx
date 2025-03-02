import { useEffect, useState } from "react";
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
    <div>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>{user.age}</p>
      <p>{user.phoneNumber}</p>
      <p>{user.notes?.length}</p>
    </div>
  );
};
