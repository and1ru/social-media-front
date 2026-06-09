import { PostTargetComponent } from "../components/post-target-component";

export const SocialPage = () => {
  return (
    <>
        <h1 className="text-center text-2xl font-bold mb-7">Social</h1>
        <section className="flex flex-col gap-10">
            <PostTargetComponent/>
            <PostTargetComponent/>
            <PostTargetComponent/>
            <PostTargetComponent/>
        </section>
    </>
  );
};
