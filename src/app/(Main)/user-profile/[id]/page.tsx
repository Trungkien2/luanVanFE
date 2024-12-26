import UserProfile from "../_components/UserProfile";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <UserProfile isOtherProfile={true} userId={params.id} />
    </div>
  );
};

export default page;