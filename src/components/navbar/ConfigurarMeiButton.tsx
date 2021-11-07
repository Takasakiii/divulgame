import { SimplifiedUser } from "../../api/Login";
import Link from "next/link";

export interface ConfigurarMeiButtonComponentProps {
  className?: string;
  user: SimplifiedUser | null;
}

function ConfigurarMeiButtonComponent({
  className,
  user,
}: ConfigurarMeiButtonComponentProps) {
  if (!user) {
    return <></>;
  }

  if (!user.isMei) {
    return (
      <Link href="/user/mei">
        <a className={className}>Atualizar para MEI</a>
      </Link>
    );
  }

  return <span className={className}>Conta Mei</span>;
}

export default ConfigurarMeiButtonComponent;
