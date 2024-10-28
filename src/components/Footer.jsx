function Footer() {
  return (
    <>
      <footer className="py-5 text-xs text-center text-white bg-black sm:py-6 sm:text-base">
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