import AdminUserForm from "@/components/users/form";
import { createAdminUser } from "@/lib/actions";

export default function NewAdminPage() {
  return (
    <div>
      <AdminUserForm action={createAdminUser} />
    </div>
  );
}
