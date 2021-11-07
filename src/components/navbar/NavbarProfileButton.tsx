import { useState } from "react";

import { SimplifiedUser } from "../../api/Login";
import Link from "next/link";

export interface NavbarProfileButtonComponentProps {
  children: React.ReactNode;
  user: SimplifiedUser | null;
}

function NavbarProfileButtonComponent({
  children,
  user,
}: NavbarProfileButtonComponentProps) {
  const [enablePanel, setEnablePanel] = useState(false);

  function handleClick() {
    setEnablePanel(!enablePanel);
  }

  if (!user) {
    return (
      <Link href="/login">
        <a className="text-white">Login</a>
      </Link>
    );
  } else {
    return (
      <div>
        <button className="text-white" onClick={handleClick}>
          {user.username}
        </button>
        {enablePanel && (
          <div className="p-4 absolute bg-white mt-6 rounded-md -ml-56 w-64 flex flex-col">
            {children}
          </div>
        )}
      </div>
    );
  }
}

export default NavbarProfileButtonComponent;
