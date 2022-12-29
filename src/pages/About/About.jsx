import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FaMapMarkerAlt, FaUniversity } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider";
import UsersUpdateModal from "./UsersUpdateModal/UsersUpdateModal";
import userImg from '../../assets/user.png';

const About = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const { data: currentUser = {}, refetch } = useQuery({
    queryKey: ['currentUser', user?.uid],
    queryFn: () => fetch(`https://friend-book-server.vercel.app/users?uid=${user?.uid}`).then(res => res.json())
  });
  const { uid, name, email, photoURL, university, address } = currentUser;

  return (
    <div className="relative mb-10">
      <section className="text-center w-full sm:w-[500px] mx-auto">
        <label onClick={() => setShowModal(true)} htmlFor="updatingModal" className="btn btn-info btn-sm pt-3 pb-6 text-white absolute -top-6 right-0">Edit</label>
        <div className="avatar mx-auto">
          <div className="w-24 rounded-full border-4 border-gray-400">
            <img src={photoURL ? photoURL : userImg} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p>{email}</p>
          <h3 className="text-xl flex items-start gap-3 text-left mt-5 sm:mt-7 md:mt-10">
            {
              university && <>
                <div>
                  <FaUniversity className="text-2xl w-14 mt-1" />
                </div>
                <span className="mr-4">{university}</span>
              </>
            }
          </h3>
          <h3 className="text-xl flex items-start gap-3 text-left mt-3">
            {
              address && <>
                <div>
                  <FaMapMarkerAlt className="text-2xl w-14 mt-1" />
                </div>
                <span className="mr-4">{address}</span>
              </>
            }
          </h3>
        </div>
        {
          showModal && <UsersUpdateModal currentUser={currentUser} refetch={refetch} setShowModal={setShowModal} />
        }
      </section>
    </div>
  );
}

export default About;
