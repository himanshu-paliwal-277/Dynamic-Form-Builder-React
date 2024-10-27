function Footer() {
  return (
    <>
      <footer className="py-6 text-center text-white bg-black">
        <p>
          &copy; {new Date().getFullYear()} all rights reserved by{" "}
          <a
            href="https://github.com/himanshu-paliwal-277"
            target="_blank"
            className="text-blue-300 hover:underline"
          >
            Himanshu Paliwal
          </a>
          .
        </p>
      </footer>
    </>
  );
}

export default Footer;