import { FindUser } from "../components/fiend-users";
import { FreindTargetComponent } from "../components/friend-target-component";
import { HeaderComponent } from "../components/header-component";

export const FriendsPage = () => {
  return (
    <>
        <HeaderComponent/>
        <h1 className="text-2xl text-center font-bold mb-8">Friends</h1>
        <FindUser/>
        <section className="flex flex-col gap-7">
            <FreindTargetComponent/>
            <FreindTargetComponent/>
            <FreindTargetComponent/>
            <FreindTargetComponent/>
        </section>
    </>
  );
};