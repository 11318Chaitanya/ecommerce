import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredientials } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const dispatch = useDispatch();

  const submitHandler = async (e)=>{
    e.preventDefault();

    if(password !== confirmPassword){
      toast.error('Passwords do not match');
    }else{
      try {
        const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap();
        dispatch(setCredientials({...res}));
        toast.success('Profile updated successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }

  }

  return (
    <div className="container mx-auto p-4 mt-[4rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-input border bg-transparent text-white p-4 rounded w-full"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-input border bg-transparent text-white p-4 rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input border bg-transparent text-white p-4 rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-input border bg-transparent text-white p-4 rounded w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
          {loadingUpdateProfile && <Loader/>}
      </div>
    </div>
  );
};

export default Profile;
