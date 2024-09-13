import { useFormik } from "formik";
import { addNotes } from "../../Services/Notes/addNotes";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { updateNotes } from "../../Services/Notes/updateNotes";

export const Modal = ({ setShowModal, updateVlu, isUpdate, setIsUpdate }) => {
  // console.log(updateVlu , isUpdate);     // 3yza amayez el click?? addNote ,, update

  const schema = yup.object().shape({
    title: yup.string().required("title is required"),
    content: yup.string().required("content is required!"),
  });
  const queryClient = useQueryClient();
  const inputsValue = {
    title: isUpdate ? updateVlu.title : "",
    content: isUpdate ? updateVlu.content : "",
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setIsUpdate(false);
  };

  // dlw2ty m3aya flag if condition bon2an 3leh
  /// 1- wrapper func by default bygelha param == values 34an fel submit
  function detectAndCall(values) {
    //condition
    if (isUpdate) {
      handleUpdateNotes(updateVlu, values);
    } else {
      handleAddNotes(values);
    }
  }
  const handleAddNotes = async (values) => {
    const res = await addNotes(values); //after validate is ok => submit done ? call api ab3tlo el data el sa7 de
    queryClient.refetchQueries({ queryKey: ["allNotes"] }); //add lw tamam return response =? msg:done , data :el enta lsa ba3etha by2olk tamam y3ne
    setShowModal(false);
    // console.log("res add", res); //y3ne el notes[{},{}] add to [] => ok 3yza ba2a a3ml refetch lel data el cached de 34an tet3red automatic => kan momken ahndlha b button bs de way a7san .
    toast.success(res.data.msg);
  };
  const handleUpdateNotes = async (updateVlu, values) => {
    const res = await updateNotes(updateVlu.id, values);
    queryClient.refetchQueries({ queryKey: ["allNotes"] });
    setShowModal(false);
    setIsUpdate(false);
    // console.log("res add", res);
    toast.success(res.data.msg);
  };

  //data btegy setNotes()
  //mynf34 change el notes bnfsy ! dom
  //ha5od mnha deep copy w change ba2a
  // const x = structuredClone(notes)      ?? [{},{},{},{}]
  // setNotes([...x ,res.data.notes ])      [{},{},{},{},   {}]

  // 7al tany => new idea ??
  // setNotes(callBack func      (param ay 7aga == e nfs el fekra henak by default))  //param bykon shayel a5er state lel notes
  // setNotes((x)=> [...x , zwd 3leeeh el data el enta deftha de ])          ...x fadeh hena [{},{},  {}] setNotes(new[]) rerender map 3leha
  // x =>gara lel 3orf ?? prevState => indicate ?? a5er state waslt leha lene momken ye7sal render aktr mn marra change aktr mn marra

  const modalForm = useFormik({
    initialValues: inputsValue,
    onSubmit: detectAndCall,
    validationSchema: schema,
  });

  //   console.log(modalForm.errors);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <form onSubmit={modalForm.handleSubmit}>
            <div>
              <input
                type="title"
                id="title"
                name="title"
                value={modalForm.values.title}
                onChange={modalForm.handleChange}
                onBlur={modalForm.handleBlur}
                placeholder="Write a title"
                className="input input-bordered w-full max-w-xs"
              />
              {modalForm.errors.title && modalForm.touched.title ? (
                <div role="alert" className="alert alert-error mt-1">
                  <span>{modalForm.errors.title}</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="my-3">
              <textarea
                id="content"
                name="content"
                value={modalForm.values.content}
                onChange={modalForm.handleChange}
                onBlur={modalForm.handleBlur}
                className="textarea textarea-bordered w-[70%]"
                placeholder="Your content"
              ></textarea>
              {modalForm.errors.content && modalForm.touched.content ? (
                <div role="alert" className="alert alert-error">
                  <span>{modalForm.errors.content}</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex justify-end">
              <button
                className="btn me-2"
                type="button"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="btn"
                type="submit"
                disabled={!(modalForm.isValid && modalForm.dirty)}
              >
                {isUpdate ? "Updated Note" : " Add Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
