import { Form, useLoaderData } from "@remix-run/react";
import { usersSingleLoader } from "../.server/loaders/users.single.loader";
import { userUpdateAction } from "../.server/actions/users.update.action";

export const action = userUpdateAction;
export const loader = usersSingleLoader;

export default function EditUser() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <Form key={user.id} method="post" className="p-4 flex flex-col gap-4 max-w-md [&>label]:flex [&>label]:justify-between">

      <LabelInput label="First name" name="firstName" defaultValue={user.firstName} />
      <LabelInput label="Last name" name="lastName" defaultValue={user.lastName} />
      <LabelInput label="Age" name="age" defaultValue={user.age} />
      <LabelInput label="Email" name="email" defaultValue={user.email} />
      <LabelInput label="Country" name="country" defaultValue={user.country} />
      <LabelInput label="City" name="city" defaultValue={user.city} />
      <LabelInput label="Address" name="address" defaultValue={user.address} />
      <LabelInput label="Image URL" name="image" defaultValue={user.image} />

      <div className="space-x-4 self-center">
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </div>
    </Form>
  );
}

type TLabelInput = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}
function LabelInput({label, ...props}: TLabelInput) {
  return (
    <label>
      <span>{label}</span>
      <input {...props} />
    </label>
  )
}
