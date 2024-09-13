import { useState } from "react";
import notFoundImg from "./../../assets/images/no.jpg";
import { getUserNotes } from "../../Services/Notes/getUserNotes";
import { useQuery, useQueryClient } from "react-query";
import { Loading } from "../../Components/Loading/Loading";
import { Modal } from "../../Components/Modal/Modal";
import { FaPlus } from "react-icons/fa";
import { MdDeleteSweep, MdEditNote } from "react-icons/md";
import { deleteNotes } from "../../Services/Notes/deleteNotes";
import { toast } from "react-toastify";

export const Home = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateVlu, setUpdateVlu] = useState({});

  const { data, isLoading } = useQuery({
    queryKey: ["allNotes"],
    queryFn: getUserNotes,
    select: (data) => data.data?.notes,
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleModal = () => {
    setShowModal(true); // Open the modal
  };

  const handleDeleteNote = async (id) => {
    const resp = await deleteNotes(id);
    // console.log("resp", resp);
    queryClient.refetchQueries({ queryKey: ["allNotes"] });
    toast.success(resp.data.msg);
  };

  const updateValues = async (id, title, content) => {
    // console.log(id , title , content);
    setShowModal(true);
    setUpdateVlu({ id, title, content });
    setIsUpdate(true);
  };

  //   const [notes, setNotes] = useState([]);
  // async function handleGetNotes(){
  //  const res = await getUserNotes();
  //  console.log('res', res.data.notes);
  //  setNotes(res.data.notes);

  // }

  // useState(()=>{
  //   handleGetNotes();
  // },[]);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-end">
          <button onClick={handleModal} className="btn btn-ghost text-lg">
            <FaPlus /> Add Note
          </button>
        </div>

        {showModal && (
          <Modal
            setShowModal={setShowModal}
            updateVlu={updateVlu}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
          />
        )}
        {data == null ? (
          // no notes found
          <div className="w-full h-auto max-w-full max-h-full">
            <img src={notFoundImg} className="w-full" alt="not found" />
            <p className="font-bold text-center mt-8 text-3xl">
              Not Notes Found
            </p>
          </div>
        ) : (
          // notes grid
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {data.map((note) => (
              <div
                key={note._id}
                className="bg-slate-800 rounded-md text-white px-8 py-4"
              >
                <div className="badge badge-accent">Note</div>
                <h2 className="font-semibold mt-2">{note.title}</h2>
                <p className="text-gray-300 ">{note.content}</p>
                <div className="flex justify-around items-center text-3xl mt-4 cursor-pointer border-t-2 py-2">
                  <MdDeleteSweep onClick={() => handleDeleteNote(note._id)} />
                  <MdEditNote
                    onClick={() =>
                      updateValues(note._id, note.title, note.content)
                    }
                  />
                </div>
              </div>
            ))}

            {/*  
{notes.length == 0 ?  <div className='w-full h-auto max-w-full max-h-full'>
<img src={notFoundImg} className='w-full' alt="not found" />
<p className='font-bold text-center mt-8 text-3xl'>No Notes Found</p>
</div> :  <div  className="grid grid-cols-9 gap-5">
{notes.map((note)=><div key={note._id} className="col-span-3 px-10 py-8 bg-slate-800 rounded-md text-white">
<h2 className="font-semibold ">{note.title}</h2>
<p className="text-gray-300">{note.content}</p>
</div>)}

</div>

}

*/}
          </div>
        )}
      </div>
    </>
  );
};
