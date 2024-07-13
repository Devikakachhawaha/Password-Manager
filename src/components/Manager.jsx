import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedField, setCopiedField] = useState("");

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const ShowPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/hide.svg")) {
      passwordRef.current.type = "text";
      ref.current.src = "icons/open.svg";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "icons/hide.svg";
    }
  };

  const savePassword = () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    console.log(passwordArray);
    setform({ site: "", username: "", password: "" });
    toast("Password saved", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else{
        toast("Error: Password not saved! ");
    }
  };

  const deletePassword = (id) => {
    let c = confirm("Are you sure?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id)));
        toast("Password deleted", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      
    }
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text, index, field) => {
    toast("copied to clipboard", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedIndex(null);
      setCopiedField("");
    }, 3000);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="absolute top-0 z-[-2] h-screen w-full rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(212,225,238,.5)_100%)]"></div>

      <div className=" md:mycontainer bg-white-400">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-400"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">Safe/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center ">
          Your own password manager
        </p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-3">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-green-500 w-full p-4 py-1"
              placeholder="Enter Username"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-500 w-full p-4 py-1"
                placeholder="Enter Password"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-0 top-0 cursor-pointer "
                onClick={ShowPassword}
              >
                <img
                  ref={ref}
                  className="p-2 block"
                  width={38}
                  height={38}
                  src="/icons/hide.svg"
                  alt="Hide Icon"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-6 py-2 w-fit gap-3 border border-green-700"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div>
          <h2 className="font-bold text-2xl py-2 px-3 my-0 ">Your Passwords</h2>
          {passwordArray.length === 0 && <div className="px-3">No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className=" table-auto w-full overflow-hidden rounded-xl mb-4 mx-3">
              <thead className="bg-green-800 text-white ">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100  ">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex justify-center items-center gap-2">
                          <a href={item.site} target="_blank">
                            {" "}
                            {item.site}
                          </a>
                          <div
                            className="size-17 cursor-pointer"
                            onClick={() => {
                              copyText(item.site, index, "site");
                            }}
                          >
                            <img
                              src={
                                copiedIndex === index && copiedField === "site"
                                  ? "/icons/done.svg"
                                  : "/icons/copy.svg"
                              }
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex justify-center items-center gap-2">
                          <span> {item.username}</span>
                          <div
                            className="size-17 cursor-pointer"
                            onClick={() => {
                              copyText(item.username, index, "username");
                            }}
                          >
                            <img
                              src={
                                copiedIndex === index &&
                                copiedField === "username"
                                  ? "/icons/done.svg"
                                  : "/icons/copy.svg"
                              }
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32 ">
                        <div className="flex justify-center items-center gap-2">
                          <span>{item.password}</span>
                          <div
                            className="size-17 cursor-pointer"
                            onClick={() => {
                              copyText(item.password, index, "password");
                            }}
                          >
                            <img
                              src={
                                copiedIndex === index &&
                                copiedField === "password"
                                  ? "/icons/done.svg"
                                  : "/icons/copy.svg"
                              }
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32 ">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
