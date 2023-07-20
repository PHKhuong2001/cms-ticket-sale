import AddPackage from "./AddPackage";
import UpdatePackage from "./UpdatePackage";

interface PackageProps {
  update: boolean;
  id?: string;
}
function ModalPackage({ update, id }: PackageProps) {
  return (
    <>{update ? <UpdatePackage idPackage={id || ""} /> : <AddPackage />}</>
  );
}

export default ModalPackage;
