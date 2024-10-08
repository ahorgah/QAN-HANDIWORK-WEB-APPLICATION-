import { EmptyCartImg } from "../Assets";
import { toast } from "react-toastify";
import { useState } from "react";
import { send } from "emailjs-com";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const toSend = {
      sender_name: name,
      sender_email: email,
      subject: subject,
      message: message,
    };
    send(
      process.env.REACT_APP_EMAIL_SERVICE_ID!,
      process.env.REACT_APP_EMAIL_TEMPLATE_ID!,
      toSend,
      process.env.REACT_APP_EMAIL_USER_ID!
    )
      .then((response) => {
        setLoading(false);
        toast.success(`${name}, Your message has been received`, {
          position: "top-left",
          autoClose: 3000,
          toastId: "form",
        });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        return toast.error(`Your message could not be sent. Try again`, {
          position: "top-left",
          autoClose: 3000,
          toastId: "form",
        });
      });
  };
  return (
    <div className="h-full w-full flex items-center flex-col justify-center px-4 bg-primary">
      <form
        action="#"
        className="mb-6 w-full flex itemx-center justify-center gap-y-3 flex-col"
      >
        <div className="mb-6">
          <input
            type="text"
            className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="sender_name"
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
            placeholder="Email ID"
            value={email}
            name="sender_email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
            placeholder="Subject"
            value={subject}
            name="subject"
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <textarea
            className="form-control block w-full min-h-[25vh] px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
            placeholder="Message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="text-white bg-orange-600 hover:bg-orange-700 w-full focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 block"
          onClick={submitForm}
        >
          {!loading ? "Send Message" : "Sending..."}
        </button>
      </form>
      <p className="mb-2 cursor-pointer text-sm text-gray-500 dark:text-gray-400">
        <a href="mailto:keny.edem@gmail.com" className="hover:underline">
          keny.edem@gmail.com
        </a>
      </p>
      <p className="text-sm cursor-pointer text-gray-500 dark:text-gray-400">
        <a href="tel:+233549783787" className="hover:underline">
          +233 54 978 3787
        </a>
      </p>
    </div>
  );
};

export default Form;
