import { ChangelogList } from "@/components/changelogs-list";
import axios from "axios";

const Page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const changelogs = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/changelog/changelogs/${slug}`
  );
  console.log(changelogs.data.changelogs, "changelogs on page server side");
  return (
    <div className="container mx-auto px-4 py-8">
      <ChangelogList changelogs={changelogs.data.changelogs} slug={slug} />
    </div>
  );
};

export default Page;
