import UserProfile from "../_components/UserProfile"


const page = ({ params }: { params: { id: string } }) => {
  return (
    <div><UserProfile isOtherProfile={true}/></div>
  )
}

export default page