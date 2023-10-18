"use client";
import Image from "next/image";
import React from "react";
import Logo from "../../../public/images/logo.png";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import { useAuth } from "../auth/login";
import axios from "axios";

const Page = () => {
  const [show, setShow] = useState(false);
  const [domain, setDomain] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginBtnVisible, setLoginBtnVisible] = useState(true);



  const auth = useAuth();

  const signIn = async (username, tokenid) => {
    const regex = /\.mmit$/;
    if (!regex.test(domain) || !domain || !tokenId) {
      setInputError("Please fill all the fields");
      return;
    }
    setLoading(true);
    let response;
    try {
      response = await axios.get(`/api/sdk`, {
        params: {
          username: username,
          id: tokenid
        }
      });
    } catch (error) {
      console.error(error);
    }
    const uservalidator = response?.data?.data
    if (uservalidator.success == true) {
      setLoginBtnVisible(false);
      handleClose()
      setLoading(false);
    }
    else {
      swal("Error", `${uservalidator.message}`, "error");
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    auth.login({ domain, tokenId });
    signIn(domain, tokenId)
  };


  const logOutUser = () => {
    setLoginBtnVisible(true);
  };

  const handleClose = () => {
    setShow(false);
    setDomain("");
    setTokenId("");
  };

  const handleShow = () => setShow(true);

  return (
    // <div className="bg-[#2f4f4f] h-[100vh]">
    //   <div className="flex justify-between p-6">
    //     <div className="w-full sm:w-auto text-center sm:text-left text-4xl sm:mb-0">
    //       <Image src={Logo} className="mx-auto sm:mx-0 w-[150px] sm:w-[200px]" />
    //     </div>
    //     <div className="flex items-center gap-6 text-white">
    //       <div className="text-base uppercase border-b  hover:border-b-white max-sm:hidden">
    //         Home
    //       </div>
    //       <div className="text-base uppercase border-b  hover:border-b-white max-sm:hidden">
    //         About
    //       </div>
    //       <div className="text-base uppercase border-b  hover:border-b-white max-sm:hidden">
    //         Community
    //       </div>

    //       {loginBtnVisible ? (
    //         <button
    //           className="uppercase py-2 px-5 text-black bg-white rounded-3xl 
    //         hover:bg-[#9EF948] hover:text-white"
    //           onClick={handleShow}
    //         >
    //           Login With MMIT Domain
    //         </button>
    //       ) : (
    //         <>
    //           <button
    //             className="uppercase py-2 px-5 text-black bg-white rounded-3xl 
    //       hover:bg-[#9EF948] hover:text-white"
    //             onClick={logOutUser}
    //           >
    //             Logout
    //           </button>
    //         </>
    //       )}
    //       {loading ? (
    //         <div className="spinner-border" role="status">
    //           <span className="visually-hidden">Loading...</span>
    //         </div>
    //       ) : (
    //         <Modal show={show} onHide={handleClose}>
    //           <Modal.Header closeButton>
    //             <Modal.Title>Insert Your MMIT Domain</Modal.Title>
    //           </Modal.Header>
    //           <Modal.Body>
    //             <Form>
    //               <Form.Group className="mb-3" controlId="formBasicEmail">
    //                 <Form.Control
    //                   type="text"
    //                   placeholder="Domain"
    //                   onChange={(e) => {
    //                     setDomain(e.target.value);
    //                     setInputError("");
    //                   }}
    //                 />
    //               </Form.Group>

    //               <Form.Group className="mb-3" controlId="formBasicPassword">
    //                 <Form.Control
    //                   type="number"
    //                   placeholder="Token Id"
    //                   onChange={(e) => {
    //                     setTokenId(e.target.value);
    //                     setInputError("");
    //                   }}
    //                 />
    //               </Form.Group>

    //               <p className="text-danger my-2">{inputError}</p>
    //             </Form>
    //           </Modal.Body>
    //           <Modal.Footer>
    //             <Button variant="danger" onClick={handleClose}>
    //               Close
    //             </Button>
    //             <Button variant="dark" onClick={onSubmit}>
    //               Login
    //             </Button>
    //           </Modal.Footer>
    //         </Modal>
    //       )}
    //     </div>
    //   </div>
    //   <div className="h-[70vh] flex items-end max-lg:flex-wrap">
    //     <div className="px-8 max-lg:m-auto">
    //       <p className="text-xl text-white mb-4 w-[295px]">
    //         Porter enables creditworthy DAOs to obtain fixed-rate financing
    //         using their project tokens as collateral.
    //       </p>
    //       <button
    //         className="uppercase py-2 px-5 text-black bg-white border  rounded-3xl 
    //       hover:bg-[#9EF948] hover:text-white w-[295px]"
    //       >
    //         Get Access
    //       </button>
    //       <br />
    //     </div>
    //     <div className="max-md:pl-8 max-sm:pl-4">
    //       <p className="text-8xl text-white max-md:text-3xl">
    //         Borrow with no liquidations against
    //       </p>
    //       <div
    //         className="typing-container text-8xl text-white "
    //         data-text="$WEB 3"
    //       ></div>
    //     </div>
    //   </div>
    // </div>


    <div className="bg-[#2f4f4f] min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="mx-4 sm:mb-0">
          <Image src={Logo} className="w-[150px] sm:w-[200px]" />
        </div>
        <div className="hidden sm:flex gap-6 text-white">
          <div className="text-base uppercase border-b hover:border-b-white">
            Home
          </div>
          <div className="text-base uppercase border-b hover:border-b-white">
            About
          </div>
          <div className="text-base uppercase border-b hover:border-b-white">
            Community
          </div>
        </div>
        {loginBtnVisible ? (
          <button
            className="uppercase py-2 px-5 text-black bg-white rounded-3xl hover:bg-[#9EF948] hover:text-white"
            onClick={handleShow}
          >
            Login With MMIT Domain
          </button>
        ) : (
          <button
            className="uppercase py-2 px-5 text-black bg-white rounded-3xl hover:bg-[#9EF948] hover:text-white"
            onClick={logOutUser}
          >
            Logout
          </button>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center mb-8">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Insert Your MMIT Domain</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Domain"
                  onChange={(e) => {
                    setDomain(e.target.value);
                    setInputError("");
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="number"
                  placeholder="Token Id"
                  onChange={(e) => {
                    setTokenId(e.target.value);
                    setInputError("");
                  }}
                />
              </Form.Group>

              <p className="text-danger my-2">{inputError}</p>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="dark" onClick={onSubmit}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xl text-white mb-4">
          Creditworthy DAOs can obtain fixed-rate financing via Porter, using their project tokens as security.
          </p>
          <button
            className="uppercase py-2 px-5 text-black bg-white border rounded-3xl hover:bg-[#9EF948] hover:text-white w-full lg:w-auto"
          >
            Get Access
          </button>
        </div>
        <div className="text-center lg:text-left">
          <p className="text-3xl lg:text-8xl text-white mb-4">
          Obtain a loan without asset liquidation.
          </p>
          <div
            className="typing-container text-3xl lg:text-8xl text-white"
            data-text="$WEB 3"
          ></div>
        </div>
      </div>
    </div>



  );
};

export default Page;
