import type { ReactElement } from "react";
import DefaultLayout from "../layouts/Default";

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

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default IndexPage;
