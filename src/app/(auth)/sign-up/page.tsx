import SignUpFrom from "./_components/SignUpFrom";

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-[30px] font-bold leading-[42px] mt-[68px]">
        Create a new account
      </h1>
      <p className="text-light_3 text-[16px]">
        To use snapgram, Please enter your details.
      </p>
      {/* Your Signup form */}
      <SignUpFrom />
    </div>
  );
}
