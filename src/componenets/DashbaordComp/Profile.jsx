import React, { useEffect } from "react" ;
import { useContext } from "react" ;
import { contextData } from "../../ContextData" ;
import { useState } from "react" ;
import toast, { Toaster } from "react-hot-toast" ;


const Profile = () => {
  const { auth, data, db } = useContext(contextData);
  const user = data?.find((x) => x.id == auth.currentUser.uid)?.user;

  const [firstname, setFirstname] = useState(user?.first_name);
  const [lastname, setLastname] = useState(user?.last_name);
  const [phone, setPhone] = useState(user?.phone);
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    let check =
      firstname == user?.first_name &&
      lastname == user?.last_name &&
      phone == user?.phone;
    if (check) {
      setChanges(false);
    } else {
      setChanges(true);
    }
  }, [firstname, lastname, phone]);

  const updateUserData = (e) => {
    e.preventDefault()
    if (firstname.trim() == "" || lastname.trim() == "") return;
    db.collection("tracking").doc(user?.id).update(({...data?.find((x) => x.id == auth.currentUser.uid) , user: { ...user , first_name:firstname , last_name:lastname ,  'phone':phone}}))
    setChanges(false)
    toast.success('Successfully Updated')
  };

  return (
    <>
    <div className=" ">
      <h1 className="text-black m-4 text-[18px] font-semibold  text-center ">
        Manage Your Account and Personal Information
      </h1>

      <form onSubmit={updateUserData} className="md:w-[500px] ml-8  mt-8">
        <div className=" relative z-0 w-full mb-6 group">
          <input
            value={user?.email}
            disabled
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={user?.password}
            disabled
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
          </div>
        </div>
        <button
          type="submit"
          className={
            changes
              ? "text-black bg-blue-700  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              : "text-black bg-gray-400  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          }
        >
          Submit
        </button>
      </form>
    </div>
    <Toaster />
    </>
  );
};

export default Profile;
