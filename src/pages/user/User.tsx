interface User {
  _id: string;
  name: string;
  surname: string;
  password: string;
  wishlist?: Array<{ _ref: string; _type: string }>;
  image?: { asset: { _ref: string } };
}

export default function User() {

  const user: User = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <div className="bg-amber-300 p-5 mt-10">
      <p>{user.name}</p>
      <p>{user.surname}</p>
    </div>
  )
}
