import { useGetUserQuery } from "@/store/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  surname: string;
  password: string;
  wishlist?: Array<{ _ref: string; _type: string }>;
  image?: { asset: { _ref: string } };
}

export default function User() {

  const navigate = useNavigate()
  const user: User = JSON.parse(localStorage.getItem('user')!)

  const { data, refetch, isFetching } = useGetUserQuery(user?._id)

  useEffect(() => {
    if (!isFetching) {
      if (!data) {
        localStorage.clear()
        navigate('/')
      }
    }
  }, [user, isFetching]);

  useEffect(() => {
    setTimeout(() => {
      refetch()
    }, 1000);
  }, [])


  return (
    <div className="bg-amber-300 p-5 mt-10">
      <p>{user.name}</p>
      <p>{user.surname}</p>
      <button className="py-4 px-1.5 bg-amber-500 rounded-xl" onClick={refetch}>Refetch</button>
    </div>
  )
}
