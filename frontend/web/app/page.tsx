import AuthToggler from "@/components/ui/authToggler";
import LoginForm from "@/components/ui/loginForm";
import RegisterForm from "@/components/ui/registerForm";


export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-[400px]">
        <AuthToggler></AuthToggler>
      </div>
    </div>
  );
}
