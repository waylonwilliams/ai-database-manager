import "../App.css";

interface Props {
  SetMySQLLogin: any;
}

export default function Close({ SetMySQLLogin }: Props) {
  return (
    <button className="button-disconnect" onClick={() => SetMySQLLogin(false)}>
      Disconnect
    </button>
  );
}
