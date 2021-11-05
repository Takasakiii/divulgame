import Link from "next/link";

function IndexPage() {
  return (
    <>
      <Link href="/login">
        <a className="text-blue-600">Pagina de Login Base</a>
      </Link>
    </>
  );
}

export default IndexPage;
