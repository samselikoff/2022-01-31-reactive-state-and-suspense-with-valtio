import Dashboard from "../components/Dashboard";
import SignIn from "../components/SignIn";
import useAuth from "../hooks/use-auth";

export default function Home() {
  let { currentUser } = useAuth();

  return currentUser ? (
    <Dashboard name={currentUser.displayName} />
  ) : (
    <SignIn />
  );
}
