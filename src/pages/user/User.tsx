import { useGetUserQuery } from "@/store/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Address from "./components/Address";

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

  const [tabsValue, setTabsValue] = useState("account")

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
    <div className="p-5 mt-10">
      <p>{user.name}</p>
      <p>{user.surname}</p>
      <button className="py-4 px-1.5 bg-amber-500 rounded-xl" onClick={refetch}>Refetch</button>
      <Tabs value={tabsValue}>
        <TabsList variant="line">
          <TabsTrigger value="account" onClick={() => setTabsValue("account")}>Account</TabsTrigger>
          <TabsTrigger value="address" onClick={() => setTabsValue("address")}>Address</TabsTrigger>
          <TabsTrigger value="orders" onClick={() => setTabsValue("orders")}>Orders</TabsTrigger>
        </TabsList>
      </Tabs>
      {
        tabsValue == "account" ? <p>account</p> : tabsValue == "address" ? <Address/> : <p>orders</p>
      }
    </div>
  )

}